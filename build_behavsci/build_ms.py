import os, re, shutil, zipfile
from xml.sax.saxutils import escape
from common import runs, para
from studies import STUDIES

TPL = '/tmp/claude-0/-home-user/2103ce1e-8532-53e8-b5f1-3fd222fe29cd/scratchpad/w/tpl'
OUT = '/home/user/build/out'
os.makedirs(OUT, exist_ok=True)
work = '/home/user/build/ms_pkg'
shutil.rmtree(work, ignore_errors=True)
shutil.copytree(TPL, work)

doc = open(f'{TPL}/word/document.xml', encoding='utf8').read()
head = doc[:doc.index('<w:body>') + len('<w:body>')]
sect = doc[doc.rindex('<w:sectPr'):]
# editor/history/copyright side table, kept verbatim from the template
tbl = doc[doc.index('<w:tbl>'):doc.index('</w:tbl>') + len('</w:tbl>')]
disclaimer = re.search(r'<w:p [^>]*>(?:(?!<w:p ).)*?MDPI63notes.*?</w:p>', doc, re.S).group(0)

src = open('/home/user/build/manuscript.txt', encoding='utf8').read()
meta = dict(re.findall(r'^@(\w+) (.*)$', src, re.M))
body_src = re.sub(r'^@\w+ .*$', '', src, flags=re.M).strip()

FULLW = 10466
JL = '<w:jc w:val="left"/>'
X = []
X.append(para('MDPI11articletype', meta['TYPE']))
X.append(para('MDPI12title', meta['TITLE'], stats=False))
X.append('<w:p><w:pPr><w:pStyle w:val="MDPI13authornames"/></w:pPr>' + runs('Ashit Kumar Dutta ^1,2,^*', stats=False) + runs(' and Nasser Ali Aljarallah ^2,3^', stats=False) + '</w:p>')
X.append(tbl)
def aff(sym, text, bold=False):
    rp = '<w:b/>' if bold else '<w:vertAlign w:val="superscript"/>'
    r = f'<w:r><w:rPr>{rp}</w:rPr><w:t>{sym}</w:t></w:r>'
    return f'<w:p><w:pPr><w:pStyle w:val="MDPI16affiliation"/></w:pPr>{r}<w:r><w:tab/><w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'
X.append(aff('1', 'Department of Computer Science and Information Systems, College of Applied Sciences, AlMaarefa University, Riyadh, Saudi Arabia; adotta@um.edu.sa'))
X.append(aff('2', 'King Salman Center for Disability Research, Riyadh, Saudi Arabia'))
X.append(aff('3', 'Makkah National College (MNC), Makkah, Saudi Arabia; naljarallah@mnc.edu.sa'))
X.append(aff('*', 'Correspondence: adotta@um.edu.sa', bold=True))
X.append('<w:p><w:pPr><w:pStyle w:val="MDPI17abstract"/><w:spacing w:before="240" w:after="0"/></w:pPr>' + runs('**Abstract:** ', stats=False) + runs(meta['ABSTRACT']) + '</w:p>')
X.append('<w:p><w:pPr><w:pStyle w:val="MDPI18keywords"/></w:pPr>' + runs('**Keywords:** ', stats=False) + runs(meta['KEYWORDS'], stats=False) + '</w:p>')
X.append('<w:p><w:pPr><w:pStyle w:val="MDPI19line"/></w:pPr></w:p>')

def cell(text, w, size=16, bold=False, align='left', top=False, bottom=False, shade=None):
    b = ''
    if top or bottom:
        b = '<w:tcBorders>' + ('<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' if top else '') + ('<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' if bottom else '') + '</w:tcBorders>'
    sh = f'<w:shd w:val="clear" w:color="auto" w:fill="{shade}"/>' if shade else ''
    ps = ''.join(para('MDPI42tablebody', t, f'<w:spacing w:line="220" w:lineRule="atLeast"/><w:jc w:val="{align}"/>', size=size, bold=bold) for t in text.split('\n'))
    return f'<w:tc><w:tcPr><w:tcW w:w="{w}" w:type="dxa"/>{b}{sh}</w:tcPr>{ps}</w:tc>'

def table(widths, header, rows, ind=0, size=16, groups=None):
    W = sum(widths)
    t = [f'<w:tbl><w:tblPr><w:tblW w:w="{W}" w:type="dxa"/><w:tblInd w:w="{ind}" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="8" w:space="0" w:color="auto"/><w:bottom w:val="single" w:sz="8" w:space="0" w:color="auto"/></w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="57" w:type="dxa"/><w:right w:w="57" w:type="dxa"/></w:tblCellMar><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr><w:tblGrid>']
    t += [f'<w:gridCol w:w="{w}"/>' for w in widths] + ['</w:tblGrid>']
    t.append('<w:tr><w:trPr><w:tblHeader/><w:cantSplit/></w:trPr>' + ''.join(cell(h, w, size, True, bottom=True) for h, w in zip(header, widths)) + '</w:tr>')
    for r in rows:
        if isinstance(r, str):  # group row
            t.append(f'<w:tr><w:trPr><w:cantSplit/></w:trPr><w:tc><w:tcPr><w:tcW w:w="{W}" w:type="dxa"/><w:gridSpan w:val="{len(widths)}"/><w:shd w:val="clear" w:color="auto" w:fill="EDEDED"/></w:tcPr>{para("MDPI42tablebody", r, JL, size=size, bold=True)}</w:tc></w:tr>')
        else:
            t.append('<w:tr><w:trPr><w:cantSplit/></w:trPr>' + ''.join(cell(c, w, size) for c, w in zip(r, widths)) + '</w:tr>')
    t.append('</w:tbl>')
    return ''.join(t)

DES = {'RG': 'Randomized group comparisons', 'NRG': 'Nonrandomized group comparisons', 'GA': 'Group comparison, allocation unverified',
       'WP': 'Within-participant group experiments', 'SCD': 'Single-case designs', 'OBS': 'Observational analyses of assessment data'}
def table1():
    rows = []
    for cat in ['RG', 'NRG', 'GA', 'WP', 'SCD', 'OBS']:
        grp = [s for s in STUDIES if s[2] == cat]
        rows.append(f'{DES[cat]} (n = {len(grp)})')
        for s in sorted(grp, key=lambda s: s[0].replace('ä','a').replace('ü','u')):
            rows.append([s[0].replace(', ', ' (', 1).replace(', 20', ' (20') + ')' if False else s[0], s[3], s[4], s[5], f'{s[6]}: {s[7]}', s[8], f'{s[9]}/{s[10]}'])
    widths = [1700, 1700, 1000, 1850, 2766, 650, 800]
    hdr = ['Report', 'Design', 'n', 'Participants', 'Technology: contrast', 'Out-come', 'Phase/\nsource']
    return table(widths, hdr, rows, 0, 15)

T2 = [
 ("STT, assisted writing", "Several reports found greater written output; accuracy and quality were variable. Physical-disability reports showed greater fluency but, in one, lower accuracy.", "Tasks and instructional packages differ. Counts of correct units are not accuracy proportions."),
 ("TTS, assisted comprehension", "Favorable, null, and comparator-favoring findings; effects differed by task and outcome measure.", "Human-reader, print, audio-only, and alternative-setting contrasts answer different questions; subgroup findings are exploratory."),
 ("Efficiency and assessment access", "Some faster reading or shorter sessions; TTS use in national assessments was associated with longer response times. Speech settings affected comprehension of mathematical expressions.", "Task time is not comprehension or learning. Observational use/nonuse differences may reflect confounding."),
 ("Unaided literacy", "Positive findings from older nonrandomized and abstract-level reports coexist with controlled null findings and one unfavorable orthographic-learning result.", "Attrition, linked cohorts, incomplete access, and few delayed tests constrain causal and durable-learning claims."),
 ("Curriculum-specific acquisition", "Some multicomponent packages improved proximal reading, science, or attainment measures.", "Software combined with instruction; assistance during testing and scale validity are not always clear."),
 ("Adaptive Braille tutoring", "One report: mean sessions to mastery of targeted contractions 7.00 with tutor vs. 9.58 with teacher instruction alone.", "Different target sets, small sample, and untested transfer; not a general literacy effect."),
 ("Participation and implementation", "Preferences, social validity, and descriptive reports of independence and continued use.", "No comparative effect on validated participation, burden, harms, abandonment, or cost."),
 ("Captioning and OBR", "No included learner-level comparative report.", "Restricted search coverage and unclassified reports preclude a definitive evidence-gap conclusion."),
]

def figure1():
    cx, cy = 5300000, int(6400000 * 6600 / 4962)
    return (f'<w:p><w:pPr><w:pStyle w:val="MDPI52figure"/><w:keepNext/></w:pPr><w:r><w:rPr><w:noProof/></w:rPr><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="901" name="Figure 1"/><wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="901" name="Figure1.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdFig1"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'
            + para('MDPI51figurecaption', '**Figure 1.** PRISMA 2020 flow diagram. Phase 1 comprised the database searches and supplementary searching in July 2026; 2 of the 101 database reports assessed for eligibility were assessed from abstracts. Phase 2 comprised the ERIC and targeted searches in October 2026, with the July publication cutoff retained, and the re-checking of all Phase 1 reports. The two phases are shown separately because Phase 1 record-level exports were not available for cross-phase deduplication.', '<w:ind w:left="0"/>'))

ABBR = [("ADHD", "Attention-deficit/hyperactivity disorder"), ("AI", "Artificial intelligence"), ("ERIC", "Education Resources Information Center"),
        ("IEP", "Individualized education program"), ("NAEP", "National Assessment of Educational Progress"), ("OBR", "Optical Braille recognition"),
        ("OCR", "Optical character recognition"), ("PRISMA", "Preferred Reporting Items for Systematic Reviews and Meta-Analyses"),
        ("PROSPERO", "International Prospective Register of Systematic Reviews"), ("SLD", "Specific learning disability"), ("STT", "Speech-to-text"),
        ("SWiM", "Synthesis Without Meta-analysis"), ("TTS", "Text-to-speech")]

for block in re.split(r'\n\s*\n', body_src):
    block = block.strip()
    if block.startswith('# '):
        X.append(para('MDPI21heading1', block[2:], stats=False))
    elif block.startswith('## '):
        X.append(para('MDPI22heading2', block[3:], stats=False))
    elif block == '[FIGURE1]':
        X.append(figure1())
    elif block == '[TABLE1]':
        X.append(para('MDPI41tablecaption', '**Table 1.** Characteristics of the 47 included reports, grouped by design.', '<w:keepNext/><w:ind w:left="0"/>'))
        X.append(table1())
        X.append(para('MDPI43tablefooter', 'n, number of participants as reported (eligible subgroup or analyzed sample where specified). Outcome: primary measurement condition; A, assisted (technology available); U, unaided (controlled comparison without the technology); P, proximal acquisition of trained content; X, measurement condition unclear. Phase: 1, July 2026 searches; 2, October 2026 supplementary searches. Source: F, extraction verified against the full journal article; L, verification limited to the abstract, preview, figure, or a linked primary document. Linked reports share participants (Table S5). AAC, augmentative and alternative communication; BRL, adaptive Braille tutor. Further abbreviations are listed at the end of the article. Full details are given in Table S2.', '<w:ind w:left="0"/>'))
    elif block == '[TABLE2]':
        X.append(para('MDPI41tablecaption', '**Table 2.** Outcome-specific findings and limits of interpretation.', '<w:keepNext/><w:ind w:left="0"/>'))
        X.append(table([2200, 4133, 4133], ['Outcome', 'Observed pattern', 'Interpretive limit'], [list(r) for r in T2], 0, 17))
        X.append(para('MDPI43tablefooter', 'Rows may draw on overlapping reports and populations. No pooled effect, total participant count, formal certainty rating, or vote count is implied.', '<w:ind w:left="0"/>'))
    else:
        X.append(para('MDPI31text', block))

def bm(label, text, extra=''):
    return '<w:p><w:pPr><w:pStyle w:val="MDPI62backmatter"/>' + extra + '</w:pPr>' + runs(f'**{label}:** ', stats=False) + runs(text, stats=False) + '</w:p>'
X.append(bm('Supplementary Materials', meta['SUPP'], '<w:spacing w:before="240"/>'))
X.append(bm('Author Contributions', meta['CONTRIB']))
X.append(bm('Funding', meta['FUNDING']))
X.append(bm('Institutional Review Board Statement', meta['IRB']))
X.append(bm('Informed Consent Statement', meta['CONSENT']))
X.append(bm('Data Availability Statement', meta['DATA']))
X.append(bm('Acknowledgments', meta['ACK']))
X.append(bm('Conflicts of Interest', meta['COI']))
X.append(para('MDPI21heading1', 'Abbreviations', '<w:ind w:left="0"/>', stats=False))
X.append(para('MDPI32textnoindent', 'The following abbreviations are used in this manuscript:', '<w:ind w:left="0"/>', size=18))
ab = ['<w:tbl><w:tblPr><w:tblW w:w="7857" w:type="dxa"/><w:tblInd w:w="0" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr><w:tblGrid><w:gridCol w:w="1600"/><w:gridCol w:w="6257"/></w:tblGrid>']
for a, b in ABBR:
    ab.append('<w:tr>' + cell(a, 1600, 18) + cell(b, 6257, 18) + '</w:tr>')
ab.append('</w:tbl>')
X.append(''.join(ab))
X.append(para('MDPI21heading1', 'References', '<w:ind w:left="0"/>', stats=False))
for r in open('/home/user/build/refs.txt', encoding='utf8').read().split('\n'):
    X.append(para('MDPI81references', r, '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="0"/></w:numPr><w:ind w:left="425" w:hanging="425"/><w:jc w:val="left"/>', stats=False))
X.append(disclaimer)

xml = (head + ''.join(X) + sect).replace('w:tblpY="12541"', 'w:tblpY="11500"').replace('<w:bidi/>', '')
open(f'{work}/word/document.xml', 'w', encoding='utf8').write(xml)
# relationships: drop template images, add figure
rels = open(f'{work}/word/_rels/document.xml.rels', encoding='utf8').read()
rels = re.sub(r'<Relationship Id="rId(1|9|10|11)"[^>]*/>', '', rels)
os.remove(f'{work}/word/customizations.xml')
rels = rels.replace('</Relationships>', '<Relationship Id="rIdFig1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/figure1.png"/></Relationships>')
open(f'{work}/word/_rels/document.xml.rels', 'w', encoding='utf8').write(rels)
for f in ('image1.png', 'image2.png'):
    os.remove(f'{work}/word/media/{f}')
shutil.copy('/home/user/build/fig/Figure1_PRISMA_flow.png', f'{work}/word/media/figure1.png')
ct = open(f'{work}/[Content_Types].xml', encoding='utf8').read().replace('template.main+xml', 'document.main+xml').replace('<Override PartName="/word/customizations.xml" ContentType="application/vnd.ms-word.keyMapCustomizations+xml"/>', '')
open(f'{work}/[Content_Types].xml', 'w', encoding='utf8').write(ct)
# core properties
core = open(f'{work}/docProps/core.xml', encoding='utf8').read()
core = re.sub(r'<dc:title>.*?</dc:title>|<dc:title/>', '', core)
core = core.replace('</cp:coreProperties>', f'<dc:title>{escape(meta["TITLE"])}</dc:title></cp:coreProperties>') if 'xmlns:dc' in core else core
core = re.sub(r'<dc:creator>.*?</dc:creator>', '<dc:creator>Ashit Kumar Dutta</dc:creator>', core)
core = re.sub(r'<cp:lastModifiedBy>.*?</cp:lastModifiedBy>', '<cp:lastModifiedBy>Ashit Kumar Dutta</cp:lastModifiedBy>', core)
open(f'{work}/docProps/core.xml', 'w', encoding='utf8').write(core)
dst = f'{OUT}/Manuscript_Clean.docx'
if os.path.exists(dst): os.remove(dst)
with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(f'{work}/[Content_Types].xml', '[Content_Types].xml')
    for root, _, files in os.walk(work):
        for f in files:
            p = os.path.join(root, f); a = os.path.relpath(p, work)
            if a != '[Content_Types].xml': z.write(p, a)
print('ok', dst)

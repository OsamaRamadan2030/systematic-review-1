"""Build Supplementary Materials (Tables S1-S6) for the Healthcare submission.

Tables S1-S3 and S5 reuse the authors' extracted content from the Children
submission, with every citation remapped to the Healthcare reference numbers
and revision-history phrasing removed. Table S4 is rewritten; Table S6 is new
and is generated from build/data/effect_direction.csv.
"""
import csv
import json
import os
import re

import docx
from docx.oxml.ns import qn

from docx_common import normalise, Inline, add_runs, remove_journal_logo, three_line_table
from references import INCLUDED_ORDER

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
ORIG_SUPP = os.path.join(ROOT, "original_children_submission", "Supplementary_Tables_Children.docx")
ORIG_MS = os.path.join(ROOT, "original_children_submission", "Manuscript_Children.docx")
OUT = os.path.join(ROOT, "submission_healthcare", "03_Supplementary_Materials.docx")

NUM = json.load(open(os.path.join(HERE, "data", "ref_numbers.json")))
OLD_BG = {1: "crpd", 2: "great2022", 3: "federici2016", 4: "aap2016", 5: "matre2024", 6: "wood2018",
          7: "kushalnagar2014", 8: "latif2023", 9: "kausar2021", 10: "asfaw2024", 11: "lenker2003",
          12: "hoskin2024", 13: "nordstrom2019", 14: "pavani2026", 15: "millett2022", 16: "prisma2020",
          17: "prismas", 18: "swim", 19: "rob2", 20: "robinsi", 21: "wwc", 22: "grade"}


def new_num(old):
    old = int(old)
    if 23 <= old <= 49:
        return NUM[f"s{old}"]
    return NUM[OLD_BG[old]]


def compress(nums):
    from docx_common import compress as c
    return c(nums)


BRACKET = re.compile(r"\[(\d+(?:\s*[–-]\s*\d+)?(?:\s*,\s*\d+(?:\s*[–-]\s*\d+)?)*)\]")


def remap(text):
    def rep(m):
        nums = []
        for part in m.group(1).split(","):
            part = part.strip()
            if re.search(r"[–-]", part):
                a, b = re.split(r"\s*[–-]\s*", part)
                nums.extend(range(int(a), int(b) + 1))
            else:
                nums.append(int(part))
        return "[" + compress(new_num(n) for n in nums) + "]"
    return BRACKET.sub(rep, text)


def cells(table):
    out = []
    for r in table.rows:
        row, prev = [], None
        for c in r.cells:
            if c._tc is prev:
                continue
            prev = c._tc
            row.append("\n".join(p.text for p in c.paragraphs).strip())
        out.append(row)
    return out


def clean(text):
    fixes = [
        (" Truncation asterisks that had been represented as italic formatting in the previous manuscript file have been restored as literal characters.", ""),
        ("Sessions to 100% mastery of Braille contractions", "Sessions to 100% mastery of written Braille contractions"),
    ]
    for a, b in fixes:
        text = text.replace(a, b)
    return text


def md_escape(text):
    # protect literal asterisks (search truncation) from the inline markup parser
    return text.replace("*", "∗")


def main():
    inline = Inline(NUM, INCLUDED_ORDER)
    osupp = docx.Document(ORIG_SUPP)
    oms = docx.Document(ORIG_MS)
    t_s1, t_s2, t_s3, _t_s4 = [cells(t) for t in osupp.tables]
    t_grade = cells(oms.tables[2])

    doc = docx.Document(ORIG_SUPP)
    body = doc.element.body
    for c in list(body)[:-1]:
        body.remove(c)

    def para(style, text, bold=False):
        p = doc.add_paragraph(style=style)
        add_runs(p, inline.parse(text, {"b": True} if bold else None))
        return p

    def cap(text):
        p = doc.add_paragraph(style="MDPI_4.1_table_caption")
        p.paragraph_format.left_indent = 0
        p.paragraph_format.keep_with_next = True
        add_runs(p, inline.parse(text))

    def foot(text):
        p = doc.add_paragraph(style="MDPI_4.3_table_footer")
        p.paragraph_format.left_indent = 0
        add_runs(p, inline.parse(text))

    para("MDPI_1.2_title", "Supplementary Materials")
    para("MDPI_3.2_text_no_indent", "Access or Learning? A Systematic Review of Speech and Braille Assistive Technologies "
         "for Children and Adolescents with Disabilities")
    para("MDPI_3.2_text_no_indent", "Reference numbers in these tables correspond to the reference list of the main manuscript. "
         "Contents: Table S1, search strategies; Table S2, detailed characteristics and findings; Table S3, risk-of-bias and "
         "single-case appraisal; Table S4, synthesis groups, protocol deviations, report linkage, and selected excluded reports; "
         "Table S5, GRADE evidence profile; Table S6, outcome classification and effect-direction coding.")
    for p in doc.paragraphs:
        p.paragraph_format.left_indent = 0

    # ---------------- S1
    cap("**Table S1.** Search strategies and yields by information source.")
    rows = [[clean(c) for c in r] for r in t_s1[1:]]
    three_line_table(doc, t_s1[0], rows, [3000, 12300], inline, size=8, raw=True)
    foot("ADHD, attention-deficit/hyperactivity disorder; ASR, automatic speech recognition; MeSH, Medical Subject Headings. "
         "The table reports the strategies as run and the yields for the four bibliographic databases and the supplementary "
         "Google Scholar search. The host platform used for the APA PsycInfo search was not recorded. ERIC, CINAHL, "
         "dissertation, trial-registry, and engineering or computing databases were not searched. Google Scholar rankings are "
         "dynamic, so the supplementary web search is not exactly reproducible; settings are described in Section 2.3.")

    # ---------------- S2 (reordered by new number)
    cap("**Table S2.** Detailed characteristics and principal learner-level findings of the 27 included reports "
        "(up to 26 studies), ordered by reference number.")
    body_rows = []
    for r in t_s2[1:]:
        r = [clean(remap(c)) for c in r]
        body_rows.append(r)
    body_rows.sort(key=lambda r: int(r[0].strip("[]")))
    hdr = ["Ref.", "Study; country", "Design", "Participants", "Intervention and comparator", "Learner-level outcomes",
           "Principal results reported"]
    three_line_table(doc, hdr, body_rows, [650, 1850, 2000, 2200, 2750, 2000, 3850], inline, size=7.5)
    foot(remap("ADHD, attention-deficit/hyperactivity disorder; AI, artificial intelligence; LD, learning disability; NAP, "
               "non-overlap of all pairs; PEM, percentage exceeding the median; SDQ, Strengths and Difficulties Questionnaire; "
               "STT, speech-to-text; TTS, text-to-speech. Participant counts are enrolled or baseline samples unless otherwise "
               "indicated; outcome-specific analytic samples were smaller in some reports. Reports [23] and [24] describe "
               "overlapping cohorts and were treated as one study. For reports [43] and [45], extraction is limited to the "
               "published abstract because the full text could not be obtained. Reported p values and effect statistics were "
               "transcribed from the source reports and should be read together with the appraisal in Table S3."))

    # ---------------- S3
    cap("**Table S3.** Design-specific risk-of-bias and single-case appraisal of the 27 included reports.")
    rows = [[clean(remap(c)) for c in r] for r in t_s3[1:]]
    rows.sort(key=lambda r: int(r[0].strip("[]")))
    three_line_table(doc, ["Ref.", "Tool", "Overall judgement", "Principal basis for judgement"], rows,
                     [650, 1900, 2450, 10300], inline, size=8)
    foot("RoB 2 overall categories: low risk of bias, some concerns, high risk of bias; the crossover variant adds a domain for "
         "period and carryover effects. ROBINS-I categories: low, moderate, serious, critical risk of bias, and no information. "
         "What Works Clearinghouse (WWC) categories: Meets Standards Without Reservations, Meets Standards With Reservations, "
         "Does Not Meet Standards. WWC ratings are the review authors’ application of the version 5.0 design standards, not "
         "official WWC determinations. Two reports were not assessable because only abstracts were available. Figure 3 of the "
         "main manuscript displays the overall judgements.")

    # ---------------- S4 (rewritten)
    cap("**Table S4.** Synthesis groups, protocol deviations and post hoc elements, report linkage, selected excluded reports, and "
        "studies awaiting classification.")
    A = lambda t: remap(t)
    K = lambda key: f"[{NUM[key]}]"
    s4 = [
        ["Panel A. Synthesis groups and feasibility of meta-analysis"],
        ["G1 STT: unaided reading-related outcomes " + A("[23,24]"), "Learning disabilities; STT writing practice vs. general computer instruction.", "One overlapping series; narrative synthesis.", "No comparable estimate or CI."],
        ["G2 STT: written expression " + A("[25–28,49]"), "Learning, intellectual, or reading and writing disabilities; STT vs. handwriting, keyboarding, or baseline.", "Five heterogeneous studies; narrative synthesis with effect-direction coding.", "Group and single-case indices are not commensurable; two studies are single-session comparisons."],
        ["G3 TTS: reading and listening comprehension " + A("[30–35,39–48]"), "Reading, learning, or mild intellectual disability; TTS or combined technology; first comparison.", "Sixteen heterogeneous studies; no meta-analysis.", "Comparators, exposure, measures, and designs differ; only two reports supplied a CI."],
        ["G4 TTS: general achievement " + A("[29]"), "Dyslexia; TTS-supported vs. conventional teaching.", "Single study at high risk of bias.", "Unvalidated composite outcome."],
        ["G5 TTS: mathematics " + A("[36]"), "Specific learning disabilities; TTS-assisted vs. conventional instruction.", "Single study at serious risk of bias.", "Descriptive standard deviations internally inconsistent."],
        ["G6 TTS: spelling and pronunciation " + A("[37]"), "One learner with ADHD; A–B–A e-learning report.", "Single, incompletely reported case.", "Outcome scale undefined; effect not estimable."],
        ["G7 Adaptive AI Braille tutor " + A("[38]"), "Braille learners; teacher plus tutor vs. teacher alone; sessions to mastery.", "Single study not meeting WWC standards.", "Proximal outcome; no evidence on literacy transfer."],
        ["G8 Automatic classroom captioning", "Prespecified learner-level category.", "No eligible report located.", "Search coverage limits preclude a definitive evidence-gap claim."],
        ["G9 Optical Braille recognition", "Prespecified learner-level category.", "No eligible report located.", "Search coverage limits preclude a definitive evidence-gap claim."],
        ["Panel B. Protocol deviations and elements defined after data extraction"],
        ["Registration", "Prospective registration in PROSPERO.", "Registered as CRD420261513927.", "Identifier reported consistently in all files."],
        ["Information sources", "PubMed, Web of Science, Scopus, APA PsycInfo, Google Scholar.", "Run as planned; ERIC, CINAHL, and engineering databases were not searched.", "Reported as a limitation (Section 4.6) and in publication-bias judgements (Table S5)."],
        ["Additional identification", "Supplementary methods (Section 2.3).", remap("Ten of 27 included reports came from supplementary methods. Two [41,42] were identified by verification searching and seven [43–49] by later targeted searching; all were assessed against the prespecified criteria before synthesis. A post-search check (26 September 2026) identified five further potentially eligible reports (Panel E), which were not synthesised."), "Indicates that eligible evidence may have been missed; conclusions are framed accordingly."],
        ["Synthesis groups", "Grouping by technology function and outcome.", "Nine groups finalised after data extraction (Panel A).", "Labelled as finalised after extraction."],
        ["Outcome classification", "Five prespecified outcome domains.", "Outcomes additionally mapped to ICF-CY codes and classified as access or learning outcomes (Table S6).", "Post hoc; used for presentation and interpretation, not for eligibility."],
        ["Effect-direction plot", "Structured tabulation and narrative synthesis (SWiM).", "Effect direction coded per report and outcome domain, without statistical significance (Figure 4; Table S6).", "Post hoc visual summary; no sign test applied."],
        ["Sensitivity synthesis", "Narrative synthesis without meta-analysis.", "Restriction to lower-risk reports (RoB 2 some concerns; ROBINS-I moderate; WWC meets with reservations); 12 reports retained.", "Post hoc; five evidence bodies became empty (Section 3.5)."],
        ["Single-case appraisal", "WWC version 5.0 design standards.", "Selective reporting, implementation fidelity, and blinding appraised separately for each single-case report.", "Reported in Table S3 and carried into GRADE."],
        ["Certainty", "GRADE domains.", "Randomised evidence started high, non-randomised and single-case evidence low; in mixed bodies randomised evidence set the starting level.", "Every downgrade reported in Table S5; no upgrading."],
        ["Reviewer arrangements", "Single-reviewer screening, extraction, and appraisal.", "No independent duplicate assessment; verification pass by the same reviewer.", "Reported as a review-level limitation (Section 4.6)."],
        ["Panel C. Report linkage and participant overlap"],
        [A("[23]/[24]"), A("Same authors and cohort; [24] contains the 39 participants of [23] plus 13 new participants."), "Linked as one study.", "Confirmed overlap removed from the participant total."],
        [A("[27]/[28]/[39]/[47]"), "Shared Swedish author network and similar population; sites, dates, and ethics details insufficient to confirm or exclude overlap.", "Overlap not excluded; counted as four studies.", "Participant totals reported as upper bounds."],
        [A("[26]/[30]"), "Shared authorship; different countries, periods, samples, designs, and interventions.", "Treated as independent.", "No adjustment."],
        [A("[44]/[45]"), "Same authors; different designs, sample sizes, and educational levels.", "Treated as independent on published information.", "Overlap cannot be fully excluded; totals are upper bounds."],
        [A("[49]"), A("Gothenburg-based project; different region, project, and author network from [27]/[28]/[39]/[47]."), "Treated as independent.", "No adjustment."],
        [A("[48]") + " and corrigendum", "Correction to the same article.", "One report.", "Corrigendum recorded as 2021;36(4):336."],
        ["Panel D. Selected reports close to the eligibility boundary"],
        ["Silvestri et al. (2022)", "Within-participant study of grade-8 students with reading difficulties.", A("Included as [48] after a boundary judgement on the standardised classification of reading difficulties."), "Characteristics in Table S2."],
        ["Kraft (2023)", "Counterbalanced STT vs. keyboard comparison in children aged 10–13 years with reading and writing difficulties identified by standardised cut-offs (stanine ≤ 3 spelling or ≤ 22nd percentile decoding).", A("Included as [49] after full-text assessment: eligible population, intervention, comparator, design, and outcomes."), "Characteristics in Table S2."],
        ["Schiavo et al. (2021)", "Controlled gaze-contingent read-aloud experiment in children aged 8–10 years with dyslexia.", "Excluded: ineligible intervention (system and comparator both used pre-recorded human voice, not automatic speech synthesis).", "Consistent with the prespecified exclusion of non-automatic speech."],
        ["Stodden et al. (2012)", "Conference proceedings paper.", "Excluded: publication type.", "Restriction may contribute to publication bias."],
        ["Keelor (2017); Young (2017)", A("Doctoral dissertations linked to included journal reports."), A("Excluded: theses; journal reports [31] and [32] retained."), "No double counting."],
        [A("Reviews [5,6,12,14]"), "Evidence syntheses or conceptual reviews.", "Excluded: not primary studies.", "Used for background and reference checking."],
        [A("Technical reports [7–10,15]"), "Captioning or Braille system accuracy or usability without an eligible learner-level comparison.", "Excluded: technical-only outcome or no eligible comparator.", "Does not establish ineffectiveness."],
        ["Panel E. Studies awaiting classification (identified by the post-search check, 26 September 2026)"],
        ["Quinlan (2004) " + K("quinlan2004"), "Within-participant experiment: narratives composed by handwriting and by STT, with and without advance planning; less fluent and fluent writers aged 11–14 years.",
         "Awaiting classification; abstract-level information only.",
         "STT access: longer texts (+) and fewer surface errors (+) for less fluent writers; quality not improved (0). Same direction as included STT evidence."],
        ["Higgins & Raskind (2005) " + K("higgins2005"), "Within-participant comparison: silent reading with vs. without a reading pen (optical character recognition with speech synthesis); 30 students with reading disabilities aged 10–18 years.",
         "Awaiting classification; abstract-level information only.",
         A("TTS access: comprehension higher with the pen (+). Would add one favourable comprehension comparison; same research group as [23,24], so possible participant overlap would need checking.")],
        ["Izzo et al. (2009) " + K("izzo2009"), "Reversal design across 10 curriculum units: TTS screen reader introduced and withdrawn; high-school students with disabilities in an online transition curriculum.",
         "Awaiting classification; abstract-level information only.",
         "TTS access: unit-quiz and reading-comprehension scores higher with TTS (+). Would add one favourable comprehension comparison."],
        ["Kambouri et al. (2023) " + K("kambouri2023"), "STT (Dragon) used on set tasks for 16–18 weeks; handwritten text assessed before and after, and STT text compared with handwritten text at post-test; 30 children with special educational needs and disabilities in three settings (UK).",
         "Awaiting classification; eligibility depends on whether the post-test STT vs. handwriting comparison meets the within-participant design criterion.",
         "STT access: STT text better than handwritten text at post-test (+). Learning: handwritten text improved before–after (+), but without a control group. Consistent with favourable learning effects arising only from higher-risk designs."],
        ["Flütsch Keravec et al. (2026) " + K("fluetsch2026"), "Controlled 18-week intervention: one STT group vs. two handwriting groups; 107 Grade-5 students with dyslexia (Switzerland).",
         "Awaiting classification; published after the search closed.",
         "STT access: longer and more accurate texts with STT (+). STT learning: no transfer to handwritten text production or writing motivation (0). Would make STT learning evidence inconsistent."],
    ]
    grp = {i for i, r in enumerate(s4) if len(r) == 1}
    three_line_table(doc, ["Panel/item", "Population, evidence, or planned method", "Decision or completed method",
                           "Implication"], s4, [2900, 4200, 4300, 3900], inline, size=8, group_rows=grp)
    foot("CI, confidence interval; GRADE, Grading of Recommendations Assessment, Development and Evaluation; ICF-CY, "
         "International Classification of Functioning, Disability and Health for Children and Youth; STT, speech-to-text; "
         "SWiM, Synthesis Without Meta-analysis; TTS, text-to-speech; WWC, What Works Clearinghouse. Panel D lists selected "
         "boundary decisions; it is not a list of all 101 full-text exclusions. Panel E is based on published abstracts; the directions "
         "shown are provisional, were not used in the synthesis, and are discussed in Section 4.6 of the main manuscript.")

    # ---------------- S5 GRADE evidence profile (moved from the main text)
    cap("**Table S5.** GRADE evidence profile by technology–outcome evidence body.")
    rows = [[remap(c) for c in r] for r in t_grade[1:]]
    hdr5 = [h.replace("n*", "n\u2217") for h in t_grade[0]]
    three_line_table(doc, hdr5, rows, [2300, 1400, 2600, 1800, 1400, 1500, 1500, 1500, 1300], inline, size=7.5)
    foot("Each row corresponds to a synthesis group in Table S4 (Panel A). \u2217Enrolled or baseline n includes learners with "
         "disabilities only; totals are upper bounds where cohorts may overlap. Randomised evidence set the starting level for "
         "mixed-design bodies. Single-case risk-of-bias judgements combine WWC design standards with the additional domains in "
         "Table S3. Inconsistency was not assessable for a single study. Publication and non-reporting bias was judged "
         "qualitatively in light of the search restrictions. Functions without eligible evidence were not rated.")

    # ---------------- S6 effect direction coding
    cap("**Table S6.** Outcome classification (ICF-CY domain; access or learning outcome) and effect-direction coding.")
    icf = {"Comprehension": "d166 Reading; d310 Receiving spoken messages",
           "Reading efficiency": "d166 Reading",
           "Text length": "d170 Writing", "Transcription accuracy": "d170 Writing", "Text quality": "d170 Writing",
           "Engagement and independence": "d160 Focusing attention; d210 Undertaking a single task",
           "Unaided literacy skills": "d140 Learning to read; d145 Learning to write",
           "Curricular attainment": "d820 School education",
           "Braille acquisition": "d140 Learning to read; d145 Learning to write"}
    arrow = {"+": "▲ favours technology", "-": "▼ favours comparator", "0": "◄► no clear difference / mixed"}
    ed = list(csv.DictReader(open(os.path.join(HERE, "data", "effect_direction.csv"), encoding="utf-8")))
    rows = []
    for e in ed:
        refs = ",".join(str(NUM[f"s{x}"]) for x in e["ref"].split(";"))
        rows.append([f"[{refs}]", e["domain"], icf[e["domain"]], e["level"].capitalize(), arrow[e["direction"]],
                     remap(e["basis"])])
    rows.sort(key=lambda r: (int(r[0].strip("[]").split(",")[0]), r[1]))
    three_line_table(doc, ["Ref.", "Outcome domain", "ICF-CY code(s)", "Access or learning", "Direction",
                           "Basis for coding (source finding)"], rows, [900, 2000, 2900, 1300, 2300, 5900], inline, size=8)
    foot("Access outcomes were measured with the technology in use; learning outcomes were measured without the technology or "
         "after a period of use. Direction was coded from the reported contrast without regard to statistical significance; "
         "for single-case designs a direction was assigned when at least 70% of participants or outcomes moved the same way "
         "(Boon and Thomson, 2021). Coding was performed by the review team from the extraction in Table S2 and should be "
         "read together with the risk-of-bias judgements in Table S3. NAP, non-overlap of all pairs; PEM, percentage "
         "exceeding the median.")

    assert remove_journal_logo(doc) == 1
    doc.core_properties.title = "Supplementary Materials"
    normalise(doc)
    doc.save(OUT)
    print("saved", OUT)


if __name__ == "__main__":
    main()

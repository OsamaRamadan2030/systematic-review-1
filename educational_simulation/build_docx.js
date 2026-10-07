// Build a .docx from the simple Markdown used in this folder.
// Usage: node build_docx.js <src.md> <out.docx> [--landscape]
// Supported: # to #### headings, paragraphs, **bold**, *italic*, "> " quotations
// (a "> **Simulation notice" line becomes a boxed notice), "1. " numbered paragraphs
// (the number in the source is kept), "- " and "  - " bullets, pipe tables
// (cells may contain <br>), "<!-- widths: a,b,c -->" before a table to fix column
// widths in DXA, and "\pagebreak" on its own line.
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType,
  ShadingType, AlignmentType, BorderStyle, LevelFormat, Footer, Header, PageNumber, PageBreak,
  PageOrientation } = require('docx');

const [,, src, out, flag] = process.argv;
const landscape = flag === '--landscape';
const lines = fs.readFileSync(src, 'utf8').split('\n');
const FONT = 'Times New Roman';
const W = landscape ? 16838 - 2880 : 11906 - 2880; // A4 content width (DXA)
const ARABIC = /[؀-ۿ]/;

function runs(text, base = {}) {
  const rtl = ARABIC.test(text) ? { rightToLeft: true } : {};
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).filter(Boolean).map(p => {
    if (p.startsWith('**') && p.length > 4) return new TextRun({ ...base, ...rtl, text: p.slice(2, -2), bold: true });
    if (p.startsWith('*') && p.length > 2) return new TextRun({ ...base, ...rtl, text: p.slice(1, -1), italics: !base.italics });
    return new TextRun({ ...base, ...rtl, text: p });
  });
}

const children = [];
const para = text => new Paragraph({ children: runs(text), spacing: { after: 160, line: 360 }, alignment: AlignmentType.JUSTIFIED });

function quote(text) {
  const m = text.match(/^(".*")\s+(\([A-Z][0-9]{2}[^)]*\))\s*(\*\(Ar\)\*)?$/);
  let kids;
  if (m) {
    kids = [new TextRun({ text: m[1], italics: true }), new TextRun({ text: ' ' + m[2] })];
    if (m[3]) kids.push(new TextRun({ text: ' (Ar)', italics: true }));
  } else kids = runs(text);
  return new Paragraph({ children: kids, indent: { left: 720, right: 720 }, spacing: { before: 60, after: 200, line: 300 }, alignment: AlignmentType.JUSTIFIED });
}

function notice(text) {
  const b = { style: BorderStyle.SINGLE, size: 8, color: 'B03A2E', space: 4 };
  return new Paragraph({
    children: runs(text), spacing: { after: 240, line: 300 },
    shading: { type: ShadingType.CLEAR, fill: 'FDECEA', color: 'auto' },
    border: { top: b, bottom: b, left: b, right: b },
  });
}

function cellParas(text, isHead) {
  return text.split(/<br>/).map(t => new Paragraph({
    alignment: ARABIC.test(t) && !/[A-Za-z]/.test(t) ? AlignmentType.RIGHT : undefined,
    bidirectional: ARABIC.test(t) && !/[A-Za-z]/.test(t) ? true : undefined,
    spacing: { after: 40 },
    children: runs(t.trim(), { size: 19, bold: isHead || undefined }),
  }));
}

function table(rows, fixed) {
  const parse = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  const header = parse(rows[0]);
  const centre = parse(rows[1]).map(c => c.startsWith(':') && c.endsWith(':'));
  const body = rows.slice(2).map(parse);
  const n = header.length;
  let cols;
  if (fixed && fixed.length === n) {
    const s = fixed.reduce((a, b) => a + b, 0);
    cols = fixed.map(w => Math.floor(W * w / s));
  } else {
    const lens = header.map((h, i) => Math.max(h.length, ...body.map(r => (r[i] || '').length)));
    const weights = lens.map(l => Math.max(10, Math.min(l, 90)));
    const s = weights.reduce((a, b) => a + b, 0);
    cols = weights.map(w => Math.floor(W * w / s));
  }
  cols[cols.indexOf(Math.max(...cols))] += W - cols.reduce((a, b) => a + b, 0);
  const border = { style: BorderStyle.SINGLE, size: 4, color: '999999' };
  const borders = { top: border, bottom: border, left: border, right: border };
  const mk = (cells, isHead) => new TableRow({
    tableHeader: isHead, cantSplit: !isHead && cells.join('').length < 600,
    children: cells.map((c, i) => new TableCell({
      width: { size: cols[i], type: WidthType.DXA }, borders,
      shading: isHead ? { type: ShadingType.CLEAR, fill: 'E7E6E6', color: 'auto' } : undefined,
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: cellParas(c || '', isHead).map(p => { if (centre[i]) p.properties = p.properties; return p; }),
    })),
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: cols, rows: [mk(header, true), ...body.map(r => mk(r, false))] });
}

let i = 0, widths = null;
while (i < lines.length) {
  const l = lines[i];
  if (!l.trim() || l.trim() === '---') { i++; continue; }
  let m;
  if ((m = l.match(/^<!-- widths: ([\d, ]+) -->$/))) { widths = m[1].split(',').map(Number); i++; continue; }
  if (l.trim() === '\\pagebreak') { children.push(new Paragraph({ children: [new PageBreak()] })); i++; continue; }
  if (l.startsWith('|')) {
    const block = [];
    while (i < lines.length && lines[i].startsWith('|')) block.push(lines[i++]);
    children.push(table(block, widths));
    widths = null;
    children.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
    continue;
  }
  if ((m = l.match(/^(#{1,4}) (.*)$/))) {
    const lvl = m[1].length, text = m[2];
    if (text.startsWith('Annotation for learners')) children.push(new Paragraph({ children: [new PageBreak()] }));
    const heading = [HeadingLevel.TITLE, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3][lvl - 1];
    children.push(new Paragraph({ heading, children: runs(text.replace(/\*/g, '')), keepNext: true }));
    i++; continue;
  }
  if (l.startsWith('> ')) {
    const t = l.slice(2).trim();
    children.push(t.startsWith('**Simulation notice') ? notice(t) : quote(t));
    i++; continue;
  }
  if ((m = l.match(/^(\d+)\. (.*)$/))) {
    // keep the number written in the source so numbering can run across headings
    children.push(new Paragraph({ children: [new TextRun({ text: m[1] + '.\t' }), ...runs(m[2])], tabStops: [{ type: 'left', position: 720 }],
      indent: { left: 720, hanging: 360 }, spacing: { after: 120, line: 320 }, alignment: AlignmentType.JUSTIFIED }));
    i++; continue;
  }
  if ((m = l.match(/^( *)- (.*)$/))) {
    const level = m[1].length >= 2 ? 1 : 0;
    children.push(new Paragraph({ numbering: { reference: 'bul', level }, children: runs(m[2]), spacing: { after: 100, line: 300 }, alignment: AlignmentType.LEFT }));
    i++; continue;
  }
  if (l.startsWith('**Table')) { children.push(new Paragraph({ children: runs(l), spacing: { before: 200, after: 100 }, keepNext: true })); i++; continue; }
  if (l.startsWith('*Note.*')) { children.push(new Paragraph({ children: runs(l, { size: 19 }), spacing: { after: 240, line: 276 } })); i++; continue; }
  children.push(para(l)); i++;
}

const page = landscape
  ? { size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } }
  : { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } };

const doc = new Document({
  creator: 'Educational simulation',
  title: lines.find(x => x.startsWith('# '))?.slice(2) || 'Document',
  styles: {
    default: { document: { run: { font: FONT, size: 24 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', run: { size: 32, bold: true, font: FONT }, paragraph: { spacing: { after: 240 }, alignment: AlignmentType.CENTER } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, font: FONT }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, font: FONT }, paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, italics: true, font: FONT }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [
    { reference: 'num', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: 'bul', levels: [
      { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
      { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
    ] },
  ] },
  sections: [{
    properties: { page },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'SIMULATED DATA — EDUCATIONAL USE ONLY', size: 16, color: 'B03A2E', bold: true })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 20 })] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out, b); console.log('ok', out); });

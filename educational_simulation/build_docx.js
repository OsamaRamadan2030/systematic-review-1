const fs = require('fs');
const d = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType,
  ShadingType, AlignmentType, BorderStyle, LevelFormat, Footer, Header, PageNumber, PageBreak } = d;

const [,, src, out] = process.argv;
const lines = fs.readFileSync(src, 'utf8').split('\n');
const FONT = 'Times New Roman';
const W = 9026; // A4 content width (DXA)

function runs(text, base = {}) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).filter(Boolean);
  return parts.map(p => {
    if (p.startsWith('**')) return new TextRun({ text: p.slice(2, -2), bold: true, ...base });
    if (p.startsWith('*') && p.length > 2) return new TextRun({ text: p.slice(1, -1), italics: !base.italics, ...Object.fromEntries(Object.entries(base).filter(([k]) => k !== 'italics')) });
    return new TextRun({ text: p, ...base });
  });
}

const children = [];
const para = (text, opts = {}) => new Paragraph({ children: runs(text), spacing: { after: 160, line: 360 }, alignment: AlignmentType.JUSTIFIED, ...opts });

function quote(text) {
  // > "quote" (CODE, desc) *(Ar)*
  const m = text.match(/^(".*")\s+(\([A-Z][0-9]{2}[^)]*\))\s*(\*\(Ar\)\*)?$/);
  let kids;
  if (m) {
    kids = [new TextRun({ text: m[1], italics: true }), new TextRun({ text: ' ' + m[2] })];
    if (m[3]) kids.push(new TextRun({ text: ' (Ar)', italics: true }));
  } else kids = runs(text);
  return new Paragraph({ children: kids, indent: { left: 720, right: 720 }, spacing: { before: 60, after: 200, line: 300 }, alignment: AlignmentType.JUSTIFIED });
}

function notice(text) {
  return new Paragraph({
    children: runs(text, {}), spacing: { after: 240, line: 300 },
    shading: { type: ShadingType.CLEAR, fill: 'FDECEA', color: 'auto' },
    border: { top: { style: BorderStyle.SINGLE, size: 8, color: 'B03A2E', space: 4 }, bottom: { style: BorderStyle.SINGLE, size: 8, color: 'B03A2E', space: 4 },
              left: { style: BorderStyle.SINGLE, size: 8, color: 'B03A2E', space: 4 }, right: { style: BorderStyle.SINGLE, size: 8, color: 'B03A2E', space: 4 } },
  });
}

function table(rows) {
  const parse = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  const header = parse(rows[0]);
  const aligns = parse(rows[1]).map(c => c.startsWith(':') && c.endsWith(':') ? 'center' : 'left');
  const body = rows.slice(2).map(parse);
  const n = header.length;
  // column widths: weight by max text length, with minimum
  const lens = header.map((h, i) => Math.max(h.length, ...body.map(r => (r[i] || '').length)));
  const weights = lens.map((l, i) => Math.max(14, Math.max(...header[i].split(" ").map(w => w.length + 4)), Math.min(l, 90)));
  const sum = weights.reduce((a, b) => a + b, 0);
  let cols = weights.map(w => Math.floor(W * w / sum));
  const mins = header.map(h => Math.max(...h.replace(/\*/g,'').split(' ').map(w => w.length)) * 125 + 300);
  cols = cols.map((c, i) => Math.max(c, mins[i]));
  let excess = cols.reduce((a, b) => a + b, 0) - W;
  while (excess > 0) { const j = cols.indexOf(Math.max(...cols)); const take = Math.min(excess, cols[j] - mins[j]); cols[j] -= take; excess -= take; if (take <= 0) break; }
  cols[cols.indexOf(Math.max(...cols))] += W - cols.reduce((a, b) => a + b, 0);
  if (header[0] === 'Theme') cols = [2000, 3626, 850, 850, 1700];
  const border = { style: BorderStyle.SINGLE, size: 4, color: '999999' };
  const borders = { top: border, bottom: border, left: border, right: border };
  const mk = (cells, isHead) => new TableRow({
    tableHeader: isHead,
    children: cells.map((c, i) => new TableCell({
      width: { size: cols[i], type: WidthType.DXA }, borders,
      shading: isHead ? { type: ShadingType.CLEAR, fill: 'E7E6E6', color: 'auto' } : undefined,
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({ alignment: aligns[i] === 'center' ? AlignmentType.CENTER : AlignmentType.LEFT,
        children: runs(c, { size: 19, bold: isHead || undefined }) })],
    })),
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: cols, rows: [mk(header, true), ...body.map(r => mk(r, false))] });
}

let i = 0, inAnnot = false;
while (i < lines.length) {
  const l = lines[i];
  if (!l.trim() || l.trim() === '---') { i++; continue; }
  if (l.startsWith('|')) {
    const block = [];
    while (i < lines.length && lines[i].startsWith('|')) block.push(lines[i++]);
    children.push(table(block));
    children.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
    continue;
  }
  let m;
  if ((m = l.match(/^(#{1,4}) (.*)$/))) {
    const lvl = m[1].length;
    const text = m[2];
    if (text.startsWith('Annotation for learners')) { inAnnot = true; children.push(new Paragraph({ children: [new PageBreak()] })); }
    const heading = [HeadingLevel.TITLE, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3][lvl - 1];
    children.push(new Paragraph({ heading, children: runs(text.replace(/\*/g, '')), keepNext: true }));
    i++; continue;
  }
  if (l.startsWith('> ')) {
    const t = l.slice(2).trim();
    children.push(t.startsWith('**Simulation notice') ? notice(t) : quote(t));
    i++; continue;
  }
  if ((m = l.match(/^\d+\. (.*)$/))) { children.push(new Paragraph({ numbering: { reference: inAnnot ? 'num2' : 'num1', level: 0 }, children: runs(m[1]), spacing: { after: 120, line: 360 }, alignment: AlignmentType.JUSTIFIED })); i++; continue; }
  if ((m = l.match(/^- (.*)$/))) { children.push(new Paragraph({ numbering: { reference: 'bul', level: 0 }, children: runs(m[1]), spacing: { after: 120, line: 360 }, alignment: AlignmentType.JUSTIFIED })); i++; continue; }
  // table caption / note paragraphs
  if (l.startsWith('**Table') ) { children.push(new Paragraph({ children: runs(l), spacing: { before: 200, after: 100 }, keepNext: true })); i++; continue; }
  if (l.startsWith('*Note.*')) { children.push(new Paragraph({ children: runs(l, { size: 19 }), spacing: { after: 240, line: 276 } })); i++; continue; }
  children.push(para(l)); i++;
}

const doc = new Document({
  creator: 'Educational simulation',
  title: 'Whose Readiness Counts? Findings (simulated)',
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
    { reference: 'num1', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: 'num2', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'SIMULATED DATA — EDUCATIONAL USE ONLY', size: 16, color: 'B03A2E', bold: true })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 20 })] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out, b); console.log('ok', out); });

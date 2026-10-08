// Builds every deliverable as a Word file:
//   01_Response_to_Commentary_NICC.docx       (for submission to the co-editors)
//   02_Email_1_Confirm_Intention.docx         (reply to the co-editors now)
//   03_Email_2_Submission_Cover.docx          (covering email for the submission, by 25 October 2026)
//   04_Author_Briefing_CONFIDENTIAL.docx      (for the three authors only)
// Usage: node build_all.js

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, Footer, PageNumber,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, LevelFormat,
} = require('docx');

const R = require('./response_text.js');
const E = require('./email_text.js');
const B = require('./briefing_text.js');

const FONT = 'Times New Roman';
const SIZE = 24;
const A4 = { width: 11906, height: 16838 };
const MARGIN = 1440;
const CONTENT_WIDTH = A4.width - 2 * MARGIN;

// ---------- inline markup: {n} superscript citation, [[HL]]..[[/HL]] highlight, **bold** ----------

function runs(text, base = {}) {
  const out = [];
  const re = /(\{[0-9,]+\})|(\[\[HL\]\])|(\[\[\/HL\]\])|(\*\*)/g;
  let last = 0, m, hl = false, bold = !!base.bold;
  // Placeholders are marked with yellow run shading (docx-js "highlight" emits a non-schema w:highlightCs element).
  const push = t => { if (t) out.push(new TextRun({ text: t, font: FONT, size: base.size || SIZE, italics: base.italics, bold, shading: hl ? { type: ShadingType.CLEAR, fill: 'FFFF00', color: 'auto' } : undefined })); };
  while ((m = re.exec(text)) !== null) {
    push(text.slice(last, m.index));
    if (m[1]) out.push(new TextRun({ text: m[1].slice(1, -1), font: FONT, size: base.size || SIZE, superScript: true, bold }));
    else if (m[2]) hl = true;
    else if (m[3]) hl = false;
    else if (m[4]) bold = !bold;
    last = re.lastIndex;
  }
  push(text.slice(last));
  return out;
}

const P = (text, o = {}) => new Paragraph({
  alignment: o.align ?? AlignmentType.JUSTIFIED,
  spacing: { line: o.line ?? 360, after: o.after ?? 200, before: o.before ?? 0 },
  indent: o.indent,
  keepNext: o.keepNext,
  numbering: o.bullet ? { reference: 'bullets', level: 0 } : undefined,
  children: runs(text, { size: o.size, bold: o.bold, italics: o.italics }),
});

const H = (text, o = {}) => new Paragraph({
  spacing: { line: 360, before: o.before ?? 240, after: 120 },
  keepNext: true,
  children: [new TextRun({ text, font: FONT, size: o.size ?? SIZE, bold: true })],
});

const footer = () => new Footer({
  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 20 })] })],
});

const border = { style: BorderStyle.SINGLE, size: 4, color: '999999' };
const borders = { top: border, bottom: border, left: border, right: border };

function table(header, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cell = (t, w, head) => new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: head ? { fill: 'E7E6E6', type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: String(t).split('\n').map(line => new Paragraph({ spacing: { line: 260, after: 40 }, children: runs(line, { size: 18, bold: head }) })),
  });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: header.map((h, i) => cell(h, widths[i], true)) }),
      ...rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, widths[i], false)) })),
    ],
  });
}

function doc(children, title) {
  return new Document({
    creator: 'Osama Mohamed Elsayed Ramadan',
    title,
    styles: { default: { document: { run: { font: FONT, size: SIZE } } } },
    numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
    sections: [{
      properties: { page: { size: A4, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
      footers: { default: footer() },
      children,
    }],
  });
}

const strip = s => s.replace(/\{[0-9,]+\}/g, '').replace(/\[\[\/?HL\]\]/g, '').replace(/\*\*/g, '');
const wc = s => strip(s).split(/\s+/).filter(Boolean).length;

// ---------- 01 Response ----------

function buildResponse() {
  const mainWords = R.BODY.reduce((a, [h, ps]) => a + wc(h) + ps.reduce((b, p) => b + wc(p), 0), 0);
  const titleWords = wc(R.TITLE);
  const c = [];
  c.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: 'RESPONSE TO COMMENTARY', font: FONT, size: 20, bold: true })] }));
  c.push(new Paragraph({ spacing: { line: 360, after: 240 }, children: [new TextRun({ text: R.TITLE, font: FONT, size: 32, bold: true })] }));
  const authors = [['Reda Samy', '1'], ['Osama Mohamed Elsayed Ramadan', '2'], ['Ghada Elsaid Ali Elsayed', '3,4']];
  c.push(new Paragraph({ spacing: { line: 360, after: 120 }, children: authors.flatMap(([n, s], i) => [
    new TextRun({ text: n, font: FONT, size: SIZE }), new TextRun({ text: s, font: FONT, size: SIZE, superScript: true }),
    ...(i < authors.length - 1 ? [new TextRun({ text: ' | ', font: FONT, size: SIZE })] : [])]) }));
  [
    ['1', 'Department of Medical Surgical Nursing, College of Nursing, Jouf University, Sakaka, Saudi Arabia'],
    ['2', 'Department of Maternal and Child Health Nursing, College of Nursing, Jouf University, Sakaka, Saudi Arabia'],
    ['3', 'Department of Community and Mental Health Nursing, College of Nursing, Najran University, Najran, Saudi Arabia'],
    ['4', 'Health Research Centre, Najran University, Najran, Saudi Arabia'],
  ].forEach(([s, t]) => c.push(new Paragraph({ spacing: { line: 276, after: 60 }, children: [
    new TextRun({ text: s, font: FONT, size: 20, superScript: true }), new TextRun({ text: t, font: FONT, size: 20 })] })));
  c.push(P('Correspondence: Osama Mohamed Elsayed Ramadan (omramadan@ju.edu.sa)', { align: AlignmentType.LEFT, size: 20, after: 120 }));
  c.push(P(R.RESPONSE_TO, { align: AlignmentType.LEFT, size: 20, italics: true, after: 120 }));
  c.push(P(`Word count: ${mainWords} words (main text including headings; excluding title, author details, end statements and references). Title: ${titleWords} words.`, { align: AlignmentType.LEFT, size: 20, after: 240 }));
  R.BODY.forEach(([h, ps]) => { c.push(H(h)); ps.forEach(p => c.push(P(p))); });
  R.END_STATEMENTS.forEach(([h, t]) => { c.push(H(h, { size: 22 })); c.push(P(t, { size: 22, after: 120 })); });
  c.push(H('REFERENCES'));
  R.REFERENCES.forEach((r, i) => c.push(P(`${i + 1}. ${r}`, { align: AlignmentType.LEFT, size: 22, line: 276, after: 100, indent: { left: 400, hanging: 400 } })));
  return { d: doc(c, strip(R.TITLE)), info: `main text ${mainWords} words; title ${titleWords}` };
}

// ---------- 02 / 03 Emails ----------

function buildEmail(e) {
  const c = [];
  c.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: e.label, font: FONT, size: 20, bold: true, color: '666666' })] }));
  c.push(P(e.when, { align: AlignmentType.LEFT, size: 20, italics: true, after: 240 }));
  e.headers.forEach(([k, v]) => c.push(new Paragraph({ spacing: { after: 80 }, children: [
    new TextRun({ text: `${k}: `, font: FONT, size: SIZE, bold: true }), ...runs(v)] })));
  c.push(new Paragraph({ spacing: { after: 240 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 4 } }, children: [] }));
  e.body.forEach(item => {
    if (Array.isArray(item)) item.forEach(b => c.push(P(b, { bullet: true, align: AlignmentType.LEFT, after: 80 })));
    else c.push(P(item, { align: AlignmentType.LEFT }));
  });
  e.signature.forEach((s, i) => c.push(P(s, { align: AlignmentType.LEFT, after: 0, line: 276, bold: i === 0 })));
  if (e.notes) {
    c.push(H('Notes for the authors (delete before sending)', { size: 20, before: 480 }));
    e.notes.forEach(n => c.push(P(n, { bullet: true, align: AlignmentType.LEFT, size: 20, after: 60 })));
  }
  return doc(c, e.subject);
}

// ---------- 04 Briefing ----------

function buildBriefing() {
  const c = [];
  c.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: 'CONFIDENTIAL – FOR THE THREE AUTHORS ONLY. DO NOT SEND TO THE EDITORS.', font: FONT, size: 20, bold: true, color: 'C00000' })] }));
  c.push(new Paragraph({ spacing: { after: 240 }, children: [new TextRun({ text: B.TITLE, font: FONT, size: 32, bold: true })] }));
  B.SECTIONS.forEach(s => {
    c.push(H(s.heading));
    (s.paras || []).forEach(p => c.push(P(p, { align: AlignmentType.LEFT })));
    (s.bullets || []).forEach(b => c.push(P(b, { bullet: true, align: AlignmentType.LEFT, after: 80 })));
    if (s.table) { c.push(table(s.table.header, s.table.rows, s.table.widths)); c.push(P('', { after: 120 })); }
    (s.after || []).forEach(p => c.push(P(p, { align: AlignmentType.LEFT })));
  });
  return doc(c, B.TITLE);
}

// ---------- write ----------

const outputs = [];
const resp = buildResponse();
outputs.push(['01_Response_to_Commentary_NICC.docx', resp.d, resp.info]);
outputs.push(['02_Email_1_Confirm_Intention.docx', buildEmail(E.EMAIL1), '']);
outputs.push(['03_Email_2_Submission_Cover.docx', buildEmail(E.EMAIL2), '']);
outputs.push(['04_Author_Briefing_CONFIDENTIAL.docx', buildBriefing(), '']);

(async () => {
  for (const [name, d, info] of outputs) {
    fs.writeFileSync(path.join(__dirname, name), await Packer.toBuffer(d));
    console.log(`Wrote ${name}${info ? ' (' + info + ')' : ''}`);
  }
})();

module.exports = { CONTENT_WIDTH };

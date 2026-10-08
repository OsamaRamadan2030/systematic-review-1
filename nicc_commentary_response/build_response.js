// Builds the response to the commentary "Calibrated to what?" as a Word file.
// Citation numbers are written as {n} in the text and rendered as superscript.
// Usage: node build_response.js  (writes Response_to_Commentary_NICC_e70620.docx next to this script)

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, Footer, PageNumber,
} = require('docx');

const FONT = 'Times New Roman';
const SIZE = 24; // 12 pt
const LINE = 360; // 1.5 line spacing

const TITLE = 'Calibrated to the patient: A response to “Calibrated to what?”';

const RESPONSE_TO =
  'Response to: [Commentators’ names – to be completed by the Editorial Office]. ' +
  'Calibrated to what? Feedback asymmetry and the limits of experiential trust in AI-assisted early warning. ' +
  'Nursing in Critical Care. 2026.';

const AUTHORS = [
  ['Reda Samy', '1'],
  ['Osama Mohamed Elsayed Ramadan', '2'],
  ['Ghada Elsaid Ali Elsayed', '3,4'],
];

const AFFILIATIONS = [
  '1 Department of Medical Surgical Nursing, College of Nursing, Jouf University, Sakaka, Saudi Arabia',
  '2 Department of Maternal and Child Health Nursing, College of Nursing, Jouf University, Sakaka, Saudi Arabia',
  '3 Department of Community and Mental Health Nursing, College of Nursing, Najran University, Najran, Saudi Arabia',
  '4 Health Research Centre, Najran University, Najran, Saudi Arabia',
];

const CORRESPONDENCE = 'Correspondence: Osama Mohamed Elsayed Ramadan (omramadan@ju.edu.sa)';

// Body: [heading, [paragraphs...]]
const BODY = [
  ['1 | INTRODUCTION', [
    'We thank the commentators for their careful and generous reading of our study.{1,2} We welcome their recognition that it offers rare access to how nurses use AI-assisted early warning systems (AI-EWS), and that silent override deserves governance attention. We note that the commentary does not question the study’s design, conduct or analysis, or the credibility of its themes; its concern is a single inferential step, from nurses’ accounts of trust to the claim that this trust is calibrated. We respond on three points: what our study claimed, how feedback asymmetry bears on our argument, and where our recommendations converge.',
  ]],
  ['2 | WHAT THE STUDY CLAIMED, AND WHAT IT DID NOT', [
    'Our study used Interpretive Description, which aims to generate clinically meaningful understanding of how practitioners experience a phenomenon, not to measure its frequency or accuracy.{3} Automation bias theory served as a sensitising concept, indicating where to look rather than prescribing what to measure,{4} and remained, in our words, “subordinate to the inductive, interpretive commitments” of the design.{2} We did not estimate the prevalence of commission or omission errors, and we made no claim to have detected them.',
    'We agree that calibration, in Lee and See’s sense, is a correspondence between trust and a system’s actual capability, and that interviews cannot establish it.{5} We did not claim otherwise. We used “calibration” to name a process that participants described: trust that was “conditional, experience-dependent, and continually adjusted”.{2} We stated that self-reported calibrated trust “should be read as participants’ considered self-understanding rather than as a verified description of in-the-moment behaviour”, and that accounts had not been triangulated with audit logs, alert-response times or patient outcomes.{2} The commentators quote the first of these statements; it was included to bound precisely the inference they caution against. In Lee and See’s terms, participants described trust with high specificity, differentiated by patient, situation and alert;{5} whether that differentiation was also well calibrated is a separate question. Because “calibration” carries this precise technical meaning, we accept that “calibrating” (the work) would have conveyed our meaning more exactly than “calibrated” (an outcome), and we welcome this opportunity to make the distinction explicit.',
    'Nor are nurses’ accounts merely a weak proxy for behaviour. Nisbett and Wilson’s critique concerned introspective access to the cognitive processes underlying judgements, which they distinguished from access to the content of experience.{6} Our interviews elicited accounts of concrete clinical episodes and the meanings nurses attached to them. Those meanings have consequences of their own: they shape what senior nurses teach (“I teach junior nurses that the algorithm is one voice”, P19), whether divergence is documented (P16), and whether disagreement feels shared or isolating (P05, P09).{2} These are the points at which education and governance can act.',
    'We also accept that foundational accounts of trust in automation are dynamic.{5} Our claim concerned how automation bias has typically been framed in the healthcare literature, in terms of overreliance, complacency and error.{2} Lee and See place the evolution of trust within its organisational and cultural context;{5} our findings on collegial support, hierarchy, institutional ambivalence and documentation design give that context empirical content in critical care nursing.',
  ]],
  ['3 | FEEDBACK ASYMMETRY: AN EXTENSION WE WELCOME', [
    'The commentators’ central argument, that experience may teach a system’s false alarms more readily than its misses, is persuasive, and our data cannot rule it out. Participants’ exposure to the system ranged from 7 to 26 months,{2} and rare missed events may be under-represented in such experience. We regard this as a valuable extension of our account rather than a correction of it, for two reasons.',
    'First, the commentators’ own example shows how a miss becomes visible: through the nurse’s independent assessment (“The score was fine, but I knew something was wrong”, P09).{2} Kahneman and Klein’s conditions for valid intuition include an adequate opportunity to learn an environment’s regularities through practice and feedback.{7} At the bedside, the feedback that exposes a model’s silences is produced largely by the continuous surveillance that, we argued, must be “deliberately taught, practised and protected”.{2} If surveillance erodes into alert-dependence, the omission-type vulnerability we identified, misses would go not only undetected but unlearned, and experiential trust would be skewed in exactly the way the commentators predict. Feedback asymmetry therefore deepens our principal practice recommendation: independent nursing surveillance is both the safety net and the main source of evidence about what the model misses.',
    'Second, our data qualify the suggestion that differentiated trust may reflect algorithm aversion. Participants described institutional pressure towards reliance rather than away from it. One still “had to process the escalation because the alert existed” after an alarm whose cause, suctioning, was already known (P17); another described a double bind in which “the algorithm becomes the standard; I become the deviation” (P09).{2} Silent override, likewise, was not disregard of the score but an assessed, undocumented judgement: “I look at the alert, look at the patient, know it is not real, and move on” (P16).{2} Which way the net bias runs under these conditions is an empirical question for linked behavioural and outcome data, and we agree that it should be answered.',
    'We also accept the points on anchoring and concordant error. Bedside assessment is neither infallible nor wholly independent of the alert, which is why it cannot be the only reference.',
  ]],
  ['4 | CALIBRATED TO WHAT? TO THE PATIENT, AND TO THE SYSTEM', [
    'Our participants answered the commentators’ question directly: they weighed alerts against the patient in front of them, as captured in our subtheme “When the number does not match the patient”.{2} This reflects the central place of knowing the patient in nursing clinical judgement.{8} For a single decision at the bedside, the patient’s assessed condition is the reference available in real time. The commentators rightly add that a second reference is needed to know whether learned trust tracks the system’s reliability: local performance data that include missed events.',
    'We reported that the model’s architecture, training data and locally configured thresholds were held by the vendor and host institutions and were not independently audited, a limitation we acknowledged.{2} The external validation the commentators cite concerned a different, sepsis-specific proprietary model,{9} whereas our participants used a general physiological deterioration model, so its findings cannot be transposed to our setting. We share, however, the principle it illustrates: local performance should be known, and known to nurses.',
    'We accept the proposal for symmetric capture of outputs, responses and outcomes from system logs as a refinement of our override field. Our proposal aimed to turn documentation “from a defensive burden into a low-friction source of organisational learning”;{2} symmetric capture, including deteriorations that no alert preceded, would achieve this more completely and prevent acceptance from becoming the undocumented default. We had warned against “positioning the algorithm as the default standard against which nursing assessment is judged”;{2} on this, we and the commentators are agreed. We likewise endorse nurse-facing performance reports that include missed events, consistent with our recommendations that training address discordant alerts and that nursing leadership be central to AI monitoring and refinement.{2}',
  ]],
  ['5 | CONCLUSION: COMPLEMENTARY EVIDENCE', [
    'Our paper called for observational and think-aloud studies and for “linking experiential accounts with EHR audit data, such as override frequencies, alert-response times and patient outcomes”, so that self-reported trust could be “triangulated against observed behaviour”.{2} The commentators’ call for behavioural designs is one we share. The two forms of evidence answer different questions. Behavioural studies can show whether reliance tracks reliability; interpretive studies show why nurses rely as they do, what they teach, and which organisational conditions decide whether disagreement is recorded. Neither substitutes for the other.',
    '“Calibrated to what?” is the right question. Our participants answered it at the bedside: to the patient. The commentators add, rightly, that the system must answer it too. Safe AI-assisted early warning needs both answers, and nurses who keep watching closely enough to provide the first.',
  ]],
];

const CONFLICT = 'Conflict of Interest: The authors declare no conflicts of interest.';

const REFERENCES = [
  '[Authors]. Calibrated to what? Feedback asymmetry and the limits of experiential trust in AI-assisted early warning. Nursing in Critical Care. 2026.',
  'Samy R, Ramadan OME, Elsayed GEA. Trusting the algorithm or trusting the nurse? Critical care nurses’ experiences of automation bias and professional autonomy in AI-assisted early warning. Nursing in Critical Care. 2026;31:e70620. doi:10.1111/nicc.70620',
  'Thorne S. Interpretive Description: Qualitative Research for Applied Practice. 2nd ed. New York: Routledge; 2016.',
  'Blumer H. What is wrong with social theory? American Sociological Review. 1954;19(1):3-10.',
  'Lee JD, See KA. Trust in automation: designing for appropriate reliance. Human Factors. 2004;46(1):50-80. doi:10.1518/hfes.46.1.50_30392',
  'Nisbett RE, Wilson TD. Telling more than we can know: verbal reports on mental processes. Psychological Review. 1977;84(3):231-259. doi:10.1037/0033-295X.84.3.231',
  'Kahneman D, Klein G. Conditions for intuitive expertise: a failure to disagree. American Psychologist. 2009;64(6):515-526. doi:10.1037/a0016755',
  'Tanner CA. Thinking like a nurse: a research-based model of clinical judgment in nursing. Journal of Nursing Education. 2006;45(6):204-211. doi:10.3928/01484834-20060601-04',
  'Wong A, Otles E, Donnelly JP, et al. External validation of a widely implemented proprietary sepsis prediction model in hospitalized patients. JAMA Internal Medicine. 2021;181(8):1065-1070. doi:10.1001/jamainternmed.2021.2626',
];

// ---------- helpers ----------

function runs(text, opts = {}) {
  // Split "...text{1,2} more" into normal and superscript runs.
  const out = [];
  const re = /\{([0-9,–-]+)\}/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), font: FONT, size: SIZE, ...opts }));
    out.push(new TextRun({ text: m[1], font: FONT, size: SIZE, superScript: true, ...opts }));
    last = re.lastIndex;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), font: FONT, size: SIZE, ...opts }));
  return out;
}

function para(text, { after = 200, align = AlignmentType.JUSTIFIED, bold = false, italics = false, size } = {}) {
  const o = { bold, italics };
  if (size) o.size = size;
  return new Paragraph({
    alignment: align,
    spacing: { line: LINE, after },
    children: runs(text, o),
  });
}

function heading(text) {
  return new Paragraph({
    spacing: { line: LINE, before: 240, after: 120 },
    keepNext: true,
    children: [new TextRun({ text, font: FONT, size: SIZE, bold: true })],
  });
}

function authorLine() {
  const children = [];
  AUTHORS.forEach(([name, sup], i) => {
    children.push(new TextRun({ text: name, font: FONT, size: SIZE }));
    children.push(new TextRun({ text: sup, font: FONT, size: SIZE, superScript: true }));
    if (i < AUTHORS.length - 1) children.push(new TextRun({ text: ' | ', font: FONT, size: SIZE }));
  });
  return new Paragraph({ alignment: AlignmentType.LEFT, spacing: { line: LINE, after: 120 }, children });
}

function affiliation(text) {
  const [sup, ...rest] = text.split(' ');
  return new Paragraph({
    spacing: { line: 276, after: 60 },
    children: [
      new TextRun({ text: sup, font: FONT, size: 20, superScript: true }),
      new TextRun({ text: rest.join(' '), font: FONT, size: 20 }),
    ],
  });
}

function wordCount(s) {
  return s.replace(/\{[0-9,–-]+\}/g, '').split(/\s+/).filter(Boolean).length;
}

// ---------- word counts ----------

const bodyText = BODY.map(([h, ps]) => [h, ...ps].join(' ')).join(' ');
const bodyWords = wordCount(bodyText);
const titleWords = wordCount(TITLE);
const refWords = wordCount(REFERENCES.join(' '));
const mainWords = bodyWords + titleWords;

// ---------- document ----------

const children = [];
children.push(new Paragraph({
  spacing: { after: 120 },
  children: [new TextRun({ text: 'RESPONSE TO COMMENTARY', font: FONT, size: 20, bold: true })],
}));
children.push(new Paragraph({
  spacing: { line: LINE, after: 240 },
  children: [new TextRun({ text: TITLE, font: FONT, size: 32, bold: true })],
}));
children.push(authorLine());
AFFILIATIONS.forEach(a => children.push(affiliation(a)));
children.push(para(CORRESPONDENCE, { after: 120, align: AlignmentType.LEFT, size: 20 }));
children.push(para(RESPONSE_TO, { after: 120, align: AlignmentType.LEFT, italics: true, size: 20 }));
children.push(para(`Word count: ${mainWords} words (title and main text, excluding author details and references).`, { after: 240, align: AlignmentType.LEFT, size: 20 }));

BODY.forEach(([h, ps]) => {
  children.push(heading(h));
  ps.forEach(p => children.push(para(p)));
});

children.push(heading('CONFLICT OF INTEREST'));
children.push(para(CONFLICT.replace('Conflict of Interest: ', '')));

children.push(heading('REFERENCES'));
REFERENCES.forEach((r, i) => children.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: 276, after: 100 },
  indent: { left: 400, hanging: 400 },
  children: [new TextRun({ text: `${i + 1}. ${r}`, font: FONT, size: 22 })],
})));

const doc = new Document({
  creator: 'Osama Mohamed Elsayed Ramadan',
  title: 'Calibrated to the patient: A response to "Calibrated to what?"',
  styles: { default: { document: { run: { font: FONT, size: SIZE } } } },
  sections: [{
    properties: {
      page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } },
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 20 })],
        })],
      }),
    },
    children,
  }],
});

const outPath = path.join(__dirname, 'Response_to_Commentary_NICC_e70620.docx');
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath}`);
  console.log(`Title + main text: ${mainWords} words (title ${titleWords}, body incl. headings ${bodyWords}); references: ${refWords} words; total incl. references: ${mainWords + refWords}`);
});

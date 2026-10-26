// Builds the blank bilingual (English/Arabic) informed consent form for the
// midwives' heat study (Healthcare, MDPI). Text in [square brackets] is a
// placeholder and is highlighted yellow so it can be checked against the
// IRB-approved version before upload. All details come from the published manuscript.
// Run: node heat_midwives_consent/build_consent_form.js
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  AlignmentType, BorderStyle, ShadingType, LevelFormat, Footer, Header,
  PageNumber, PageBreak, TableLayoutType,
} = require("docx");

const W = 9638; // A4 text width in DXA with 2 cm margins
const FONT = "Arial";

// ---------- text helpers ----------
function runs(text, { rtl = false, bold = false, italics = false, size = 21 } = {}) {
  // split on [placeholders] and highlight them
  return text.split(/(\[[^\]]*\])/).filter(Boolean).map((part) => {
    const ph = part.startsWith("[") && part.endsWith("]");
    return new TextRun({
      text: part, bold, italics, size, font: FONT, rightToLeft: rtl,
      highlight: ph ? "yellow" : undefined,
    });
  });
}
function p(text, o = {}) {
  return new Paragraph({
    bidirectional: !!o.rtl,
    alignment: o.align || (o.rtl ? AlignmentType.RIGHT : AlignmentType.JUSTIFIED),
    spacing: { after: o.after ?? 100, before: o.before ?? 0, line: 276 },
    keepNext: o.keepNext,
    numbering: o.bullet ? { reference: o.rtl ? "bul-rtl" : "bul", level: 0 } : undefined,
    children: Array.isArray(text) ? text : runs(text, o),
  });
}
function h(text, o = {}) {
  return new Paragraph({
    bidirectional: !!o.rtl,
    alignment: o.rtl ? AlignmentType.RIGHT : AlignmentType.LEFT,
    spacing: { before: 200, after: 80 },
    keepNext: true,
    border: o.rule ? { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1F3864", space: 2 } } : undefined,
    children: runs(text, { rtl: o.rtl, bold: true, size: o.size || 23 }),
  });
}
function title(text, rtl, size = 30) {
  return new Paragraph({
    bidirectional: rtl, alignment: AlignmentType.CENTER, spacing: { after: 80 },
    children: runs(text, { rtl, bold: true, size }),
  });
}

const thin = { style: BorderStyle.SINGLE, size: 4, color: "808080" };
const borders = { top: thin, bottom: thin, left: thin, right: thin };
function cell(content, width, o = {}) {
  const kids = (Array.isArray(content) ? content : [content]).map((c) =>
    typeof c === "string" ? p(c, { rtl: o.rtl, bold: o.bold, after: 40, align: o.align || (o.rtl ? AlignmentType.RIGHT : AlignmentType.LEFT), size: o.size || 20 }) : c);
  return new TableCell({
    width: { size: width, type: WidthType.DXA }, borders,
    shading: o.fill ? { type: ShadingType.CLEAR, color: "auto", fill: o.fill } : undefined,
    margins: { top: 30, bottom: 30, left: 100, right: 100 },
    columnSpan: o.span,
    children: kids,
  });
}
function table(rows, widths, rtl) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths, layout: TableLayoutType.FIXED, visuallyRightToLeft: rtl,
    rows: rows.map((r, i) => new TableRow({
      cantSplit: true, tableHeader: i === 0 && r.header,
      children: r.cells.map((c, j) => cell(c, widths[j], { rtl, bold: r.header, fill: r.header ? "D9E2F3" : undefined, ...(r.opts || {}) })),
    })),
  });
}
const spacer = (n = 80) => new Paragraph({ spacing: { after: n }, children: [] });

// ---------- shared content ----------
const ethics = {
  en: [
    { header: true, cells: ["Approving committee", "Reference", "Approval date"] },
    { cells: ["Institutional Review Board, Majmaah University", "MUREC/COM-4 April 2025/305", "April 2025"] },
    { cells: ["Institutional Review Board, King Abdulaziz Specialist Hospital, Al Jouf Health Cluster", "Committee registration H-13-S-161; approval no. 5670", "9 May 2025"] },
    { cells: ["General Directorate of Health Affairs, Hail Health Cluster", "KACST IRB registration H-11-08L-074; IRB log no. 2025-66", "1 June 2025"] },
  ],
  ar: [
    { header: true, cells: ["لجنة الموافقة", "المرجع", "تاريخ الموافقة"] },
    { cells: ["مجلس المراجعة المؤسسية، جامعة المجمعة", "MUREC/COM-4 April 2025/305", "أبريل 2025"] },
    { cells: ["مجلس المراجعة المؤسسية، مستشفى الملك عبدالعزيز التخصصي، تجمع الجوف الصحي", "تسجيل اللجنة H-13-S-161؛ رقم الموافقة 5670", "9 مايو 2025"] },
    { cells: ["المديرية العامة للشؤون الصحية، تجمع حائل الصحي", "تسجيل KACST رقم H-11-08L-074؛ رقم السجل 2025-66", "1 يونيو 2025"] },
  ],
};

// ---------- ENGLISH ----------
function english() {
  const o = {};
  const out = [];
  out.push(title("PARTICIPANT INFORMATION SHEET AND INFORMED CONSENT FORM", false, 28));
  out.push(p("Study title: When Does Heat Matter Beyond the Cooled Ward? Midwives’ Clinical Judgments Across the Maternity Care Pathway in Saudi Arabia: An Interpretive Description", { align: AlignmentType.CENTER, bold: true, size: 22, after: 60 }));
  out.push(p("Language: English (an Arabic version is provided)", { align: AlignmentType.CENTER, italics: true, size: 19, after: 160 }));

  out.push(h("Research team", { rule: true }));
  out.push(table([
    { cells: ["Principal investigator", "Athar Odah Alshammari, Department of Maternity and Child Health, Nursing College, University of Hail, Hail, Saudi Arabia\nEmail: athar.alshammari@uoh.edu.sa"] },
    { cells: ["Corresponding researcher", "Nada Alqarawi, College of Community, Psychiatric and Mental Health Nursing, Qassim University, Buraydah, Saudi Arabia. Email: n.alqarawi@qu.edu.sa"] },
    { cells: ["Co-investigators", "Afrah Madyan Alshammari, Mutairah Alamlah Alshammari and Manar Fayez Al-ruwaili (College of Nursing, Jouf University); Areej Abunar (Faculty of Nursing, King Abdulaziz University); Osama Mohamed Elsayed Ramadan (Faculty of Nursing, Cairo University); Heba Tallah Elashmawy Mohamed Shaban (College of Nursing, Majmaah University)"] },
    { cells: ["Interviewer", "A female member of the research team: a PhD-prepared academic nurse trained in qualitative interviewing. She does not work in your team and has no supervisory or evaluative role over you."] },
  ].map((r) => ({ cells: r.cells.map((c) => c.split("\n")), opts: {} })), [2600, W - 2600], false));
  out.push(spacer());
  out.push(h("Ethics approval", { rule: true }));
  out.push(p("This study has been reviewed and approved by the following committees and follows the Declaration of Helsinki. Administrative permission has been obtained from the participating maternity services.", o));
  out.push(table(ethics.en, [4200, 3438, 2000], false));

  out.push(h("PART A: INFORMATION SHEET", { size: 25, rule: true }));
  out.push(p("You are invited to take part in a research study. Please read this information carefully. You will have at least 48 hours to consider it, and you may discuss it with anyone you wish before deciding. Please ask the research team about anything that is unclear."));

  out.push(h("1. Why is this study being done?"));
  out.push(p("Hot weather may affect the health of pregnant and postnatal women. Little is known about how midwives working in air-conditioned maternity units think about the conditions women experience outside the facility, such as travel, waiting, work or home conditions, during periods that feel unusually hot. This study aims to understand how midwives recognize and respond to these circumstances before a woman arrives, while she is in the unit, and after she leaves, and what helps or hinders that work. The results may inform future guidance and staff support."));

  out.push(h("2. Why have I been invited?"));
  out.push(p("You have been invited because you may meet all of the following criteria:"));
  ["You hold current Saudi Commission for Health Specialties classification and registration in midwifery (Midwife Specialist or Midwife Technician).",
    "You have at least 12 months of direct maternity care experience in a participating public maternity service.",
    "You have worked through at least one complete hot season in this region."].forEach((t) => out.push(p(t, { bullet: true, after: 40 })));
  out.push(p("Maternity nurses without midwifery classification, and midwives who line-manage potential participants, cannot take part. About 20–25 midwives from three regions of northern and central Saudi Arabia will be interviewed.", { before: 60 }));

  out.push(h("3. Do I have to take part?"));
  out.push(p("No. Taking part is entirely voluntary and is not related to your employment, appraisal, contract or licensing. Your managers will not nominate you and will not be told whether you took part. You may decline to answer any question, pause or stop the interview at any time, and withdraw from the study without giving a reason and without any penalty. If you withdraw, your recording and transcript will be destroyed. Once your data have been de-identified and combined with other participants’ data in the analysis, it may no longer be possible to remove them."));

  out.push(h("4. What will happen if I take part?"));
  ["You will take part in one individual interview with the interviewer named above, lasting about 60 minutes (it may be shorter or longer depending on what you wish to share).",
    "You may choose to be interviewed in Arabic or English.",
    "The interview will take place outside your clinical duty, at a time you choose, either in a private room or by encrypted videoconference. No other person will be present.",
    "You will be asked to talk about a recent shift or encounter during a hot period: what you noticed, what you were unsure about, and how you approached assessment, advice, documentation, transfer, cooling and workload. Times when heat did not seem important are equally useful.",
    "Please do not mention the names or other identifying details of women, babies or colleagues. If any are mentioned, they will be removed from the transcript.",
    "Optional: you may be invited to one shorter follow-up interview, in the same language, to clarify or expand on your account.",
    "Optional: you may receive a short written summary of the developing findings and be invited to comment on it."].forEach((t) => out.push(p(t, { bullet: true, after: 40 })));

  out.push(h("5. Audio recording, transcription and translation"));
  out.push(p("The interview will be audio-recorded. Audio recording is needed to take part. One team member will transcribe the recording word-for-word in the language spoken, and another will check the transcript against the audio. Short extracts from Arabic interviews may be translated into English and checked by a second bilingual researcher. The interviewer may also write brief field notes. Transcripts will not be returned to you."));

  out.push(h("6. Are there any risks or disadvantages?"));
  out.push(p("Risks are expected to be minimal. The interview will take some of your time. Talking about clinical decisions or working conditions may feel uncomfortable or raise concerns about how your practice may be viewed; you may skip any question or stop at any time. Because the number of participants is small, there is a small risk that someone could recognize you from contextual details. The steps described in Section 8 are designed to reduce this risk."));

  out.push(h("7. Are there any benefits? Will I be paid?"));
  out.push(p("There is no direct benefit to you. Your experience may help improve guidance, documentation and staff support in maternity services during hot periods. You will not receive payment or reimbursement, and taking part will not cost you anything."));

  out.push(h("8. How will my information be kept confidential?"));
  ["You will be given a code number (for example, P07). Your name will not appear on recordings, transcripts or reports.",
    "The file linking your name, code and region will be kept separately with restricted access.",
    "Recordings, transcripts and notes will be stored on an encrypted, access-restricted institutional drive available only to the research team.",
    "Names of facilities, units, places and other identifying details will be removed or made general.",
    "Published reports will describe participants only in aggregate (for example, numbers by experience band), not as individual profiles.",
    "Transcripts will not be made public. De-identified extracts may be shared with other researchers only on reasonable request and subject to ethics approval.",
    "Data will be kept securely for the period required by the approving ethics committees and institutional policy, and then securely destroyed."].forEach((t) => out.push(p(t, { bullet: true, after: 40 })));

  out.push(h("9. What will happen to the results?"));
  out.push(p("The results will be published in scientific journals and presented at conferences. These may include short de-identified quotations of your words (translated into English if you spoke Arabic), labelled only with your code number. Quotations will not be used without your consent below."));

  out.push(h("10. Who can I contact?"));
  out.push(p("For questions about the study: Athar Odah Alshammari (principal investigator), Email: athar.alshammari@uoh.edu.sa; or Nada Alqarawi (corresponding researcher), Email: n.alqarawi@qu.edu.sa."));
  out.push(p("For questions about your rights as a participant, or to raise a concern: the Institutional Review Board of Majmaah University, or the ethics committee of your health cluster listed above."));
  out.push(p("Thank you for considering taking part in this study.", { italics: true }));

  // ---- Part B ----
  out.push(new Paragraph({ children: [new PageBreak()] }));
  out.push(title("PART B: INFORMED CONSENT FORM", false, 26));
  out.push(p("Study title: When Does Heat Matter Beyond the Cooled Ward? Midwives’ Clinical Judgments Across the Maternity Care Pathway in Saudi Arabia", { align: AlignmentType.CENTER, size: 20, after: 60 }));
  out.push(p("Participant code (completed by research team): P____        Region code: ____", { align: AlignmentType.CENTER, bold: true, size: 20, after: 80 }));
  out.push(p("Please initial each box to show that you agree.", { bold: true }));

  const stmts = [
    "I have read (or have had read to me) the Participant Information Sheet (Part A) of this document. I received it at least 48 hours before the interview, I have had the opportunity to ask questions, and my questions have been answered satisfactorily.",
    "I confirm that I am a registered midwife classified by the Saudi Commission for Health Specialties, with at least 12 months of direct maternity care in a participating service and at least one completed hot season in this region.",
    "I understand that my participation is voluntary and unrelated to my employment, and that I am free to decline any question or withdraw at any time without giving a reason and without any effect on my work or legal rights.",
    "I understand that my managers will not be told whether I took part.",
    "I agree to take part in an individual interview for this study.",
    "I agree to the interview being audio-recorded and transcribed.",
    "I agree that short de-identified quotations from my interview (translated into English where necessary) may be used in publications and presentations, identified only by a code number.",
    "I understand that my information will be stored securely and handled confidentially as described in the Information Sheet, and that de-identified extracts may be shared with other researchers only on request and with ethics approval.",
  ];
  out.push(table([
    { header: true, cells: ["No.", "Statement", "Initials"] },
    ...stmts.map((s, i) => ({ cells: [String(i + 1), s, ""], opts: { size: 19 } })),
  ], [700, W - 700 - 1300, 1300], false));
  out.push(spacer(60));
  out.push(p("Optional items (please tick one box for each). Your answers do not affect your participation.", { bold: true, keepNext: true }));
  out.push(table([
    { header: true, cells: ["No.", "Statement", "Yes", "No"] },
    { cells: ["9", "I agree to be contacted about a possible follow-up interview.", "☐", "☐"] },
    { cells: ["10", "I would like to receive a summary of the developing findings and to be invited to comment on it.", "☐", "☐"] },
  ], [700, W - 700 - 1300, 650, 650], false));
  out.push(spacer(60));
  out.push(table([
    { cells: ["Preferred interview language:", "☐ Arabic      ☐ English"] },
    { cells: ["Preferred interview mode:", "☐ In person (private room)      ☐ Encrypted videoconference"] },
    { cells: ["Preferred contact (for follow-up/summary only):", "Email or phone: ______________________________"] },
  ], [3600, W - 3600], false));
  out.push(spacer(80));
  out.push(table([
    { header: true, cells: ["", "Name", "Signature", "Date"] },
    { cells: ["Participant", "", "", ""] },
    { cells: ["Researcher obtaining consent", "", "", ""] },
  ].map((r, i) => i === 0 ? r : { cells: r.cells, opts: { size: 20 } }), [2600, 2700, 2638, 1700], false));
  out.push(spacer(80));
  out.push(p("For videoconference interviews, the signed consent form is returned to the research team before the interview begins.", { italics: true, size: 19 }));
  return out;
}

// ---------- ARABIC ----------
function arabic() {
  const r = { rtl: true };
  const out = [];
  out.push(title("ورقة معلومات المشاركة ونموذج الموافقة المستنيرة", true, 28));
  out.push(p("عنوان الدراسة: متى تكون للحرارة أهمية خارج الجناح المُكيَّف؟ الأحكام السريرية للقابلات عبر مسار رعاية الأمومة في المملكة العربية السعودية: دراسة وصفية تفسيرية", { ...r, align: AlignmentType.CENTER, bold: true, size: 22, after: 60 }));
  out.push(p("اللغة: العربية (تتوفر نسخة باللغة الإنجليزية)", { ...r, align: AlignmentType.CENTER, italics: true, size: 19, after: 160 }));

  out.push(h("فريق البحث", { ...r, rule: true }));
  out.push(table([
    { cells: [["الباحث الرئيس"], ["Athar Odah Alshammari، قسم الأمومة والطفولة، كلية التمريض، جامعة حائل، حائل، المملكة العربية السعودية", "البريد الإلكتروني: athar.alshammari@uoh.edu.sa"]] },
    { cells: [["الباحثة المراسلة"], ["Nada Alqarawi، قسم تمريض المجتمع والتمريض النفسي والصحة النفسية، كلية التمريض، جامعة القصيم، بريدة، المملكة العربية السعودية. البريد الإلكتروني: n.alqarawi@qu.edu.sa"]] },
    { cells: [["الباحثون المشاركون"], [
      "Afrah Madyan Alshammari (كلية التمريض، جامعة الجوف)",
      "Mutairah Alamlah Alshammari (كلية التمريض، جامعة الجوف)",
      "Manar Fayez Al-ruwaili (كلية التمريض، جامعة الجوف)",
      "Areej Abunar (كلية التمريض، جامعة الملك عبدالعزيز)",
      "Osama Mohamed Elsayed Ramadan (كلية التمريض، جامعة القاهرة)",
      "Heba Tallah Elashmawy Mohamed Shaban (كلية التمريض، جامعة المجمعة)"]] },
    { cells: [["القائمة بالمقابلة"], ["عضوة في فريق البحث: ممرضة أكاديمية حاصلة على الدكتوراه ومدرَّبة على إجراء المقابلات النوعية. لا تعمل ضمن فريقك وليس لها أي دور إشرافي أو تقييمي عليك."]] },
  ], [2600, W - 2600], true));
  out.push(spacer());
  out.push(h("الموافقة الأخلاقية", { ...r, rule: true }));
  out.push(p("تمت مراجعة هذه الدراسة والموافقة عليها من اللجان التالية، وهي تلتزم بإعلان هلسنكي. كما تم الحصول على الإذن الإداري من خدمات الأمومة المشاركة.", r));
  out.push(table(ethics.ar, [4200, 3438, 2000], true));

  out.push(h("الجزء (أ): ورقة المعلومات", { ...r, size: 25, rule: true }));
  out.push(p("أنتِ مدعوة للمشاركة في دراسة بحثية. يُرجى قراءة هذه المعلومات بعناية. سيكون لديكِ ما لا يقل عن 48 ساعة للتفكير فيها، ويمكنكِ مناقشتها مع من تشائين قبل اتخاذ قراركِ. لا تترددي في سؤال فريق البحث عن أي أمر غير واضح.", r));

  out.push(h("1. لماذا تُجرى هذه الدراسة؟", r));
  out.push(p("قد يؤثر الطقس الحار على صحة النساء الحوامل والنفاس. ولا يُعرف إلا القليل عن كيفية تفكير القابلات العاملات في وحدات الأمومة المكيَّفة في الظروف التي تمر بها المرأة خارج المنشأة، مثل التنقل والانتظار وظروف العمل أو المنزل، خلال الفترات التي يُشعر فيها بحرارة غير معتادة. تهدف هذه الدراسة إلى فهم كيف تتعرف القابلات على هذه الظروف ويستجبن لها قبل وصول المرأة، وأثناء وجودها في الوحدة، وبعد مغادرتها، وما الذي يساعد هذا العمل أو يعيقه. وقد تسهم النتائج في إعداد إرشادات مستقبلية ودعم العاملين.", r));

  out.push(h("2. لماذا تمت دعوتي؟", r));
  out.push(p("تمت دعوتكِ لأنكِ قد تستوفين جميع المعايير التالية:", r));
  ["لديكِ تصنيف وتسجيل ساريان في القبالة من الهيئة السعودية للتخصصات الصحية (أخصائية قبالة أو فنية قبالة).",
    "لديكِ خبرة لا تقل عن 12 شهرًا في الرعاية المباشرة للأمومة في إحدى خدمات الأمومة الحكومية المشاركة.",
    "عملتِ خلال موسم حار كامل واحد على الأقل في هذه المنطقة."].forEach((t) => out.push(p(t, { ...r, bullet: true, after: 40 })));
  out.push(p("لا يمكن مشاركة ممرضات الأمومة غير الحاصلات على تصنيف القبالة، ولا القابلات اللواتي يتولين الإدارة المباشرة لمشاركات محتملات. ستُجرى مقابلات مع نحو 20–25 قابلة من ثلاث مناطق في شمال ووسط المملكة العربية السعودية.", { ...r, before: 60 }));

  out.push(h("3. هل يجب عليّ المشاركة؟", r));
  out.push(p("لا. المشاركة تطوعية بالكامل ولا علاقة لها بوظيفتكِ أو تقييم أدائكِ أو عقدكِ أو ترخيصكِ المهني. لن يرشحكِ مديروكِ ولن يُبلَّغوا بمشاركتكِ من عدمها. يمكنكِ الامتناع عن الإجابة عن أي سؤال، أو إيقاف المقابلة مؤقتًا أو إنهاؤها في أي وقت، والانسحاب من الدراسة دون إبداء أسباب ودون أي عواقب. في حال انسحابكِ سيتم إتلاف التسجيل والنص المكتوب الخاص بكِ. وبعد إزالة المعلومات التعريفية من بياناتكِ ودمجها مع بيانات المشاركات الأخريات في التحليل، قد يتعذر حذفها.", r));

  out.push(h("4. ماذا سيحدث إذا شاركتُ؟", r));
  ["ستشاركين في مقابلة فردية واحدة مع القائمة بالمقابلة المذكورة أعلاه، تستغرق نحو 60 دقيقة (وقد تقل أو تزيد بحسب ما ترغبين في مشاركته).",
    "يمكنكِ اختيار إجراء المقابلة باللغة العربية أو الإنجليزية.",
    "ستُجرى المقابلة خارج أوقات عملكِ السريري، في الوقت الذي تختارينه، إما في غرفة خاصة أو عبر اتصال مرئي مشفَّر، ولن يحضرها أي شخص آخر.",
    "سيُطلب منكِ الحديث عن مناوبة أو موقف حديث خلال فترة حارة: ما الذي لاحظتِه، وما الذي لم تكوني متأكدة منه، وكيف تعاملتِ مع التقييم والنصح والتوثيق والنقل والتبريد وعبء العمل. كما أن المواقف التي لم تبدُ فيها الحرارة مهمة مفيدة بالقدر نفسه.",
    "يُرجى عدم ذكر أسماء النساء أو المواليد أو الزميلات أو أي تفاصيل تعريفية عنهم. وفي حال ذكرها ستُحذف من النص المكتوب.",
    "اختياري: قد تتم دعوتكِ إلى مقابلة متابعة واحدة أقصر، باللغة نفسها، لتوضيح ما ذكرتِه أو التوسع فيه.",
    "اختياري: قد تتلقين ملخصًا مكتوبًا قصيرًا للنتائج الأولية وتُدعين لإبداء ملاحظاتكِ عليه."].forEach((t) => out.push(p(t, { ...r, bullet: true, after: 40 })));

  out.push(h("5. التسجيل الصوتي والتفريغ والترجمة", r));
  out.push(p("سيتم تسجيل المقابلة صوتيًا، والتسجيل الصوتي شرط للمشاركة. ستقوم إحدى عضوات الفريق بتفريغ التسجيل حرفيًا باللغة التي جرت بها المقابلة، وستقوم أخرى بمراجعة النص مقابل التسجيل. قد تُترجم مقتطفات قصيرة من المقابلات العربية إلى الإنجليزية وتراجعها باحثة ثانية ثنائية اللغة. وقد تدوِّن القائمة بالمقابلة ملاحظات ميدانية موجزة. لن تُعاد النصوص المكتوبة إليكِ.", r));

  out.push(h("6. هل توجد أي مخاطر أو سلبيات؟", r));
  out.push(p("يُتوقع أن تكون المخاطر في حدها الأدنى. ستستغرق المقابلة جزءًا من وقتكِ. وقد يسبب الحديث عن القرارات السريرية أو ظروف العمل شعورًا بعدم الارتياح أو قلقًا بشأن كيفية النظر إلى ممارستكِ؛ ويمكنكِ تخطي أي سؤال أو التوقف في أي وقت. ونظرًا لقلة عدد المشاركات، هناك احتمال ضئيل أن يتعرف أحد عليكِ من تفاصيل السياق، والإجراءات الموضحة في البند 8 مصممة لتقليل هذا الاحتمال.", r));

  out.push(h("7. هل توجد فوائد؟ وهل سأحصل على مقابل مادي؟", r));
  out.push(p("لا توجد فائدة مباشرة لكِ. وقد تسهم تجربتكِ في تحسين الإرشادات والتوثيق ودعم العاملين في خدمات الأمومة خلال الفترات الحارة. لن تحصلي على أي مقابل مادي أو تعويض، ولن تتحملي أي تكلفة مقابل المشاركة.", r));

  out.push(h("8. كيف ستُحفظ سرية معلوماتي؟", r));
  ["سيُعطى لكِ رمز رقمي (مثل P07)، ولن يظهر اسمكِ على التسجيلات أو النصوص أو التقارير.",
    "يُحفظ الملف الذي يربط اسمكِ برمزكِ ومنطقتكِ بشكل منفصل وبصلاحيات وصول مقيدة.",
    "تُحفظ التسجيلات والنصوص والملاحظات على وحدة تخزين مؤسسية مشفَّرة ومقيدة الوصول، متاحة لفريق البحث فقط.",
    "ستُحذف أسماء المنشآت والوحدات والأماكن وأي تفاصيل تعريفية أخرى أو تُعمَّم.",
    "ستصف التقارير المنشورة المشاركات بصورة إجمالية فقط (مثل الأعداد حسب فئات الخبرة)، وليس بملفات فردية.",
    "لن تُتاح النصوص للعامة. وقد تُشارَك مقتطفات خالية من المعلومات التعريفية مع باحثين آخرين فقط عند تقديم طلب معقول وبعد الحصول على موافقة أخلاقية.",
    "ستُحفظ البيانات بشكل آمن للمدة التي تحددها لجان الأخلاقيات المعتمدة والسياسات المؤسسية، ثم تُتلف بشكل آمن."].forEach((t) => out.push(p(t, { ...r, bullet: true, after: 40 })));

  out.push(h("9. ماذا سيحدث للنتائج؟", r));
  out.push(p("ستُنشر النتائج في مجلات علمية وتُعرض في مؤتمرات، وقد تتضمن اقتباسات قصيرة من كلامكِ خالية من المعلومات التعريفية (مترجمة إلى الإنجليزية إذا كانت المقابلة بالعربية)، ولا يُشار إليها إلا برمزكِ الرقمي. لن تُستخدم الاقتباسات دون موافقتكِ أدناه.", r));

  out.push(h("10. بمن يمكنني التواصل؟", r));
  out.push(p("للاستفسار عن الدراسة: Athar Odah Alshammari (الباحث الرئيس)، البريد الإلكتروني: athar.alshammari@uoh.edu.sa؛ أو Nada Alqarawi (الباحثة المراسلة)، البريد الإلكتروني: n.alqarawi@qu.edu.sa.", r));
  out.push(p("للاستفسار عن حقوقكِ كمشاركة أو لتقديم شكوى: مجلس المراجعة المؤسسية بجامعة المجمعة، أو لجنة الأخلاقيات في التجمع الصحي التابعة له والمذكورة أعلاه.", r));
  out.push(p("شكرًا لكِ على النظر في المشاركة في هذه الدراسة.", { ...r, italics: true }));

  out.push(new Paragraph({ bidirectional: true, children: [new PageBreak()] }));
  out.push(title("الجزء (ب): نموذج الموافقة المستنيرة", true, 26));
  out.push(p("عنوان الدراسة: متى تكون للحرارة أهمية خارج الجناح المُكيَّف؟ الأحكام السريرية للقابلات عبر مسار رعاية الأمومة في المملكة العربية السعودية", { ...r, align: AlignmentType.CENTER, size: 20, after: 60 }));
  out.push(p("رمز المشاركة (يعبئه فريق البحث): P____        رمز المنطقة: ____", { ...r, align: AlignmentType.CENTER, bold: true, size: 20, after: 140 }));
  out.push(p("يُرجى كتابة الأحرف الأولى من اسمكِ في كل خانة للدلالة على موافقتكِ.", { ...r, bold: true }));
  const stmts = [
    "قرأتُ (أو قُرئت عليّ) ورقة معلومات المشاركة (الجزء أ) من هذه الوثيقة. وقد استلمتُها قبل المقابلة بما لا يقل عن 48 ساعة، وأُتيحت لي فرصة طرح الأسئلة، وتمت الإجابة عنها بشكل مُرضٍ.",
    "أؤكد أنني قابلة مسجلة ومصنفة لدى الهيئة السعودية للتخصصات الصحية، ولديّ خبرة لا تقل عن 12 شهرًا في الرعاية المباشرة للأمومة في خدمة مشاركة، وأكملتُ موسمًا حارًا واحدًا على الأقل في هذه المنطقة.",
    "أفهم أن مشاركتي تطوعية ولا علاقة لها بوظيفتي، وأن لي الحرية في الامتناع عن أي سؤال أو الانسحاب في أي وقت دون إبداء أسباب ودون أي أثر على عملي أو حقوقي النظامية.",
    "أفهم أن مديريّ لن يُبلَّغوا بمشاركتي من عدمها.",
    "أوافق على المشاركة في مقابلة فردية لهذه الدراسة.",
    "أوافق على تسجيل المقابلة صوتيًا وتفريغها كتابيًا.",
    "أوافق على استخدام اقتباسات قصيرة من مقابلتي خالية من المعلومات التعريفية (مترجمة إلى الإنجليزية عند الحاجة) في المنشورات والعروض العلمية، مع الإشارة إليها برمز رقمي فقط.",
    "أفهم أن معلوماتي ستُحفظ بشكل آمن وتُعامل بسرية كما هو موضح في ورقة المعلومات، وأن المقتطفات الخالية من المعلومات التعريفية قد تُشارَك مع باحثين آخرين فقط عند الطلب وبموافقة أخلاقية.",
  ];
  out.push(table([
    { header: true, cells: ["الرقم", "البند", "الأحرف الأولى"] },
    ...stmts.map((s, i) => ({ cells: [String(i + 1), s, ""] })),
  ], [700, W - 700 - 1300, 1300], true));
  out.push(spacer(120));
  out.push(p("بنود اختيارية (يُرجى وضع علامة في خانة واحدة لكل بند). لا تؤثر إجاباتكِ على مشاركتكِ.", { ...r, bold: true, keepNext: true }));
  out.push(table([
    { header: true, cells: ["الرقم", "البند", "نعم", "لا"] },
    { cells: ["9", "أوافق على التواصل معي بشأن مقابلة متابعة محتملة.", "☐", "☐"] },
    { cells: ["10", "أرغب في تلقي ملخص للنتائج الأولية ودعوتي لإبداء ملاحظاتي عليه.", "☐", "☐"] },
  ], [700, W - 700 - 1300, 650, 650], true));
  out.push(spacer(120));
  out.push(table([
    { cells: ["لغة المقابلة المفضلة:", "☐ العربية      ☐ الإنجليزية"] },
    { cells: ["طريقة المقابلة المفضلة:", "☐ حضوريًا (غرفة خاصة)      ☐ اتصال مرئي مشفَّر"] },
    { cells: ["وسيلة التواصل المفضلة (للمتابعة أو الملخص فقط):", "البريد الإلكتروني أو الهاتف: ______________________________"] },
  ], [3600, W - 3600], true));
  out.push(spacer(160));
  out.push(table([
    { header: true, cells: ["", "الاسم", "التوقيع", "التاريخ"] },
    { cells: ["المشاركة", "", "", ""] },
    { cells: ["الباحثة التي حصلت على الموافقة", "", "", ""] },
  ], [2600, 2700, 2638, 1700], true));
  out.push(spacer(80));
  out.push(p("للمقابلات عبر الاتصال المرئي: تُعاد نسخة نموذج الموافقة الموقَّع إلى فريق البحث قبل بدء المقابلة.", { ...r, italics: true, size: 19 }));
  return out;
}

const footer = (rtl) => new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER, bidirectional: rtl,
    children: [
      new TextRun({ text: rtl ? "نموذج الموافقة المستنيرة — صفحة " : "Informed consent form — page ", size: 16, font: FONT, color: "666666", rightToLeft: rtl }),
      new TextRun({ children: [PageNumber.CURRENT], size: 16, font: FONT, color: "666666" }),
    ],
  })],
});
const page = { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } };
const bullet = (ref, rtl) => ({
  reference: ref,
  levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: rtl ? AlignmentType.RIGHT : AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 500, hanging: 280 } } } }],
});

const doc = new Document({
  creator: "Research team",
  title: "Informed Consent Form: Midwives and heat study",
  styles: { default: { document: { run: { font: FONT, size: 21 } } } },
  numbering: { config: [bullet("bul", false), bullet("bul-rtl", true)] },
  sections: [
    { properties: { page }, footers: { default: footer(false) }, children: english() },
    { properties: { page }, footers: { default: footer(true) }, children: arabic() },
  ],
});

const out = path.join(__dirname, "Informed_Consent_Form_Blank_EN_AR.docx");
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(out, b); console.log("wrote", out); });

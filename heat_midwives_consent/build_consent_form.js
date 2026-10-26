// Builds the blank bilingual (English/Arabic) informed consent form for the
// midwives' heat study (Healthcare, MDPI). Text in [square brackets] is a
// placeholder and is highlighted yellow so it can be checked against the
// IRB-approved version before upload. All wording is limited to what the manuscript reports.
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

// ---------- shared content (all wording limited to what the manuscript reports) ----------
const ethics = {
  en: [
    { header: true, cells: ["Approving committee", "Reference and approval"] },
    { cells: ["Institutional Review Board, Majmaah University", "Protocol code MUREC/COM-4 April 2025/305"] },
    { cells: ["Institutional Review Board, King Abdulaziz Specialist Hospital, Al Jouf Health Cluster", "Committee registration H-13-S-161; approval no. 5670; approved 9 May 2025"] },
    { cells: ["General Directorate of Health Affairs, Hail Health Cluster", "KACST IRB registration H-11-08L-074; IRB log no. 2025-66; approved 1 June 2025"] },
  ],
  ar: [
    { header: true, cells: ["لجنة الموافقة", "المرجع والموافقة"] },
    { cells: ["مجلس المراجعة المؤسسية، جامعة المجمعة", "رمز البروتوكول MUREC/COM-4 April 2025/305"] },
    { cells: ["مجلس المراجعة المؤسسية، مستشفى الملك عبدالعزيز التخصصي، تجمع الجوف الصحي", "تسجيل اللجنة H-13-S-161؛ رقم الموافقة 5670؛ بتاريخ 9 مايو 2025"] },
    { cells: ["المديرية العامة للشؤون الصحية، تجمع حائل الصحي", "تسجيل KACST رقم H-11-08L-074؛ رقم السجل 2025-66؛ بتاريخ 1 يونيو 2025"] },
  ],
};
const EW = [3800, W - 3800];

// ---------- ENGLISH ----------
function english() {
  const out = [];
  const bl = (t) => out.push(p(t, { bullet: true, after: 40 }));
  out.push(title("PARTICIPANT INFORMATION SHEET AND INFORMED CONSENT FORM", false, 28));
  out.push(p("Study title: When Does Heat Matter Beyond the Cooled Ward? Midwives’ Clinical Judgments Across the Maternity Care Pathway in Saudi Arabia: An Interpretive Description", { align: AlignmentType.CENTER, bold: true, size: 22, after: 60 }));
  out.push(p("Language: English (an Arabic version is provided)", { align: AlignmentType.CENTER, italics: true, size: 19, after: 160 }));

  out.push(h("Research team", { rule: true }));
  out.push(table([
    { cells: [["Principal investigator"], ["Athar Odah Alshammari, Department of Maternity and Child Health, Nursing College, University of Hail, Hail, Saudi Arabia", "Email: athar.alshammari@uoh.edu.sa"]] },
    { cells: [["Corresponding researcher"], ["Nada Alqarawi, Department of Community, Psychiatric, and Mental Health Nursing, College of Nursing, Qassim University, Buraydah, Saudi Arabia", "Email: n.alqarawi@qu.edu.sa"]] },
    { cells: [["Co-investigators"], [
      "Afrah Madyan Alshammari (College of Nursing, Jouf University)",
      "Mutairah Alamlah Alshammari (College of Nursing, Jouf University)",
      "Manar Fayez Al-ruwaili (College of Nursing, Jouf University)",
      "Areej Abunar (Faculty of Nursing, King Abdulaziz University)",
      "Osama Mohamed Elsayed Ramadan (Faculty of Nursing, Cairo University)",
      "Heba Tallah Elashmawy Mohamed Shaban (College of Nursing, Majmaah University)"]] },
    { cells: [["Interviewer"], ["A PhD-prepared academic nurse trained in qualitative interviewing. She is outside the participating teams and has no previous personal, supervisory or evaluative relationship with participants."]] },
  ], [2600, W - 2600], false));
  out.push(spacer());
  out.push(h("Ethics approval", { rule: true }));
  out.push(p("This study was approved by the following committees and follows the Declaration of Helsinki. Administrative permission was obtained from the participating services."));
  out.push(table(ethics.en, EW, false));

  out.push(h("PART A: INFORMATION SHEET", { size: 25, rule: true }));
  out.push(p("You are invited to take part in a research study. This information is provided in Arabic and English at least 48 hours before the interview."));

  out.push(h("1. What is the study about?"));
  out.push(p("Heat is associated with adverse pregnancy outcomes, yet how midwives make circumstances outside cooled clinical settings relevant to maternity care is not well understood. This study aims to understand how registered midwives recognize and respond to heat-related context during periods they perceive as unusually hot in inland Saudi Arabia: before a woman arrives, within cooled services, and after she leaves, and how clinical uncertainty, women’s circumstances and service organization shape their responses."));

  out.push(h("2. Who can take part?"));
  out.push(p("Public maternity services in three regions of northern and central Saudi Arabia are taking part. You can take part if you have:"));
  bl("current Saudi Commission for Health Specialties classification and registration in midwifery (Midwife Specialist or Midwife Technician);");
  bl("at least 12 months of direct maternity care in a participating service; and");
  bl("at least one completed hot season in the region.");
  out.push(p("Maternity nurses without this classification, and midwives with line-management responsibility for potential participants, cannot take part.", { before: 60 }));

  out.push(h("3. Is taking part voluntary?"));
  out.push(p("Yes. Participation is voluntary and unrelated to your employment. Managers do not nominate participants and will not learn who took part."));

  out.push(h("4. What will happen if I take part?"));
  bl("You will take part in an individual interview, in Arabic or English.");
  bl("The interview takes place outside clinical duty, at an available appointment you select, in a private room or by encrypted videoconference, with no other person present.");
  bl("You will be asked to talk about a recent encounter or work period: recognition, uncertainty, assessment, advice, documentation, transfer, cooling and workload, including instances where heat was unimportant.");
  bl("You may be invited to one follow-up interview in the same language to clarify or elaborate on your account.");
  bl("You will receive a summary of the developing interpretation and may comment on it.");
  bl("There is no reimbursement for taking part.");

  out.push(h("5. Audio recording, transcription and translation"));
  out.push(p("The interview will be audio-recorded. One team member will transcribe the recording word-for-word in its original language, and another will check it against the audio. Arabic extracts considered for publication will be translated and independently checked by a second bilingual researcher. Field notes may be written after the interview. Transcripts will not be returned to participants."));

  out.push(h("6. How will my information be protected?"));
  bl("You will be identified by a code number (P01, P02, …). Codes carry no regional marker.");
  bl("The file linking codes to regions is restricted.");
  bl("Recordings are stored on an encrypted, access-restricted institutional drive.");
  bl("Identifying service and clinical details are removed or generalized. Facility names are not reported.");
  bl("Participant characteristics are reported only in aggregate.");
  bl("Transcripts are not made publicly available. De-identified excerpts are available from the corresponding author on reasonable request, subject to ethics approval.");

  out.push(h("7. What will happen to the results?"));
  out.push(p("The results will be published. Publications may include de-identified quotations from your interview (translated into English if you were interviewed in Arabic), labelled only by your code number."));

  out.push(h("8. Contacts"));
  out.push(p("Principal investigator: Athar Odah Alshammari, athar.alshammari@uoh.edu.sa"));
  out.push(p("Corresponding researcher: Nada Alqarawi, n.alqarawi@qu.edu.sa"));

  // ---- Part B ----
  out.push(new Paragraph({ children: [new PageBreak()] }));
  out.push(title("PART B: INFORMED CONSENT FORM", false, 26));
  out.push(p("Study title: When Does Heat Matter Beyond the Cooled Ward? Midwives’ Clinical Judgments Across the Maternity Care Pathway in Saudi Arabia", { align: AlignmentType.CENTER, size: 20, after: 60 }));
  out.push(p("Participant code (completed by research team): P____", { align: AlignmentType.CENTER, bold: true, size: 20, after: 120 }));
  out.push(p("Please initial each box to show that you agree.", { bold: true }));
  const stmts = [
    "I have received and read the Participant Information Sheet (Part A) at least 48 hours before the interview.",
    "I confirm that I hold current Saudi Commission for Health Specialties classification and registration in midwifery, have at least 12 months of direct maternity care in a participating service, and have completed at least one hot season in the region.",
    "I understand that my participation is voluntary and unrelated to my employment, and that managers will not learn whether I took part.",
    "I agree to take part in an individual interview for this study.",
    "I agree to the interview being audio-recorded.",
    "I agree to the publication of de-identified quotations from my interview.",
    "I understand that my information will be stored and handled as described in the Participant Information Sheet.",
  ];
  out.push(table([
    { header: true, cells: ["No.", "Statement", "Initials"] },
    ...stmts.map((s, i) => ({ cells: [String(i + 1), s, ""], opts: { size: 20 } })),
  ], [700, W - 700 - 1300, 1300], false));
  out.push(spacer(100));
  out.push(p("Please tick one box for each item.", { bold: true, keepNext: true }));
  out.push(table([
    { header: true, cells: ["No.", "Statement", "Yes", "No"] },
    { cells: ["8", "I agree to be contacted for a possible follow-up interview.", "☐", "☐"] },
  ], [700, W - 700 - 1300, 650, 650], false));
  out.push(spacer(100));
  out.push(table([
    { cells: ["Interview language:", "☐ Arabic      ☐ English"] },
    { cells: ["Interview mode:", "☐ In person (private room)      ☐ Encrypted videoconference"] },
    { cells: ["Contact for follow-up and summary:", "Email or phone: ______________________________"] },
  ], [3600, W - 3600], false));
  out.push(spacer(140));
  out.push(table([
    { header: true, cells: ["", "Name", "Signature", "Date"] },
    { cells: [["Participant", " "], "", "", ""] },
    { cells: [["Researcher obtaining consent", " "], "", "", ""] },
  ], [2600, 2700, 2638, 1700], false));
  return out;
}

// ---------- ARABIC ----------
function arabic() {
  const r = { rtl: true };
  const out = [];
  const bl = (t) => out.push(p(t, { ...r, bullet: true, after: 40 }));
  out.push(title("ورقة معلومات المشاركة ونموذج الموافقة المستنيرة", true, 28));
  out.push(p("عنوان الدراسة: متى تكون للحرارة أهمية خارج الجناح المُكيَّف؟ الأحكام السريرية للقابلات عبر مسار رعاية الأمومة في المملكة العربية السعودية: دراسة وصفية تفسيرية", { ...r, align: AlignmentType.CENTER, bold: true, size: 22, after: 60 }));
  out.push(p("اللغة: العربية (تتوفر نسخة باللغة الإنجليزية)", { ...r, align: AlignmentType.CENTER, italics: true, size: 19, after: 160 }));

  out.push(h("فريق البحث", { ...r, rule: true }));
  out.push(table([
    { cells: [["الباحث الرئيس"], ["Athar Odah Alshammari، قسم الأمومة والطفولة، كلية التمريض، جامعة حائل، حائل، المملكة العربية السعودية", "البريد الإلكتروني: athar.alshammari@uoh.edu.sa"]] },
    { cells: [["الباحثة المراسلة"], ["Nada Alqarawi، قسم تمريض المجتمع والتمريض النفسي والصحة النفسية، كلية التمريض، جامعة القصيم، بريدة، المملكة العربية السعودية", "البريد الإلكتروني: n.alqarawi@qu.edu.sa"]] },
    { cells: [["الباحثون المشاركون"], [
      "Afrah Madyan Alshammari (كلية التمريض، جامعة الجوف)",
      "Mutairah Alamlah Alshammari (كلية التمريض، جامعة الجوف)",
      "Manar Fayez Al-ruwaili (كلية التمريض، جامعة الجوف)",
      "Areej Abunar (كلية التمريض، جامعة الملك عبدالعزيز)",
      "Osama Mohamed Elsayed Ramadan (كلية التمريض، جامعة القاهرة)",
      "Heba Tallah Elashmawy Mohamed Shaban (كلية التمريض، جامعة المجمعة)"]] },
    { cells: [["القائمة بالمقابلة"], ["ممرضة أكاديمية حاصلة على الدكتوراه ومدرَّبة على إجراء المقابلات النوعية، من خارج الفرق المشاركة، وليس لها أي علاقة سابقة شخصية أو إشرافية أو تقييمية بالمشاركات."]] },
  ], [2600, W - 2600], true));
  out.push(spacer());
  out.push(h("الموافقة الأخلاقية", { ...r, rule: true }));
  out.push(p("حصلت هذه الدراسة على موافقة اللجان التالية، وهي تلتزم بإعلان هلسنكي. كما تم الحصول على الإذن الإداري من الخدمات المشاركة.", r));
  out.push(table(ethics.ar, EW, true));

  out.push(h("الجزء (أ): ورقة المعلومات", { ...r, size: 25, rule: true }));
  out.push(p("أنتِ مدعوة للمشاركة في دراسة بحثية. تُقدَّم هذه المعلومات باللغتين العربية والإنجليزية قبل المقابلة بما لا يقل عن 48 ساعة.", r));

  out.push(h("1. عمَّ تتحدث الدراسة؟", r));
  out.push(p("ترتبط الحرارة بنتائج سلبية للحمل، إلا أن كيفية تعامل القابلات مع الظروف خارج البيئات السريرية المكيَّفة وربطها برعاية الأمومة لا تزال غير مفهومة بشكل كافٍ. تهدف هذه الدراسة إلى فهم كيف تتعرف القابلات المسجلات على السياق المرتبط بالحرارة ويستجبن له خلال الفترات التي يرينها حارة بشكل غير معتاد في المناطق الداخلية من المملكة العربية السعودية: قبل وصول المرأة، وداخل الخدمات المكيَّفة، وبعد مغادرتها، وكيف يؤثر عدم اليقين السريري وظروف المرأة وتنظيم الخدمة على هذه الاستجابات.", r));

  out.push(h("2. من يمكنه المشاركة؟", r));
  out.push(p("تشارك في الدراسة خدمات أمومة حكومية في ثلاث مناطق في شمال ووسط المملكة العربية السعودية. يمكنكِ المشاركة إذا كان لديكِ:", r));
  bl("تصنيف وتسجيل ساريان في القبالة من الهيئة السعودية للتخصصات الصحية (أخصائية قبالة أو فنية قبالة)؛");
  bl("خبرة لا تقل عن 12 شهرًا في الرعاية المباشرة للأمومة في خدمة مشاركة؛");
  bl("موسم حار مكتمل واحد على الأقل في المنطقة.");
  out.push(p("لا يمكن مشاركة ممرضات الأمومة غير الحاصلات على هذا التصنيف، ولا القابلات اللواتي لديهن مسؤولية إدارية مباشرة على مشاركات محتملات.", { ...r, before: 60 }));

  out.push(h("3. هل المشاركة تطوعية؟", r));
  out.push(p("نعم. المشاركة تطوعية ولا علاقة لها بوظيفتكِ. لا يرشح المديرون المشاركات ولن يعلموا من شارك.", r));

  out.push(h("4. ماذا سيحدث إذا شاركتُ؟", r));
  bl("ستشاركين في مقابلة فردية باللغة العربية أو الإنجليزية.");
  bl("تُجرى المقابلة خارج أوقات العمل السريري، في موعد متاح تختارينه، في غرفة خاصة أو عبر اتصال مرئي مشفَّر، دون حضور أي شخص آخر.");
  bl("سيُطلب منكِ الحديث عن موقف أو فترة عمل حديثة: التعرف، وعدم اليقين، والتقييم، والنصح، والتوثيق، والنقل، والتبريد، وعبء العمل، بما في ذلك المواقف التي لم تكن فيها الحرارة مهمة.");
  bl("قد تتم دعوتكِ إلى مقابلة متابعة واحدة باللغة نفسها لتوضيح ما ذكرتِه أو التوسع فيه.");
  bl("ستتلقين ملخصًا للتفسير الأولي للنتائج ويمكنكِ إبداء ملاحظاتكِ عليه.");
  bl("لا يوجد أي تعويض مالي مقابل المشاركة.");

  out.push(h("5. التسجيل الصوتي والتفريغ والترجمة", r));
  out.push(p("سيتم تسجيل المقابلة صوتيًا. ستقوم إحدى عضوات الفريق بتفريغ التسجيل حرفيًا بلغته الأصلية، وستقوم أخرى بمراجعته مقابل التسجيل. تُترجم المقتطفات العربية المرشحة للنشر وتراجعها بشكل مستقل باحثة ثانية ثنائية اللغة. قد تُكتب ملاحظات ميدانية بعد المقابلة. لن تُعاد النصوص المكتوبة إلى المشاركات.", r));

  out.push(h("6. كيف ستُحمى معلوماتي؟", r));
  bl("سيُشار إليكِ برمز رقمي (مثل P01) لا يتضمن أي إشارة إلى المنطقة.");
  bl("الملف الذي يربط الرموز بالمناطق مقيد الوصول.");
  bl("تُحفظ التسجيلات على وحدة تخزين مؤسسية مشفَّرة ومقيدة الوصول.");
  bl("تُحذف التفاصيل التعريفية المتعلقة بالخدمة أو الحالات السريرية أو تُعمَّم، ولا تُذكر أسماء المنشآت.");
  bl("تُعرض خصائص المشاركات بصورة إجمالية فقط.");
  bl("لن تُتاح النصوص للعامة. ويمكن الحصول على مقتطفات خالية من المعلومات التعريفية من الباحثة المراسلة عند تقديم طلب معقول وبعد الحصول على موافقة أخلاقية.");

  out.push(h("7. ماذا سيحدث للنتائج؟", r));
  out.push(p("ستُنشر النتائج، وقد تتضمن المنشورات اقتباسات من مقابلتكِ خالية من المعلومات التعريفية (مترجمة إلى الإنجليزية إذا كانت المقابلة بالعربية)، ولا يُشار إليها إلا برمزكِ الرقمي.", r));

  out.push(h("8. للتواصل", r));
  out.push(p("الباحث الرئيس: Athar Odah Alshammari، البريد الإلكتروني: athar.alshammari@uoh.edu.sa", r));
  out.push(p("الباحثة المراسلة: Nada Alqarawi، البريد الإلكتروني: n.alqarawi@qu.edu.sa", r));

  out.push(new Paragraph({ bidirectional: true, children: [new PageBreak()] }));
  out.push(title("الجزء (ب): نموذج الموافقة المستنيرة", true, 26));
  out.push(p("عنوان الدراسة: متى تكون للحرارة أهمية خارج الجناح المُكيَّف؟ الأحكام السريرية للقابلات عبر مسار رعاية الأمومة في المملكة العربية السعودية", { ...r, align: AlignmentType.CENTER, size: 20, after: 60 }));
  out.push(p("رمز المشاركة (يعبئه فريق البحث): P____", { ...r, align: AlignmentType.CENTER, bold: true, size: 20, after: 120 }));
  out.push(p("يُرجى كتابة الأحرف الأولى من اسمكِ في كل خانة للدلالة على موافقتكِ.", { ...r, bold: true }));
  const stmts = [
    "استلمتُ ورقة معلومات المشاركة (الجزء أ) وقرأتُها قبل المقابلة بما لا يقل عن 48 ساعة.",
    "أؤكد أن لديّ تصنيفًا وتسجيلًا ساريين في القبالة من الهيئة السعودية للتخصصات الصحية، وخبرة لا تقل عن 12 شهرًا في الرعاية المباشرة للأمومة في خدمة مشاركة، وأنني أكملتُ موسمًا حارًا واحدًا على الأقل في المنطقة.",
    "أفهم أن مشاركتي تطوعية ولا علاقة لها بوظيفتي، وأن المديرين لن يعلموا بمشاركتي من عدمها.",
    "أوافق على المشاركة في مقابلة فردية لهذه الدراسة.",
    "أوافق على تسجيل المقابلة صوتيًا.",
    "أوافق على نشر اقتباسات من مقابلتي خالية من المعلومات التعريفية.",
    "أفهم أن معلوماتي ستُحفظ وتُعالج كما هو موضح في ورقة معلومات المشاركة.",
  ];
  out.push(table([
    { header: true, cells: ["الرقم", "البند", "الأحرف الأولى"] },
    ...stmts.map((s, i) => ({ cells: [String(i + 1), s, ""] })),
  ], [700, W - 700 - 1300, 1300], true));
  out.push(spacer(100));
  out.push(p("يُرجى وضع علامة في خانة واحدة.", { ...r, bold: true, keepNext: true }));
  out.push(table([
    { header: true, cells: ["الرقم", "البند", "نعم", "لا"] },
    { cells: ["8", "أوافق على التواصل معي بشأن مقابلة متابعة محتملة.", "☐", "☐"] },
  ], [700, W - 700 - 1300, 650, 650], true));
  out.push(spacer(100));
  out.push(table([
    { cells: ["لغة المقابلة:", "☐ العربية      ☐ الإنجليزية"] },
    { cells: ["طريقة المقابلة:", "☐ حضوريًا (غرفة خاصة)      ☐ اتصال مرئي مشفَّر"] },
    { cells: ["وسيلة التواصل للمتابعة والملخص:", "البريد الإلكتروني أو الهاتف: ______________________________"] },
  ], [3600, W - 3600], true));
  out.push(spacer(140));
  out.push(table([
    { header: true, cells: ["", "الاسم", "التوقيع", "التاريخ"] },
    { cells: [["المشاركة", " "], "", "", ""] },
    { cells: [["الباحثة التي حصلت على الموافقة", " "], "", "", ""] },
  ], [2600, 2700, 2638, 1700], true));
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

// Text of the two emails to the co-editors of Nursing in Critical Care.
// Email 2 takes its title and word counts from response_text.js so they always match the response file.

const R = require('./response_text.js');

const strip = s => s.replace(/\{[0-9,]+\}/g, '').replace(/\[\[\/?HL\]\]/g, '');
const wc = s => strip(s).split(/\s+/).filter(Boolean).length;
const mainWords = R.BODY.reduce((a, [h, ps]) => a + wc(h) + ps.reduce((b, p) => b + wc(p), 0), 0);
const titleWords = wc(R.TITLE);
const fmt = n => n.toLocaleString('en-GB');

const ARTICLE = '“Trusting the Algorithm or Trusting the Nurse? Critical Care Nurses’ Experiences of Automation Bias and Professional Autonomy in AI-Assisted Early Warning” (Nursing in Critical Care, 2026;31(5):e70620; doi:10.1111/nicc.70620)';
const COMMENTARY = '“Calibrated to what? Feedback asymmetry and the limits of experiential trust in AI-assisted early warning”';

const SIGNATURE = [
  'Osama Mohamed Elsayed Ramadan',
  'Corresponding author, on behalf of Reda Samy and Ghada Elsaid Ali Elsayed',
  'Department of Maternal and Child Health Nursing, College of Nursing, Jouf University, Sakaka, Saudi Arabia',
  'omramadan@ju.edu.sa',
];

module.exports = {
  EMAIL1: {
    label: 'EMAIL 1 – CONFIRMING OUR INTENTION TO RESPOND',
    when: 'Send now: the co-editors asked for a reply by the end of next week. Reply to their email so that everyone in copy stays included.',
    subject: 'Re: Possibility of Submitting a Response to a Commentary about your Manuscript in Nursing in Critical Care',
    headers: [
      ['To', 'Josef Trapani; Peter Nydahl'],
      ['Cc', '[[HL]][everyone copied on the co-editors’ email – use “Reply all”][[/HL]]'],
      ['Subject', 'Re: Possibility of Submitting a Response to a Commentary about your Manuscript in Nursing in Critical Care'],
    ],
    body: [
      'Dear Dr Trapani and Dr Nydahl,',
      `Thank you for your email and for sharing the commentary on our article ${ARTICLE}.`,
      'I have discussed the commentary with my co-authors, Reda Samy and Ghada Elsaid Ali Elsayed, and we are pleased to confirm that we intend to submit a response. We are grateful to the commentators for their careful engagement with our work and welcome the opportunity for a constructive scholarly exchange.',
      'We will send our response, within the 1,500-word limit, as an email attachment to all in copy no later than 25 October 2026.',
      'Thank you again for this opportunity.',
      'With best wishes,',
    ],
    signature: SIGNATURE,
    notes: [
      'Send only after both co-authors have confirmed that they agree to respond; the email states that you have discussed it with them.',
      'Use “Reply all” to the co-editors’ email so that every person in copy receives it.',
    ],
  },

  EMAIL2: {
    label: 'EMAIL 2 – SUBMITTING THE RESPONSE',
    when: 'Send no later than 25 October 2026, to everyone in copy on the co-editors’ email, with 01_Response_to_Commentary_NICC.docx attached.',
    subject: 'Response to commentary on Samy et al., Nursing in Critical Care 2026;31(5):e70620',
    headers: [
      ['To', 'Josef Trapani; Peter Nydahl'],
      ['Cc', '[[HL]][everyone copied on the co-editors’ email][[/HL]]'],
      ['Subject', 'Response to commentary on Samy et al., Nursing in Critical Care 2026;31(5):e70620'],
      ['Attachment', '01_Response_to_Commentary_NICC.docx'],
    ],
    body: [
      'Dear Dr Trapani and Dr Nydahl,',
      `As agreed, please find attached our response to the commentary ${COMMENTARY}, which discusses our article ${ARTICLE}.`,
      `Our response is entitled “${strip(R.TITLE)}”. Its main text runs to ${fmt(mainWords)} words, including headings and excluding the title (${titleWords} words), end statements and references, within the 1,500-word limit. All three authors have read and approved it.`,
      'We are grateful to the commentators for their thoughtful critique. In our response we:',
      [
        'clarify what our interpretive study claimed about nurses’ trust, stating precisely that participants described adjusting their trust through experience, while the accuracy of those adjustments was not evaluated;',
        'engage with the feedback asymmetry they describe and show how it connects with our findings on nursing surveillance and silent override; and',
        'set out where our recommendations converge with theirs, including symmetric, log-based capture of alert outputs, responses and outcomes, nurse-facing performance reports that include missed events, and the evaluation designs needed to test whether nurses’ trust tracks the system’s reliability.',
      ],
      'Our response refers to the commentary in its text. Should the journal’s style require a formal citation of the commentary, we would be grateful if the Editorial Office could add it.',
      'We would be happy to make any editorial changes you require.',
      'With best wishes,',
    ],
    signature: SIGNATURE,
    notes: [
      'Attach the final 01_Response_to_Commentary_NICC.docx and confirm that both co-authors have approved that exact version.',
      'Confirm the Funding statement (“This response received no specific funding”) with your co-authors before sending.',
      'Word counts in this email are generated from the response file and match it.',
    ],
  },
};

// Confidential briefing for the three authors. Not for the co-editors.

const W3 = [2500, 4000, 2526];          // point-by-point table (sums to 9026 DXA content width)
const W4 = [450, 3900, 1250, 3426];     // reference verification table
const W4b = [1500, 2700, 2200, 2626];   // risk table

module.exports = {
  TITLE: 'Author briefing: our response to ‘Calibrated to what?’',

  SECTIONS: [
    {
      heading: '1. What this is, and why we respond',
      bullets: [
        'The commentary is an ordinary scholarly critique, not a complaint, a correction request or a misconduct concern. The co-editors are offering us the right of reply (maximum 1,500 words, due 25 October 2026).',
        'The commentary is complimentary in places: it says the study offers “rare access” to how nurses use AI-EWS, that silent override “deserves the governance attention the authors call for”, and that our override field is “valuable”.',
        'Its concern, in its own words, is “one inferential step: from nurses’ accounts of trust to the claim that this trust is calibrated”. It also offers a “complementary reading” of the experience trajectory and disputes our claim to “complicate prevailing accounts”.',
        'Replying is optional, but a calm, rigorous reply strengthens the paper; silence can read as agreement.',
      ],
    },
    {
      heading: '2. Strategy of the final response',
      paras: [
        'Concede precisely, defend firmly. Where our published wording went further than our data (“actively calibrated”, “correctly dismissing”, “greater tendency towards early overreliance”, “complicate prevailing accounts”), the response says so plainly and explains what was meant. Editors and readers trust authors who concede exactly what is true; it also removes every easy rejoinder. Everything else is defended with the commentators’ own sources (Lee & See; Parasuraman & Manzey; Kahneman & Klein; Dietvorst) and with verbatim evidence from our article.',
        'The title changed from “Calibrated to the patient” to “Two references for trust in AI-assisted early warning”. The old title re-asserted the disputed word “calibrated” and treated the nurse’s own assessment as the yardstick, which the commentators had already argued is anchored by the alert. The new title states our real contribution: the patient is the reference for each bedside decision; local performance data are the reference for whether trust tracks the system.',
      ],
    },
    {
      heading: '3. Point-by-point map: commentary → our response',
      table: {
        widths: W3,
        header: ['Commentary point', 'Our response', 'Grounding'],
        rows: [
          ['Interviews cannot observe automation-bias errors (a behavioural construct).', 'Agreed. Automation bias was a sensitising concept (Blumer). Participants described the tendency and its resistance, which is what “experiences of automation bias” means; we claimed to detect no errors.', 'Article 4.2 (“sensitised the study”); 5.1.1.1; 5.1.4.1; Parasuraman & Manzey'],
          ['From accounts of trust to “calibrated” trust.', 'Agreed that calibration (Lee & See) needs a reference. Conceded that “actively calibrated” can be read as an outcome; our data describe “calibrating” (work). Limitations already placed ‘calibrated trust’ in quotation marks. Also pre-empts “correctly dismissing” and “greater tendency towards early overreliance”.', 'Abstract; Table 2 (2.1); 6.1; 6.2; 6.3; Kahneman & Klein'],
          ['Nisbett & Wilson: limited introspective access.', 'Accepted for participants’ explanations of why they trusted. Our claims rest on episodes and practices no audit log records (P19, P06, P05).', 'Findings 5.1.2.2, 5.1.3.2, 5.1.4.2'],
          ['Theory is already dynamic; “complicate” overstates.', 'Accepted. Our contribution is the nursing content of the organisational and cultural context in Lee & See’s model.', '6.1; Themes 3–4'],
          ['Feedback asymmetry; “complementary reading” of the trajectory.', 'Accepted as complementary; admitted the gap. Both readings interpret the same accounts and both are testable. Our data include miss-type experiences, but only misses nurses caught. Surveillance must be protected, yet is not enough alone; pooled, nurse-facing performance reports are needed.', '5.1.1.2; 5.1.1.3; 6.1; Table 1 (7–26 months)'],
          ['Algorithm aversion (Dietvorst) may shape differentiated trust.', 'Aversion was shown where people could choose; our participants had little discretion (P17). Logs would record P17 as acceptance; the account shows acceptance without trust. Silent override is the organisational form of feedback asymmetry (P16).', '5.1.1.2; 5.1.2.3; Dietvorst et al.'],
          ['Calibration requires a reference; anchoring; concordant error.', 'Accepted, with a structural reason (model and nurse use the same documented observations) and supporting evidence (Schwartz et al.). Two references: the patient (each decision) and local performance data (trust over time).', '4.3; Tanner; Schwartz et al.'],
          ['No local performance estimates; Wong et al. sepsis model.', 'Conceded plainly. As they note, Wong et al. concerned another model; its lesson transfers: measure locally, tell nurses.', '4.3; Wong et al.'],
          ['Symmetric capture; override-only field makes acceptance the default.', 'Accepted as a refinement; logs still need interpretive categories (our single-click acknowledgement). Practical first step: review deteriorations with no preceding alert.', '6.3'],
          ['Behavioural designs with and without the system.', 'Accepted as going further than our proposal; feasible via simulation and vignette designs; our findings specify what to test, including a stratified test of the two readings.', '6.4'],
        ],
      },
    },
    {
      heading: '4. Reference verification',
      paras: [
        'Direct access to Crossref, doi.org, PubMed, JSTOR and Wiley was blocked in our working environment, so each reference was verified independently by two rounds of checks using web search records and the Consensus academic index (which reports DOIs), cross-checked against publisher and PubMed records shown in search results. Two independent reviewers then checked that each source supports the exact sentence citing it.',
      ],
      table: {
        widths: W4,
        header: ['#', 'Reference (as in the response)', 'Status', 'Verification notes'],
        rows: [], // filled in by build after verification (see VERIFICATION_ROWS below)
      },
    },
    {
      heading: '5. Items to confirm before sending',
      bullets: [
        'Both co-authors approve the final response, and agree to Email 1 being sent now.',
        'Funding statement: “This response received no specific funding.” Confirm this is correct (the original study was funded by Najran University, grant NU/CPL/MRC/14/4617-1).',
        'Reference 1 and the “Response to” line are highlighted placeholders for the Editorial Office; do not guess the commentators’ names.',
        'Optional: if a co-author has library access, open Blumer (1954, p. 7) and Tanner (2006) once to see the quoted words in the originals; both were confirmed through multiple consistent secondary records.',
        'Before proofs, re-check our quotations of the commentary against its final published version, in case the commentators revise it.',
      ],
    },
    {
      heading: '6. Private risk note: citation issues in our published article',
      paras: [
        'The commentators did not raise any of these, and the response does not mention them. A close reader comparing the two papers could notice them, so all authors should know. Whether to ask Wiley for a correction is the authors’ decision. The response itself cites Thorne, Tanner, Lee & See and Parasuraman & Manzey correctly, which quietly strengthens our theoretical footing.',
      ],
      table: {
        widths: W4b,
        header: ['Location in article', 'Claim', 'Reference cited', 'Problem'],
        rows: [
          ['Background, p. 2', 'Clinical judgement “following Tanner”', '[22–24] Zocco & Ferro; Li et al.; O’Connor et al.', 'None is Tanner; Tanner (2006) is absent from the reference list.'],
          ['Methods 4.2, p. 3', 'Automation bias theory (omission and commission tendencies)', '[36] Allen et al., Lancet Primary Care', 'Not an originating automation-bias source; Parasuraman & Manzey, Skitka et al. and Lee & See are cited nowhere.'],
          ['Background, p. 2; Discussion, p. 10', 'Nurses’ involvement in ML decision support; probabilistic outputs of decision support', '[20] Mrayyan et al. (concept analysis of autonomy)', 'Does not match either claim.'],
          ['Introduction, p. 2', 'AI deterioration models improve outcomes', '[3] Mousavi Shabestari et al. (uncertainty in decision-making)', 'Does not match the claim.'],
          ['Discussion, p. 10', '“human factors literature … asymmetric accountability”', '[55, 56] two nursing-autonomy studies', 'Neither is human-factors literature.'],
          ['Methods 4.1, p. 3', 'ID “as articulated by Thorne”', '[30] Wilson 2025', 'Thorne’s own text not cited (minor).'],
          ['Discussion, p. 11', '“In critical care, where surveillance is central … profoundly professional in its effects.”', '—', 'Sentence appears twice in consecutive paragraphs.'],
        ],
      },
    },
    {
      heading: '7. Timeline',
      bullets: [
        'Now: send Email 1 (02_Email_1_Confirm_Intention.docx) by “Reply all”.',
        'Within the week: co-authors review 01_Response_to_Commentary_NICC.docx and confirm approval and the Funding statement.',
        'By 25 October 2026: send Email 2 (03_Email_2_Submission_Cover.docx) to all in copy, with the response attached.',
      ],
    },
  ],
};

// Confidential briefing for the three authors. Not for the co-editors.

const W3 = [2500, 4000, 2526];          // point-by-point table (sums to 9026 DXA content width)
const W4 = [450, 2900, 1150, 4526];     // reference verification table
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
        '**Concede precisely, defend firmly.** Where our published wording went further than interview data allow (“actively calibrated”, “correctly dismissing”, “complicate prevailing accounts”), the response says so plainly and explains what the data do show. Editors and readers trust authors who concede exactly what is true, and doing so removes every easy rejoinder. Everything else is defended with the commentators’ own sources (Lee & See; Parasuraman & Manzey; Kahneman & Klein; Dietvorst) and with verbatim evidence from our article.',
        '**Title.** “Two reference points for trust in AI-assisted early warning” states our contribution: the patient is the reference point for each bedside decision; local performance data are the reference point for whether learned trust tracks the system. An earlier title, “Calibrated to the patient”, was dropped because it re-asserted the disputed word and treated the nurse’s own assessment as the yardstick, which the commentators had already shown is anchored by the alert.',
        '**Firm points the commentators cannot easily answer:** their alternative reading interprets the same interview accounts as ours, so neither can be settled by interviews; algorithm aversion was shown where people could freely choose, whereas our participants’ discretion was constrained; an audit log would record P17’s escalation as acceptance, but the account shows compliance without trust; nurse and model share the same documented observations, so they are not fully independent; and the response proposes a concrete study that would decide between the two readings.',
      ],
    },
    {
      heading: '3. How the response was checked',
      bullets: [
        'Two rounds of independent review: reference verifiers, a fidelity checker (every statement about our article and the commentary), and adversarial reviewers writing as the commentators and as the co-editors. All issues raised in both rounds were resolved; the final round’s verdict was “ready after minor fixes”, and those fixes are applied.',
        'All 36 quotations were checked by script, character for character: 32 against our published article or the commentary, and 4 against the external sources (Blumer, Kahneman & Klein, Tanner), confirmed through primary abstracts or multiple consistent reproductions.',
        'No new data, participant quotations or claims beyond the published article were introduced. Participant codes are used only for things those participants said.',
        'Word count: 1,471 words of main text including headings (1,486 including the title), within the 1,500-word limit however it is counted.',
      ],
    },
    {
      heading: '4. Point-by-point map: commentary → our response',
      table: {
        widths: W3,
        header: ['Commentary point', 'Our response', 'Grounding'],
        rows: [
          ['Interviews cannot observe automation-bias errors (a behavioural construct).', 'Agreed: no interview can capture an unrecognised error, and we claimed to detect none. Automation bias was a sensitising concept (Blumer). Participants described the pull towards the aid; such reliance becomes bias only when the aid errs.', 'Article 4.2 (“sensitised the study”); 5.1.1.1; 5.1.4.1; Parasuraman & Manzey'],
          ['From accounts of trust to “calibrated” trust.', 'Agreed that calibration (Lee & See) needs a reference. Conceded that “actively calibrated” can be read as an outcome; our data describe “calibrating” (work). Limitations already placed ‘calibrated trust’ in quotation marks. “Correctly dismissing” conceded as going beyond the data.', 'Abstract; Table 2 (2.1); 6.1; 6.2; 6.3; Kahneman & Klein'],
          ['Specificity and differentiated trust.', 'Differentiation is not calibration: trust can be differentiated wrongly. Self-report reaches trust as an attitude; appropriateness needs behavioural and reference data.', 'Lee & See; Kohn et al.; P14'],
          ['Nisbett & Wilson: limited introspective access.', 'Accepted for participants’ explanations of why they trusted. Our other claims rest on episodes and reported practices and meanings no audit log records (P19, P06, P05).', 'Findings 5.1.2.2, 5.1.3.2, 5.1.4.2'],
          ['Theory is already dynamic; “complicate” overstates.', 'Accepted. Our contribution is the nursing content of the organisational and cultural context in Lee & See’s model.', '6.1; Themes 3–4'],
          ['Feedback asymmetry; “complementary reading” of the trajectory.', 'Accepted as complementary; the gap admitted. Both readings interpret the same accounts and both are testable. Our data include misses, but only those nurses caught. Surveillance must be protected yet is not enough; pooled experience shares the asymmetry, so nurse-facing performance reports are needed.', '5.1.1.2; 5.1.1.3; 6.1; Table 1 (7–26 months)'],
          ['Algorithm aversion (Dietvorst).', 'Aversion was shown where people could freely choose; our participants’ discretion was constrained, though not absent. P17: compliance without trust, which a log would misread as acceptance. Silent override adds an organisational layer to the asymmetry (P16).', '5.1.1.2; 5.1.2.2; 5.1.2.3; Dietvorst et al.'],
          ['Calibration requires a reference; anchoring; concordant error.', 'Accepted, with a structural reason (model and nurse use the same documented observations) and evidence (Schwartz et al.). Two reference points: the patient (each decision) and local performance data that include misses and do not count averted deteriorations as false alarms.', '4.3; P03; Tanner; Schwartz et al.'],
          ['No local performance estimates; Wong et al.', 'Conceded plainly. As they note, Wong et al. concerned another, sepsis-specific model; its lesson transfers: measure locally, tell nurses.', '4.3; Wong et al.'],
          ['Symmetric capture; override-only field makes acceptance the default.', 'Accepted as a complement to our override field; logs still need interpretive categories, so our single-click acknowledgement should extend to every alert. First step: check each deterioration against alert logs.', '6.3'],
          ['Behavioural designs with and without the system.', 'Accepted as going further than our proposal; feasible via simulation and vignettes. Proposed a decisive test: compare trust across patient groups with false-alarm rates and with misses nurses did and did not catch.', '6.4; P05'],
        ],
      },
    },
    {
      heading: '5. Reference verification',
      paras: [
        'Direct access to Crossref, doi.org, PubMed, JSTOR and Wiley was blocked in our working environment, so every reference was verified in two independent rounds using web-search records of the publisher and PubMed pages and the Consensus academic index, which reports DOIs and abstracts. Reviewers also checked that each source supports the exact sentence citing it. All 13 references are correct; reference 1 is a deliberate placeholder.',
      ],
      table: {
        widths: W4,
        header: ['#', 'Reference', 'Status', 'Verification notes'],
        rows: [
          ['1', 'Commentary: “Calibrated to what? …” Nurs Crit Care. In press.', 'Placeholder', 'Title matches the commentary word for word. Authors and DOI are unknown to us; highlighted for the Editorial Office to insert. “In press” follows AMA style for accepted, unpublished articles.'],
          ['2', 'Samy R, Ramadan OME, Elsayed GEA. Nurs Crit Care 2026;31(5):e70620', 'Verified', 'PubMed PMID 42598921 and PMC13474463: 2026 Sep;31(5):e70620; doi:10.1111/nicc.70620. Issue number (5) added; the first draft omitted it.'],
          ['3', 'Thorne S. Interpretive Description. 2nd ed. Routledge; 2016', 'Verified', 'WorldCat OCLC 928613451: second edition, Routledge, New York, 2016. A third edition (2025) exists; citing the second remains correct.'],
          ['4', 'Blumer H. Am Sociol Rev 1954;19(1):3-10', 'Verified', 'Both quoted phrases are on p. 7 (“Whereas definitive concepts provide prescriptions of what to see, sensitizing concepts merely suggest directions along which to look”). DOI omitted: the JSTOR DOI could not be confirmed, which is acceptable for a 1954 article.'],
          ['5', 'Parasuraman R, Manzey DH. Hum Factors 2010;52(3):381-410', 'Verified', 'Abstract: “Automation bias results in making both omission and commission errors when decision aids are imperfect”; complacency and bias “result from the dynamic interaction” of personal, situational and automation-related characteristics.'],
          ['6', 'Lee JD, See KA. Hum Factors 2004;46(1):50-80', 'Verified', 'Calibration as correspondence between trust and the automation’s capabilities; trust defined as “the attitude that…” (p. 54); abstract covers the dynamics of trust, the role of context and organisational perspectives.'],
          ['7', 'Kahneman D, Klein G. Am Psychol 2009;64(6):515-526', 'Verified', 'PMID 19739881. The quotation is the final sentence of the abstract, quoted verbatim with US spelling inside the quotation marks.'],
          ['8', 'Kohn SC, et al. Front Psychol 2021;12:604977', 'Verified', 'All five authors, volume, article number and DOI confirmed. Classifies trust measures as self-report, behavioural and physiological, and the constructs they capture, including trust attitudes.'],
          ['9', 'Nisbett RE, Wilson TD. Psychol Rev 1977;84(3):231-259', 'Verified', 'Abstract limits the critique to introspective access to “higher order cognitive processes”.'],
          ['10', 'Dietvorst BJ, Simmons JP, Massey C. J Exp Psychol Gen 2015;144(1):114-126', 'Verified', 'PMID 25401381. Participants chose whether to tie their incentives to an algorithm’s or a human’s forecasts after seeing them perform.'],
          ['11', 'Tanner CA. J Nurs Educ 2006;45(6):204-211', 'Verified', 'PMID 16780008. Quotation is from conclusion 2 of the abstract (“Sound clinical judgment rests to some degree on knowing the patient…”).'],
          ['12', 'Schwartz JM, George M, Rossetti SC, et al. JMIR Hum Factors 2022;9(2):e33960', 'Verified', 'PMID 35550304; PMC9136656; 7 authors (AMA: first 3 + et al.). Interviews with 17 clinicians: “The concordance between clinicians’ impressions of patients’ clinical status and system predictions influenced clinicians’ perceptions of system accuracy.”'],
          ['13', 'Wong A, Otles E, Donnelly JP, et al. JAMA Intern Med 2021;181(8):1065-1070', 'Verified', 'Externally validated the Epic Sepsis Model (AUC 0.63; missed 67% of sepsis cases). A published correction (Table 2; number needed to evaluate) does not affect our use.'],
        ],
      },
    },
    {
      heading: '6. Items to confirm before sending',
      bullets: [
        'Both co-authors approve the final response, and agree to Email 1 being sent now.',
        'Funding statement: “This response received no specific funding.” Confirm this is correct (the original study was funded by Najran University, grant NU/CPL/MRC/14/4617-1).',
        'Reference 1 and the “Response to” line are highlighted placeholders for the Editorial Office; do not guess the commentators’ names.',
        'Optional: if a co-author has library access, glance at Blumer (1954, p. 7) and Tanner (2006) in the originals; both quotations were confirmed through primary abstracts or multiple consistent reproductions.',
        'Before proofs, re-check our quotations of the commentary against its final published version, in case the commentators revise it.',
      ],
    },
    {
      heading: '7. Private risk note: citation issues in our published article',
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
      heading: '8. Timeline',
      bullets: [
        'Now: send Email 1 (02_Email_1_Confirm_Intention.docx) using “Reply all”.',
        'Within the week: co-authors review 01_Response_to_Commentary_NICC.docx and confirm approval and the Funding statement.',
        'By 25 October 2026: send Email 2 (03_Email_2_Submission_Cover.docx) to all in copy, with the response attached.',
      ],
    },
  ],
};

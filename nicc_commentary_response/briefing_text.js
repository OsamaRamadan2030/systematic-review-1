// Confidential briefing for the three authors. Not for the co-editors.
// Word counts are computed from response_text.js so they always match the response file.

const R = require('./response_text.js');

const strip = s => s.replace(/\{[0-9,]+\}/g, '').replace(/\[\[\/?HL\]\]/g, '');
const wc = s => strip(s).split(/\s+/).filter(Boolean).length;
const MAIN = R.BODY.reduce((a, [h, ps]) => a + wc(h) + ps.reduce((b, p) => b + wc(p), 0), 0);
const TITLE_WORDS = wc(R.TITLE);
const fmt = n => n.toLocaleString('en-GB');

const W2 = [3200, 5826];                // comparison table
const W3 = [2500, 4000, 2526];          // point-by-point table (sums to 9026 DXA content width)
const W4 = [450, 2900, 1150, 4526];     // reference verification table
const W4b = [1500, 2700, 2200, 2626];   // risk table

module.exports = {
  TITLE: 'Author briefing: our response to the commentary on our NICC article',

  SECTIONS: [
    {
      heading: '1. What this is, and why we respond',
      bullets: [
        'The commentary (“Calibrated to what? Feedback asymmetry and the limits of experiential trust in AI-assisted early warning”) is an ordinary scholarly critique, not a complaint, a correction request or a misconduct concern. The co-editors are offering us the right of reply (maximum 1,500 words, due 25 October 2026).',
        'The commentary is complimentary in places: it says the study offers “rare access” to how nurses use AI-EWS, that silent override “deserves the governance attention the authors call for”, and that our override field is “valuable”.',
        'Its concern, in its own words, is “one inferential step: from nurses’ accounts of trust to the claim that this trust is calibrated”. It also offers a “complementary reading” of the experience trajectory and disputes our claim to “complicate prevailing accounts”.',
        'Replying is optional, but a calm, rigorous reply strengthens the paper; silence can read as agreement.',
      ],
    },
    {
      heading: '2. Strategy of the final response',
      paras: [
        '**Concede precisely, defend firmly.** Where our published wording went further than interview data allow (“actively calibrated”, “correctly dismissing”, “complicate prevailing accounts”), the response says so plainly and states the precise claim: participants described adjusting their trust through experience; the accuracy of those adjustments was not evaluated. Everything else is defended with the commentators’ own sources (Lee & See; Parasuraman & Manzey; Nisbett & Wilson; Dietvorst; Jabbour) and with verbatim evidence from our article.',
        `**Title.** “${strip(R.TITLE)}” distinguishes trust (an attitude) from reliance (a behaviour) and separates two evidential tasks: bedside judgement guides each clinical response, whereas independent, outcome-linked evaluation establishes whether trust and reliance correspond to the system’s performance. It does not name the commentary.`,
        '**Firm points the commentators cannot easily answer:** their alternative reading is, as they frame it, a hypothesis that interprets the same accounts as ours; feedback about correctness is incomplete in both directions; algorithm aversion was shown where people could freely choose, whereas our participants’ discretion was constrained; a log may show P17’s escalation without revealing whether it reflected trust, uncertainty or institutional pressure, while the account suggests compliance without trust; nurse and model share the same documented observations, so they are not fully independent; and the response proposes a concrete study that would decide between the two readings.',
        '**The commentary is not listed in the references,** at your request. The response refers to “the commentators” in its text, which is usual when a response is published alongside the commentary. The covering email invites the Editorial Office to add a formal citation if house style requires it.',
      ],
    },
    {
      heading: '3. What we took from the alternative draft',
      paras: ['The alternative draft you supplied was calm and precise but conceded almost every point and used little evidence from our data. The final response keeps our firm, evidence-based defence and adds the alternative’s best elements:'],
      table: {
        widths: W2,
        header: ['Element adopted from the alternative draft', 'Where it appears in the final response'],
        rows: [
          ['Balanced thesis: reported adjustment of trust does not establish accurate calibration, but understanding how nurses interpret alerts is a distinct contribution', 'Section 1, Introduction'],
          ['Precise reformulation: participants described adjusting their trust; accuracy was not evaluated. “Correctly dismissing” read as dismissing an alert the nurse judged unhelpful', 'Section 2, second paragraph'],
          ['Their reading, as they frame it, is a hypothesis; interviews cannot show how far each reading explains the trajectory', 'Section 3, first paragraph'],
          ['Feedback is incomplete in both directions (averted deterioration; recognised deterioration reveals a missing warning)', 'Section 3, second paragraph'],
          ['A nurse and a model can agree and both be wrong; an anchored assessment cannot be an independent standard', 'Section 4, first paragraph'],
          ['Evaluation specifics: outcomes, prediction horizons, thresholds, effects of intervention, periods without alerts, independently ascertained deterioration', 'Sections 4 and 5'],
          ['Override field was a governance recommendation, not a tested intervention; accountability should follow clinical reasoning, not conformity', 'Section 5, first paragraph'],
          ['Jabbour et al.: explanations did not mitigate biased predictions; relevance to nursing surveillance untested', 'Section 5, second paragraph'],
          ['Distinguish confidence, reported trust and observed reliance', 'Section 5, second paragraph'],
          ['P14’s “when it would miss” is perceived, not verified, knowledge: nurses can learn only the misses they catch', 'Section 3, second paragraph'],
          ['Judge decisions on the information available at the time, not on outcomes (hindsight)', 'Section 5, first paragraph'],
        ],
      },
    },
    {
      heading: '4. How the response was checked',
      bullets: [
        'Three rounds of independent review: reference verifiers, fidelity checkers (every statement about our article and the commentary), and adversarial reviewers writing as the commentators and as the co-editors, plus a comparison with the alternative draft.',
        'All 32 quotations were checked by script, character for character: 22 against our published article, 7 against the commentary, and 3 against external sources (Blumer, Tanner).',
        'No new data, participant quotations or claims beyond the published article were introduced. Participant codes are used only for things those participants said.',
        `Word count: ${fmt(MAIN)} words of main text including headings (${fmt(MAIN + TITLE_WORDS)} including the ${TITLE_WORDS}-word title), within the 1,500-word limit however it is counted.`,
      ],
    },
    {
      heading: '5. Point-by-point map: commentary → our response',
      table: {
        widths: W3,
        header: ['Commentary point', 'Our response', 'Grounding'],
        rows: [
          ['Interviews cannot observe automation-bias errors (a behavioural construct).', 'Agreed: no interview can capture an unrecognised error, and we claimed to detect none. Automation bias was a sensitising concept (Blumer). Participants described the pull towards the aid; such reliance becomes bias only when the aid errs.', 'Article 4.2; 5.1.1.1; 5.1.4.1; Parasuraman & Manzey'],
          ['From accounts of trust to “calibrated” trust.', 'Agreed that calibration needs a reference. “Actively calibrated” suggests more than the design supports: participants described adjusting trust; accuracy was not evaluated. Limitations already drew this line.', 'Abstract; 6.1; 6.2; 6.3'],
          ['Specificity and differentiated trust.', 'Differentiation is not calibration. Self-report reaches trust as an attitude; appropriateness needs behavioural and reference data.', 'Lee & See; Kohn et al.; P14'],
          ['Nisbett & Wilson.', 'Accepted for explanations of why participants trusted. Our other claims rest on episodes and reported practices and meanings no audit log records.', 'P19, P06, P05'],
          ['Theory is already dynamic.', 'Accepted; “complicate” overstated. Our contribution is nursing content for Lee & See’s organisational and cultural context.', '6.1; Themes 3–4'],
          ['Feedback asymmetry; “complementary reading”.', 'Accepted as complementary; gap admitted. Their reading is, as they frame it, a hypothesis. Feedback is incomplete both ways; our data show perceived discordance, not verified misses; surveillance must be protected but is not enough; nurse-facing performance reports needed.', '5.1.1.2; 5.1.1.3; 6.1; 7–26 months'],
          ['Algorithm aversion (Dietvorst).', 'Shown where people could freely choose; our participants’ discretion was constrained. P17: compliance without trust. Silent override adds an organisational layer (P16).', '5.1.1.2; 5.1.2.3; Dietvorst et al.'],
          ['Calibration requires a reference; anchoring; concordant error.', 'Accepted, with a structural reason (shared documented observations) and evidence (Schwartz et al.). Bedside judgement guides the response; only independent, outcome-linked evaluation can establish calibration.', '4.3; P03; Tanner; Schwartz et al.'],
          ['No local performance estimates; Wong et al.', 'Conceded. As they note, Wong concerned another model; its lesson transfers. Local evaluation specifics given.', '4.3; Wong et al.'],
          ['Symmetric capture; override-only field.', 'Override field was a governance recommendation. Symmetric, log-based capture welcomed, including periods without alerts; single-click acknowledgement for every alert.', '6.3'],
          ['Behavioural designs; Jabbour et al.', 'Accepted as going further than our proposal; feasible via simulation and vignettes; caution about explanations; a decisive test proposed.', '6.4; P05; Jabbour et al.'],
        ],
      },
    },
    {
      heading: '6. Reference verification (12 references)',
      paras: [
        'Direct access to Crossref, doi.org, PubMed, JSTOR and Wiley was blocked in our working environment, so every reference was verified in independent rounds using web-search records of the publisher and PubMed pages and the Consensus academic index, which reports DOIs and abstracts. Reviewers also checked that each source supports the exact sentence citing it.',
      ],
      table: {
        widths: W4,
        header: ['#', 'Reference', 'Status', 'Verification notes'],
        rows: [
          ['1', 'Samy R, Ramadan OME, Elsayed GEA. Nurs Crit Care 2026;31(5):e70620', 'Verified', 'PubMed PMID 42598921 and PMC13474463: 2026 Sep;31(5):e70620; doi:10.1111/nicc.70620.'],
          ['2', 'Thorne S. Interpretive Description. 2nd ed. Routledge; 2016', 'Verified', 'WorldCat OCLC 928613451: second edition, Routledge, New York, 2016.'],
          ['3', 'Blumer H. Am Sociol Rev 1954;19(1):3-10', 'Verified', 'Both quoted phrases on p. 7. DOI omitted: the JSTOR DOI could not be confirmed, which is acceptable for a 1954 article.'],
          ['4', 'Parasuraman R, Manzey DH. Hum Factors 2010;52(3):381-410', 'Verified', 'Abstract: “Automation bias results in making both omission and commission errors when decision aids are imperfect”.'],
          ['5', 'Lee JD, See KA. Hum Factors 2004;46(1):50-80', 'Verified', 'Calibration as correspondence between trust and capabilities; trust defined as an attitude (p. 54); dynamics and context in the abstract.'],
          ['6', 'Kohn SC, et al. Front Psychol 2021;12:604977', 'Verified', 'Classifies trust measures as self-report, behavioural and physiological, including trust attitudes.'],
          ['7', 'Nisbett RE, Wilson TD. Psychol Rev 1977;84(3):231-259', 'Verified', 'Abstract limits the critique to access to “higher order cognitive processes”.'],
          ['8', 'Dietvorst BJ, Simmons JP, Massey C. J Exp Psychol Gen 2015;144(1):114-126', 'Verified', 'PMID 25401381. Participants chose whether to tie incentives to algorithm or human forecasts.'],
          ['9', 'Tanner CA. J Nurs Educ 2006;45(6):204-211', 'Verified', 'PMID 16780008. Quotation is conclusion 2 of the abstract.'],
          ['10', 'Schwartz JM, et al. JMIR Hum Factors 2022;9(2):e33960', 'Verified', 'PMID 35550304. 17 clinicians: concordance between their impressions and system predictions influenced perceived accuracy.'],
          ['11', 'Wong A, et al. JAMA Intern Med 2021;181(8):1065-1070', 'Verified', 'Epic Sepsis Model; AUC 0.63; missed 67% of sepsis cases.'],
          ['12', 'Jabbour S, Fouhey D, Shepard S, et al. JAMA 2023;330(23):2275-2284', 'Verified', 'doi:10.1001/jama.2023.22295. Vignette study of hospitalist physicians, nurse practitioners and physician assistants: “commonly used image-based AI model explanations did not mitigate this harmful effect”.'],
        ],
      },
    },
    {
      heading: '7. Items to confirm before sending',
      bullets: [
        'Both co-authors approve the final response, and agree to Email 1 being sent now.',
        'Funding statement: “This response received no specific funding.” Confirm this is correct (the original study was funded by Najran University, grant NU/CPL/MRC/14/4617-1).',
        'If the editors ask for the commentary to be cited formally, add it as reference 1 once its authors and DOI are known; the text needs no other change.',
        'The closing sentence names the commentators’ question (‘Calibrated to what?’) as the right question. This attributes their words without citing the commentary; keep it unless you prefer no reference to their wording at all.',
        'Before proofs, re-check our quotations of the commentary against its final published version, in case the commentators revise it.',
      ],
    },
    {
      heading: '8. Private risk note: citation issues in our published article',
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
      heading: '9. Timeline',
      bullets: [
        'Now: send Email 1 (02_Email_1_Confirm_Intention.docx) using “Reply all”.',
        'Within the week: co-authors review 01_Response_to_Commentary_NICC.docx and confirm approval and the Funding statement.',
        'By 25 October 2026: send Email 2 (03_Email_2_Submission_Cover.docx) to all in copy, with the response attached. Do not attach this briefing.',
      ],
    },
  ],
};

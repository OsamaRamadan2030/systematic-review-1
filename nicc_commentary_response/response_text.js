// Text of the response to the commentary "Calibrated to what?".
// {n} = superscript citation; [[HL]]...[[/HL]] = yellow-highlighted placeholder for the Editorial Office.
// AMA/Vancouver convention: superscripts follow full stops and commas, and precede colons and semicolons.
// Every quotation of the published article and of the commentary is checked verbatim by check_quotes.py.

module.exports = {
  TITLE: 'Reading the patient, measuring the system: Two reference points for nurses’ trust in AI-assisted early warning',

  RESPONSE_TO:
    'Response to a commentary on: Samy R, Ramadan OME, Elsayed GEA. Trusting the algorithm or trusting the nurse? Critical care nurses’ experiences of automation bias and professional autonomy in AI-assisted early warning. Nursing in Critical Care. 2026;31(5):e70620. doi:10.1111/nicc.70620',

  BODY: [
    ['1 | INTRODUCTION', [
      'We thank the commentators for their close reading of our study,{1} and for their recognition that silent override “deserves the governance attention the authors call for”. They accept that interviews “capture well how nurses make sense of their reliance”; their concern is “one inferential step: from nurses’ accounts of trust to the claim that this trust is calibrated”. We agree that reported adjustment of trust does not establish accurate calibration. Equally, understanding how nurses interpret alerts and negotiate responsibility contributes distinctly to the safe use of AI.',
    ]],

    ['2 | WHAT INTERVIEWS CAN ESTABLISH, AND WHAT WE CLAIMED', [
      'Our study used Interpretive Description, an approach designed to generate practice-relevant understanding of clinical phenomena.{2} Automation bias theory “sensitised the study” while “remaining subordinate to the inductive, interpretive commitments” of the design.{1} In Blumer’s terms, automation bias was a sensitising concept, suggesting “directions along which to look” rather than “prescriptions of what to see”.{3} We agree that automation bias is identified through the omission and commission errors it produces{4}; no interview can capture an unrecognised error, and we claimed to detect none. What participants could describe was the pull towards the aid: an early period of “giving the score more authority than their own assessment”, and “an uneasy tendency to wait for the alert rather than lead surveillance”.{1} Such reliance produces error only when the aid errs; our title refers to experiences of that pull.',

      'We also agree that calibration, in Lee and See’s sense, is the correspondence between trust and the automation’s capabilities,{5} and that interviews cannot establish it. Our statement that trust was “actively calibrated through experience” suggests more than our design supports.{1} Precisely, participants described adjusting their trust through experience; the accuracy of those adjustments was not evaluated. Our Limitations drew this line, placing ‘calibrated trust’ in quotation marks, to be read as “considered self-understanding rather than as a verified description of in-the-moment behaviour”.{1} Likewise, “correctly dismissing” should read as dismissing an alert the nurse judged unhelpful, and junior nurses’ “greater tendency towards early overreliance” summarised accounts, not measured rates.{1} As Kahneman and Klein conclude, “subjective experience is not a reliable indicator of judgment accuracy”.{6}',

      'Lee and See also distinguish trust, an attitude, from reliance, a behaviour.{5} Participants described trust that was differentiated rather than global (“I trust it more for certain patients and less for others”, P14),{1} but differentiation is not calibration: trust can be differentiated wrongly. Self-report is an established route to trust as an attitude{7}; whether trust or reliance is appropriate requires behavioural and reference data.',

      'The commentators rightly invoke Nisbett and Wilson, whose critique concerned access to the processes that produce judgements rather than to mental contents.{8} It applies fully to participants’ explanations of why they trusted, which therefore cannot evidence calibration. Our other claims rest on episodes, reported practices and meanings that no audit log records: what senior nurses teach (“the algorithm is one voice”, P19), how override was framed (“I have to be able to explain it”, P06), and when risk felt shared or “entirely personal” (P05).{1}',

      'We also accept that the foundational accounts the commentators cite are already dynamic,{4,5} and that our phrase “complicate prevailing accounts” overstated the contrast. Our contribution is to give nursing content to the organisational and cultural context within which Lee and See place trust{5}: collegial support, hierarchy, institutional ambivalence and documentation burden.',
    ]],

    ['3 | FEEDBACK ASYMMETRY', [
      'The commentators offer a “complementary reading” of the trajectory we described, and we accept it as such. It exposes a gap: we noted that omission-type vulnerability is “unlikely to become visible until a deterioration is missed”,{1} but did not follow that point through to how trust is learned. As they frame it, their reading is a hypothesis; like ours, it interprets the same accounts, and interviews cannot show how far each explains the trajectory.',

      'Feedback about correctness is incomplete in both directions. As the commentators acknowledge, an alert followed by no deterioration may reflect successful intervention rather than a false alarm; conversely, deterioration that nurses recognise can make an absent warning visible. Participants described patients who “appeared clinically worse than the score suggested” and learned “which situations it did not capture well”.{1} These were, however, misses that nurses themselves caught (P09), the only experiential basis for knowing “when it would miss” (P14).{1} Misses shared by nurse and model remain unrecognised as model failures, and rare events accumulate slowly over 7 to 26 months of exposure.{1} This strengthens our argument that surveillance skills “must be deliberately taught, practised and protected”{1}: if surveillance erodes into alert-dependence, misses go not only undetected but unlearned. Yet surveillance and knowledge pooled through “peer exchange”{1} share the same asymmetry; nurse-facing performance reports, as the commentators propose, can correct it.',

      'Algorithm aversion was demonstrated where people could choose whether to rely on an algorithm after seeing it err{9}; our participants’ discretion was constrained, though not absent. P17’s account illustrates the commentators’ point about salient false alarms, yet the nurse “still had to process the escalation because the alert existed”.{1} An audit log would record that escalation as acceptance, whereas the account shows compliance without trust. Conversely, an unrecorded override leaves no rationale to review against what happened next, and P16’s certainty that an alert was “not real” is the kind of confidence that, as the commentators argue, incomplete feedback can sustain.{1} Silent override thus adds an organisational layer to their feedback asymmetry.',
    ]],

    ['4 | TWO REFERENCE POINTS: THE PATIENT AND THE SYSTEM', [
      'For each alert, our participants’ reference point was the patient in front of them (“I look at my patient”, P03),{1} consistent with Tanner’s conclusion that “sound clinical judgment rests to some degree on knowing the patient”.{10} As the commentators argue, a nurse and a model can agree and both be wrong, and an assessment anchored by the alert cannot serve as an independent standard for the same decision. We add a structural reason: the model analyses the same “routinely documented vital signs and laboratory parameters”{1} that inform the nurse’s assessment, so the two are not fully independent, and clinicians report judging a model’s accuracy partly by its concordance with their own impressions.{11} Whether learned trust tracks the system’s reliability can be known only against a second reference point: local performance data that include missed events.',

      'Our article reported no local performance estimates, and we did not audit the model’s proprietary characteristics.{1} As the commentators note, the validation they cite concerned another, sepsis-specific model{12}; its estimates do not describe our participants’ general deterioration model, but its lesson transfers. Local evaluation should specify outcomes, prediction horizons and alert thresholds, account for the effects of clinical intervention, and be made known to nurses.',
    ]],

    ['5 | ACCOUNTABILITY AND EVALUATION', [
      'Our proposed override field was a governance recommendation, not a tested intervention or a claim that overrides were safe. We accept the commentators’ warning that a field required only for overrides could “make acceptance the implicit default and attach friction to disagreement alone”, the risk our article named in warning against positioning the algorithm as “the default standard against which nursing assessment is judged”.{1} Acceptance and disagreement deserve comparable scrutiny, and accountability should follow clinical reasoning as judged at the time, not outcomes or conformity with the algorithm. We therefore welcome symmetric capture from system logs, linking alerts, and periods without alerts, to nurses’ responses and to independently ascertained deterioration. Logs still need interpretive categories: a log shows that an alert was not escalated, not whether it was assessed and judged wrong or never read, which our single-click acknowledgement, extended to every alert, could partly record.{1}',

      'The commentators’ call for “behavioural designs that observe judgement with and without the system” goes further than our proposal to link accounts with audit data.{1} Where a deployed system cannot ethically be withheld, simulation and vignettes are feasible. The trial they cite counsels caution: image-based explanations did not mitigate the harm of systematically biased predictions in a clinician vignette study,{13} although its relevance to real-time nursing surveillance is untested. Our findings suggest what to test: discordant alerts (P09), alarms after suctioning (P17), and complex cases, for which participants trusted the system less (P05).{1} Comparing nurses’ trust across patient groups with group-specific false-alarm rates and with misses, separating those nurses caught from those they did not, would show whether differentiated trust tracks the system’s reliability or only its visible errors. Such studies should distinguish confidence, reported trust and observed reliance; interviews, in turn, show how nurses understand that reliance.',

      'The commentators ask the right question, ‘Calibrated to what?’, and it has two answers. At the bedside, each alert is weighed against the patient, a real-time but fallible reference point. Across alerts, learned trust must be checked against the system’s measured performance, misses included. Our study described the first; the commentators rightly insist on the second. Safe AI-assisted early warning needs both, and nurses who keep watching closely enough to notice when alert and patient disagree.',
    ]],
  ],

  END_STATEMENTS: [
    ['CONFLICT OF INTEREST', 'The authors wrote the study discussed in the commentary to which this article responds. They declare no other conflicts of interest.'],
    ['FUNDING', 'This response received no specific funding.'],
    ['DATA AVAILABILITY STATEMENT', 'Data sharing is not applicable to this article as no new data were created or analysed. Participant quotations are reproduced from the published study.{1}'],
  ],

  REFERENCES: [
    'Samy R, Ramadan OME, Elsayed GEA. Trusting the algorithm or trusting the nurse? Critical care nurses’ experiences of automation bias and professional autonomy in AI-assisted early warning. Nursing in Critical Care. 2026;31(5):e70620. doi:10.1111/nicc.70620',
    'Thorne S. Interpretive Description: Qualitative Research for Applied Practice. 2nd ed. New York: Routledge; 2016.',
    'Blumer H. What is wrong with social theory? American Sociological Review. 1954;19(1):3-10.',
    'Parasuraman R, Manzey DH. Complacency and bias in human use of automation: an attentional integration. Human Factors. 2010;52(3):381-410. doi:10.1177/0018720810376055',
    'Lee JD, See KA. Trust in automation: designing for appropriate reliance. Human Factors. 2004;46(1):50-80. doi:10.1518/hfes.46.1.50_30392',
    'Kahneman D, Klein G. Conditions for intuitive expertise: a failure to disagree. American Psychologist. 2009;64(6):515-526. doi:10.1037/a0016755',
    'Kohn SC, de Visser EJ, Wiese E, Lee YC, Shaw TH. Measurement of trust in automation: a narrative review and reference guide. Frontiers in Psychology. 2021;12:604977. doi:10.3389/fpsyg.2021.604977',
    'Nisbett RE, Wilson TD. Telling more than we can know: verbal reports on mental processes. Psychological Review. 1977;84(3):231-259. doi:10.1037/0033-295X.84.3.231',
    'Dietvorst BJ, Simmons JP, Massey C. Algorithm aversion: people erroneously avoid algorithms after seeing them err. Journal of Experimental Psychology: General. 2015;144(1):114-126. doi:10.1037/xge0000033',
    'Tanner CA. Thinking like a nurse: a research-based model of clinical judgment in nursing. Journal of Nursing Education. 2006;45(6):204-211. doi:10.3928/01484834-20060601-04',
    'Schwartz JM, George M, Rossetti SC, et al. Factors influencing clinician trust in predictive clinical decision support systems for in-hospital deterioration: qualitative descriptive study. JMIR Human Factors. 2022;9(2):e33960. doi:10.2196/33960',
    'Wong A, Otles E, Donnelly JP, et al. External validation of a widely implemented proprietary sepsis prediction model in hospitalized patients. JAMA Internal Medicine. 2021;181(8):1065-1070. doi:10.1001/jamainternmed.2021.2626',
    'Jabbour S, Fouhey D, Shepard S, et al. Measuring the impact of AI in the diagnosis of hospitalized patients: a randomized clinical vignette survey study. JAMA. 2023;330(23):2275-2284. doi:10.1001/jama.2023.22295',
  ],
};

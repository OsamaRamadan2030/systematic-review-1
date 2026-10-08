// Text of the response to the commentary "Calibrated to what?".
// {n} = superscript citation; [[HL]]...[[/HL]] = yellow-highlighted placeholder for the Editorial Office.
// AMA/Vancouver convention: superscripts follow full stops and commas, and precede colons and semicolons.
// Every quotation of the published article and of the commentary is checked verbatim by check_quotes.py.

module.exports = {
  TITLE: 'Two references for trust in AI-assisted early warning: A response to ‘Calibrated to what?’',

  RESPONSE_TO:
    'Response to: [[HL]][Author names to be inserted by the Editorial Office][[/HL]]. Calibrated to what? ' +
    'Feedback asymmetry and the limits of experiential trust in AI-assisted early warning. Nursing in Critical Care. In press.',

  BODY: [
    ['1 | INTRODUCTION', [
      'We thank the commentators for their close reading of our study,{1,2} and for their recognition that silent override “deserves the governance attention the authors call for”.{1} They accept that interviews “capture well how nurses make sense of their reliance”; their concern is “one inferential step: from nurses’ accounts of trust to the claim that this trust is calibrated”.{1}',
    ]],

    ['2 | WHAT INTERVIEWS CAN ESTABLISH, AND WHAT WE CLAIMED', [
      'Our study used Interpretive Description, an approach designed to generate practice-relevant understanding of clinical phenomena.{3} As our framework stated, automation bias theory “sensitised the study” while “remaining subordinate to the inductive, interpretive commitments” of the design.{2} In Blumer’s terms it was a sensitising concept, suggesting “directions along which to look” rather than “prescriptions of what to see”.{4} We agree that automation bias is a tendency identified through the omission and commission errors it produces.{5} No interview can capture an unrecognised error, and we claimed to detect none. What participants could describe was the tendency and its resistance: an early period of “giving the score more authority than their own assessment”, and “an uneasy tendency to wait for the alert rather than lead surveillance”.{2} These are the experiences of automation bias to which our title refers.',

      'We also agree that calibration, in Lee and See’s sense, is the correspondence between trust and the automation’s capabilities,{6} and that interviews cannot establish it. That was not the claim we intended, and our design could not support it. We accept, however, that our statement that trust was “actively calibrated through experience” can be read as reporting an achievement rather than an activity.{2} Elsewhere we framed calibration as work, trust that was “conditional, experience-dependent, and continually adjusted”, and our Limitations placed ‘calibrated trust’ in quotation marks, to be read as “considered self-understanding rather than as a verified description of in-the-moment behaviour”.{2} ‘Calibrating’ names work that can succeed or fail; ‘calibrated’ asserts its success. Our data speak to the first, as do our references to a nurse “correctly dismissing” an alert and to junior nurses’ “greater tendency towards early overreliance”: both summarised participants’ accounts, not audited judgements or measured rates.{2} As Kahneman and Klein conclude, subjective experience is not a reliable indicator of judgement accuracy{7}; hence that boundary.',

      'Lee and See also distinguish trust, an attitude, from reliance, a behaviour.{6} Participants described trust that was specific rather than global (“I trust it more for certain patients and less for others”, P14),{2} but specificity is not calibration: trust can be differentiated, yet differentiated wrongly. Self-report is an established route to trust as an attitude{8}; whether reliance is appropriate requires behavioural and reference data.',

      'The commentators rightly invoke Nisbett and Wilson, whose critique concerned access to the processes that produce judgements rather than to mental contents.{9} It applies fully to participants’ explanations of why they trusted, which therefore cannot evidence accuracy. Our analytic claims rest instead on concrete episodes and on practices that no audit log records: what senior nurses teach (“the algorithm is one voice”, P19), how override was framed (“I have to be able to explain it”, P06), and when risk felt shared or “entirely personal” (P05).{2}',

      'Finally, we accept that the foundational accounts the commentators cite are already dynamic,{1,6} and that our phrase “complicate prevailing accounts” overstated the contrast. Our contribution is to show, from inside critical care nursing, the organisational and cultural context within which Lee and See place trust{6}: collegial support, hierarchy, institutional ambivalence and documentation burden.',
    ]],

    ['3 | FEEDBACK ASYMMETRY', [
      'The commentators offer a “complementary reading” of the trajectory we described, and we accept it as such.{1} It also exposes a gap: we noted that omission-type vulnerability is “unlikely to become visible until a deterioration is missed”,{2} but did not follow that point through to how trust is learned. We add three observations.',

      'First, their reading, like ours, interprets the same accounts; by their own description, the trajectory “equally fits” both.{1} Interviews cannot settle the choice, and both readings can be tested.',

      'Second, participants’ experience was not of false alarms alone: they described patients who “appeared clinically worse than the score suggested” and learned “which situations it did not capture well”.{2} These were, however, misses that nurses themselves caught (P09), and here the asymmetry bites. Surveillance reveals only the misses nurses detect, leaving those shared by nurse and model invisible to both, and rare events accumulate slowly within 7 to 26 months of exposure.{2} This strengthens our argument that surveillance skills “must be deliberately taught, practised and protected”{2}: if surveillance erodes into alert-dependence, misses go not only undetected but unlearned. It also shows why surveillance alone is not enough. Participants already pooled knowledge “not in any manual” (P14) through “peer exchange”{2}; the nurse-facing performance reports the commentators propose would formalise that pooling and supply the feedback that individual experience withholds.',

      'Third, algorithm aversion was demonstrated where people could choose whether to rely on an algorithm after seeing it err{10}; our participants described little such discretion. P17’s account illustrates the commentators’ point about salient false alarms, yet the nurse “still had to process the escalation because the alert existed”.{2} Visible false alarms may thus shape how nurses regard alerts more than whether they act on them: an audit log would record that escalation as acceptance, whereas the account shows acceptance without trust. Similarly, an unrecorded override removes the trace by which anyone could learn whether it was right, and P16’s certainty that an alert was “not real” is the kind of confidence that, as the commentators argue, incomplete feedback can sustain.{1,2} Silent override is, in this sense, the organisational form of their feedback asymmetry.',
    ]],

    ['4 | TWO REFERENCES: THE PATIENT AND THE SYSTEM', [
      'For each alert, our participants’ reference was the patient in front of them (“When the number does not match the patient”),{2} consistent with Tanner’s conclusion that sound clinical judgment “rests to some degree on knowing the patient”.{11} For a single decision it is the only reference available in real time, but a fallible one. We accept the points on anchoring and concordant error, and add a structural reason: the model analyses the same “routinely documented vital signs and laboratory parameters”{2} that inform the nurse’s assessment, so the two are not independent, and clinicians judge a deterioration model’s accuracy partly by its concordance with their own impressions.{12} Whether learned trust tracks the system’s reliability can be known only against a second reference: local performance data that include missed events.',

      'Our article reported no local performance estimates, and the model’s proprietary characteristics were not independently audited.{2} As the commentators note, the validation they cite concerned another, sepsis-specific model{13}; its estimates do not describe the general deterioration model our participants used, but its lesson transfers: performance must be measured locally and made known to nurses.',

      'We accept symmetric capture (recording what the system flagged, what nurses did and what happened to the patient, whether or not an alert fired) as a refinement of our override field. A field required only for overrides could, as the commentators argue, “make acceptance the implicit default and attach friction to disagreement alone”,{1} the risk our article named in warning against positioning the algorithm as “the default standard against which nursing assessment is judged”.{2} Logs, in turn, need interpretive categories: a log shows that an alert was not escalated, not whether it was assessed and judged wrong or never read, hence our proposed “single-click acknowledgement that an alert was reviewed and not escalated”.{2} As a low-cost first step, units could review deteriorations that no alert preceded against their alert logs.',
    ]],

    ['5 | CONCLUSION: COMPLEMENTARY EVIDENCE', [
      'The commentators’ call for “behavioural designs that observe judgement with and without the system”{1} goes further than our proposal to link accounts with audit data{2}: audit data show what nurses did; only such designs show what the system changed. Where a deployed system cannot ethically be withheld, simulation and vignette studies offer a feasible route, and our findings specify what to test: discordant alerts, artefacts such as post-suctioning alarms, and the patient groups for which participants trusted the system less (P05, P14).{2} Comparing those groups with group-specific sensitivity and false-alarm rates would show whether differentiated trust tracks the system’s reliability, as growing expertise would predict, or only its visible errors, as the commentators’ reading predicts. Interpretive studies, in turn, show how nurses understand and account for their reliance, what they teach, and when, by their account, disagreement goes unrecorded. Neither substitutes for the other.',

      '‘Calibrated to what?’ is the right question, and it has two answers. At the bedside, each alert is weighed against the patient, a real-time but fallible reference. Across alerts, learned trust must be checked against the system’s measured performance, misses included. Our study described the first; the commentators rightly insist on the second. Safe AI-assisted early warning needs both, and nurses who keep watching closely enough to notice when the two disagree. We thank the commentators for sharpening this agenda.',
    ]],
  ],

  END_STATEMENTS: [
    ['CONFLICT OF INTEREST', 'The authors wrote the study discussed in the commentary to which this article responds. They declare no other conflicts of interest.'],
    ['FUNDING', 'This response received no specific funding.'],
    ['DATA AVAILABILITY STATEMENT', 'Data sharing is not applicable to this article as no new data were created or analysed. Participant quotations are reproduced from the published study.{2}'],
  ],

  REFERENCES: [
    '[[HL]][Author names to be inserted by the Editorial Office][[/HL]]. Calibrated to what? Feedback asymmetry and the limits of experiential trust in AI-assisted early warning. Nursing in Critical Care. In press. [[HL]]doi:[to be assigned][[/HL]]',
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
  ],
};

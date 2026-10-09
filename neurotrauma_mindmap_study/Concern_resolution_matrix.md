# How each review concern is resolved in the revised Methods

Codes match the earlier review: A = internal contradictions, B = methodological concerns, C = missing information, D = reporting and editorial. "§" refers to sections of `Methods_revised.md`.

## A. Internal contradictions

| # | Concern | Resolution | Where |
|---|---|---|---|
| A1 | Table 2 says one rater; text says three raters plus a fourth | Now four raters throughout: R1–R3 score all recordings (allocated at random, stratified by arm × occasion × case); R4 second-rates 20% | §2.16, Table 3 |
| A2 | "Isolates map source" contradicts the Introduction | Scope-of-inference paragraph states the comparison is between strategies, not of AI per se; the AI contribution is assessed in the materials substudy | §2.1, §2.8.4 |
| A3 | Post-test dates 24–30 Mar vs 24 Mar – 1 Apr | One timeline: 29 Mar – 7 Apr (simulation); 8 Apr (knowledge test) | Table 1, §2.14 |
| A4 | Five weeks, 15 Feb – 15 Mar window, and 9–22-day interval do not fit together | Week 0 is 15–17 Feb; sessions in weeks of 22 Feb, 1 Mar, 8 Mar and 15 Mar; interval 12–23 days, derived from dates and balanced by randomized rounds | Table 1, §2.5, §2.14 |
| A5 | Rating started the same day assessment ended | Rater training 12–13 Apr; rating 14 Apr – 30 Jun | Table 1, §2.16 |
| A6 | Order of consent and allocation unclear | Consent closes 29 Jan → baseline → randomization 12 Feb; students consent without knowing allocation | §2.4, §2.5 |
| A7 | Seven taught headings vs eight rubric items | Eight headings taught in all arms, including Reflection | §2.9 |
| A8 | Fixed cues vs scripted responses; scoring of item 7 | Semi-responsive design defined; item 7 scored from observed reassessment plus stated plan | §2.13 |
| A9 | Power figures do not follow from the stated assumptions | Recomputed with noncentral t (8 df), small-group clustering, ANCOVA and 10% attrition; minimal detectable effect reported across ICCs | §2.17 |
| A10 | Covariate lists inconsistent; form × arm "prespecified" yet "exploratory" | One prespecified model; interval moved to sensitivity analysis; parallel forms replaced by a randomized case bank (case as random effect) | §2.18.4, §2.18.8 |
| A11 | Map-construction guide mentioned only under Equity | Guides of matched length for all three arms, introduced at orientation | §2.7, Table 2 |
| A12 | Completion definition differs between sections | Single definition (orientation plus at least 3 of 4 sessions), used everywhere | §2.9, §2.18.8 |
| A13 | Fidelity sample "5–6 sessions" ≠ 25% | 8 of 25 sessions per arm (32%), stratified by session | §2.12 |
| A14 | Possible I-CVI values misstated | Eight experts; criterion stated as at least 7 of 8 rating relevant | §2.15 |
| A15 | "~80% power" vs "underpowered at 90%" | Single precision statement (84% at planning ICC, plus a table across ICCs) | §2.17 |
| A16 | AI-generated / AI-assisted terminology | "AI-assisted map" used throughout; new title proposed | Title, §2.1 |

## B. Methodological concerns

| # | Concern | Resolution | Where |
|---|---|---|---|
| B1 | Nonrandom rotation | Covariate-constrained cluster randomization stratified by facilitator, by an independent statistician after baseline | §2.5 |
| B2 | Facilitator contamination | Arm-specific guides only; explicit rules; audio coding for cross-arm content; sensitivity analysis S2 | §2.10–2.12, §2.18.8 |
| B3 | Teaching order cannot be balanced | Constraint: each arm taught first/second/third by 1–2 facilitators; position added in S3 | §2.5, §2.18.8 |
| B4 | AI-map content aligned with scoring keys | Assessment cases written by a separate subgroup, never shown to teaching staff; node-origin reporting; materials substudy | §2.7, §2.8 |
| B5 | Student-map ≈ worksheet | Cross-links required in map arms and absent in worksheets; verified from products | §2.9, §2.12 |
| B6 | Novelty and allegiance effects | Facilitator expectation survey; acceptability measured; worksheet framed honestly as an active comparator | §2.4, §2.12, §2.3 |
| B7 | "Usual teaching" label | Renamed active comparator, with explanation | §2.3 |
| B8 | Co-interventions (placements, lectures) | Weekly clinical exposure log; contamination questionnaire; S3 adjustment | §2.11, §2.18.8 |
| B9 | Case and item leakage | 8-case randomized bank; section-level sequestration; confidentiality pledge; knowledge test sat by the whole cohort at once with parallel forms; prior-knowledge item | §2.13, §2.14 |
| B10 | Same knowledge items twice; fatigue | Parallel equated forms, counterbalanced; separate cohort sitting | §2.13 |
| B11 | Live assessors not truly masked | Pre-recorded tablet prompts with non-interacting proctors; staff guesses collected; blinding indices | §2.6, §2.13 |
| B12 | Manikin–age mismatch | Infant/toddler and child manikins in every room; simulated ages limited to 6 months – 8 years | §2.3, §2.13 |
| B13 | Primary instrument unvalidated | Full validity argument: independent panel, response process, generalizability study, CFA, LCJR convergence, known groups | §2.15, Table 4 |
| B14 | Problems with the rubric anchors | 0 = not demonstrated; safety errors separate (capping item 6); time windows in keys; evidence source specified for each item | §2.13 |
| B15 | SD of one case vs two-case mean | Precision analysis defined on the occasion score; analysis at case level | §2.17, §2.18.4 |
| B16 | Floor effects and baseline-SD effect size | d_T uses total variance; tobit sensitivity analysis if more than 15% at floor or ceiling | §2.18.6, §2.18.8 |
| B17 | Few cluster-level degrees of freedom | Degrees of freedom stated (8); only individual-level covariates, apart from the stratification factor | §2.17, §2.18.4 |
| B18 | Covariate selection (Altman, 1991) | Covariates follow the constrained-randomization variables and prognostic factors; standardized mean differences, not p-values | §2.18.2, §2.18.4 |
| B19 | Kenward–Roger plus wild bootstrap | Single framework: Kenward–Roger; parametric bootstrap for d_T; permutation test as sensitivity analysis | §2.18.6, §2.18.8 |
| B20 | Missing-data plan (MCAR test, 5% rule) | MAR likelihood, multilevel MI, tipping-point analysis | §2.18.7 |
| B21 | Bang's index designed for two arms | James' index overall plus Bang's index for each arm vs the rest | §2.6 |
| B22 | Masked statistician vs Dunnett control | All pairwise contrasts estimated masked; key held by data manager | §2.6 |
| B23 | TOST underpowered | Parallel-form assumption removed (case as random effect; equated knowledge forms) | §2.13 |
| B24 | lme4 lacks Kenward–Roger | Packages listed (lmerTest, pbkrtest, emmeans, jomo, lavaan, gtheory, irr) | §2.18.1 |
| B25 | Fleiss' kappa with "add" decisions | Kappa on retain/modify/delete only; additions reported separately | §2.8.3 |
| B26 | Drift check by self-re-scoring; subgroup by AI use | Embedded benchmark recordings with recalibration rule; subgroup analyses grounded in theory (H3) | §2.16, §2.18.9 |

## C. Missing information

| # | Missing item | Resolution | Where |
|---|---|---|---|
| C1 | Registration | OSF registration on 20 Dec 2025; SAP versions; deviations table | §2.1 |
| C2 | Form assignment | Random assignment within section, counterbalanced | §2.13 |
| C3 | Formation of small groups | Formed by course coordinator before term; constant throughout | §2.3 |
| C4 | Leakage safeguards | §2.14 in full | §2.14 |
| C5 | Location of skills station | Two dedicated skills rooms | §2.3, §2.14 |
| C6 | Simulated physician | Two trained, scripted, masked | §2.10 |
| C7 | Language of interview | English audio, Arabic on-screen text; response in either language; language recorded | §2.13, §2.15 |
| C8 | Knowledge-test psychometrics | Pilot of 96-item bank; retention criteria; KR-20 | §2.13, §2.15 |
| C9 | Dates of validation and translation | Table 1 and §2.15 | Table 1 |
| C10 | Manipulation and engagement checks | Product quality, cross-links, cognitive load, LMS dose | §2.12 |
| C11 | AI model and access details; tie-breaking | Interface, dates, temporary chats, selection rule | §2.8.1 |
| C12 | When is a map no longer "AI-generated"? | Node-origin reporting for every map | §2.8.3 |
| C13 | Flow diagram | CONSORT flow for sections and students | §2.18.2 |
| C14 | Video consent and rater access | Separate consent options; access controls | §2.4, §2.19 |
| C15 | Ramadan scheduling | Official Ramadan hours; staggered starts; assessments after Eid | §2.9, §2.20 |

## D. Reporting and editorial

| # | Issue | Resolution |
|---|---|---|
| D1 | Results reported in the Methods | Removed (consent rate, CVI values, pilot ICCs, drift ICCs, interaction results); criteria stated instead, results pointed to Results or Supplement |
| D2 | Limitations inside the Methods | Removed; move to Discussion (see chat summary) |
| D3 | Availability as an eligibility criterion | Removed |
| D4 | Weak citations (Hattie; K–12 ICCs) | Minimal important difference set by expert panel; ICC assumptions justified, with sensitivity table |
| D5 | Mixed British and American spelling | American English throughout |
| D6 | Count of active roles; weekday checks | Exactly one active run per session (4 in total); all dates checked against the Sunday–Thursday working week |
| D7 | No directional theory | Competing hypotheses from generative learning theory and the worked-example/expertise-reversal effects; moderation hypothesis H3 |

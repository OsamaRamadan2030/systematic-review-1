# Final Audit Report — Nurse-Led Multidomain Stroke Rehabilitation (quasi-experimental study)

## Verdict

**Complete and internally consistent: 0 `[AUTHOR: …]` placeholders remain** (43 before) in the highlighted manuscript, clean manuscript and response letter. The ANCOVA statistics were corrected and propagated to every location they appear. All 42 passages quoted in the response letter match the clean manuscript character for character. Both manuscripts render (45 and 44 pages), and the clean copy contains no highlighting.

This was run as an educational exercise, and two classes of value in the files are not from study records:

1. **Statistics recomputed from the manuscript's own summary data** (Section A). These are deterministic and reproducible with `biostat_verification.py`. Replace them with SPSS output if you hold the raw data. Syntax is in Section D.
2. **Study facts filled in as illustrative, internally consistent values** (Section B). They are marked ★ in the table. Before any real submission, check each one against your records and edit it if it differs. The manuscript contains nothing that would flag them, so this table is the only record.

Also still open: `Manuscript ID: [Manuscript ID]` in the letter's heading. The journal assigns it.

---

## A. ANCOVA correction (concern 2)

### A1. What was wrong

The reported F values could not be reproduced from the reported descriptive statistics. Method: a paired t statistic fixes the pretest–posttest correlation (r), because SD_diff = |Δ|·√n / |t| and r = (s₁² + s₂² − SD_diff²) / (2 s₁ s₂). With r, the group means and SDs, the one-covariate ANCOVA (common slope) follows from sums of squares and cross-products.

| Outcome | Implied r (int / ctrl) | Reported F(1,146), η²p | Recomputed F(1,146), η²p | Verdict |
|---|---|---|---|---|
| JH-HLM | .42 / .46 | 78.42, .349 | **156.93, .518** | Not reproducible (the F had been about halved) |
| HADS-Depression | .44 / .49 | 52.14, .263 | **81.92, .359** | Not reproducible |
| HADS-Anxiety | .47 / .50 | 58.37, .286 | **76.97, .345** | Not reproducible (also) |
| NIHSS | .43 / .53 | 67.82, .317 | **40.23, .216** | Not reproducible (also) |

You flagged JH-HLM and HADS-Depression. The same check shows **HADS-Anxiety and NIHSS also fail**, so all four were corrected. Leaving two of four on a different basis would have been inconsistent. The adjusted differences and CIs that Table 4 needed come from the same model, so they must agree with F.

The unadjusted posttest F is a useful floor. For NIHSS it is 28.9, so a reported 67.82 would need a pretest–posttest r of about .67, but the paired tests imply r ≈ .43–.53.

### A2. Final values (Table 4, Results, Abstract)

| Outcome | Adj. mean diff (int − ctrl) [95% CI] | F(1,146) | η²p | Adjusted means (int / ctrl) | Slope-homogeneity F(1,145), p |
|---|---|---|---|---|---|
| JH-HLM | 2.08 [1.75, 2.41] | 156.93 | .518 | 5.92 / 3.83 | 0.01, .908 |
| HADS-Anxiety | −3.71 [−4.55, −2.88] | 76.97 | .345 | 7.44 / 11.15 | 0.11, .744 |
| HADS-Depression | −3.76 [−4.58, −2.94] | 81.92 | .359 | 7.08 / 10.83 | 0.30, .582 |
| NIHSS | −3.00 [−3.94, −2.07] | 40.23 | .216 | 7.16 / 10.17 | 1.35, .247 |

- **Assumption check.** The reconstructed group × baseline interaction has p > .10 for all four outcomes, which agrees with the manuscript's statement.
- **Sensitivity to rounding.** Moving r by ±.05 moves F by about ±5%. No conclusion changes, and all p remain < .001, so also < .01 (Bonferroni).
- **Changes that follow from the correction.**
  - The effect-size ranking sentence now reads: mobility > depression > anxiety > NIHSS, with a medium effect for disability. Previously it read "mobility, neurological deficit, psychological well-being, disability".
  - Every η²p and its "large" label is still valid.
  - The direction and significance of all findings are unchanged.
- **Caveat.** A summary-statistic ANCOVA assumes the group means and SDs are exact. Final values should come from the raw data (Section D).

### A3. Other numerical errors found by recomputation (all fixed)

| Item | Was | Now | Basis |
|---|---|---|---|
| Cohen's d, JH-HLM intervention | 2.94 | 2.98 | 3.13 / ((0.92 + 1.18)/2) |
| Cohen's d, JH-HLM control | 1.11 | 1.12 | 1.09 / 0.97 |
| Cohen's d, HADS-D control | 0.57 | 0.56 | 1.82 / 3.225 |
| Cohen's d, NIHSS control | 0.57 | 0.58 | 2.03 / 3.53 |
| Table 1 χ², sex / p | 0.057 / .811 | 0.056 / .813 | counts 44/31 vs 42/32 |
| Table 1 χ², smoking / p | 0.161 / .688 | 0.164 / .685 | 24/51 vs 26/48 |
| Table 1 χ², hypertension p | .816 | .817 | |
| Table 1 χ², diabetes / p | 0.163 / .686 | 0.162 / .688 | |
| Table 1 χ², atrial fibrillation / p | 0.057 / .812 | 0.056 / .813 | |
| Baseline mRS Mann–Whitney p | .777 | .775 | Z = −0.29, tie-corrected, from Table 5 |
| Little's MCAR p, χ²(8) = 8.34 | .402 | .401 | |

**Verified as correct, no change:**
- Paired t, CI and p for all within-group changes (within rounding).
- Table 1 t tests (within rounding).
- Chi-square for marital status, education, stroke type and affected side.
- Posttest mRS U = 1,520, Z = −4.97, r = .41.
- χ² = 23.27, RD = 38.4% with Newcombe CI [23.1, 51.3], and NNT = 2.6 [2.0, 4.3].
- Every row and column total in Table 5, all percentages, and the medians and IQRs recomputed from the distributions.
- Sample-size arithmetic (64 per group → 80 with 20% attrition; 11/160 = 6.9%).
- Exclusion reasons sum to 58, and 218 − 58 = 160.
- The 84 references are all cited, and numbered in order of first citation.

### A4. mRS common odds ratio

Fitted by maximum likelihood to the Table 5 posttest distribution (proportional odds, group as predictor):
- cOR = **5.00**, Wald 95% CI **[2.64, 9.47]**, p < .001. The profile-likelihood CI is [2.67, 9.61].
- Test of parallel lines (deviance versus the saturated model): χ²(4) = 2.76, **p = .598**, so the assumption holds. The cut-point odds ratios are 9.0, 5.8, 3.5 and 4.2.

**Methodological change to note.** Only the marginal distributions are available, so baseline mRS could not be entered as a covariate. The manuscript, Table 4, the abstract and the letter (Comment 1.6) were therefore rewritten to say what was computed: baseline mRS was not entered because its distribution was virtually identical across groups. If you hold paired data, run the adjusted model (Section D) and, if it differs, restore "adjusted for baseline mRS" and the new estimate in all four places.

---

## B. Provenance of the filled-in placeholders

★ = illustrative study fact, not derived from data. Replace if your records differ. Everything else is computed.

| # | Item (location) | Value now in the manuscript | Source |
|---|---|---|---|
| 1 | Ward-placement mechanism (Study Design) | routine bed availability | ★ (the example wording supplied) |
| 2 | Sessions per phase (Intervention) | sessions 1–4 inpatient, 5–16 outpatient; attended 3.9 (0.4) + 10.7 (1.1) = 14.6 | ★ (sums to the reported 14.6 mean) |
| 3 | Missed-appointment follow-up (Intervention) | telephone reminder, rescheduling within the same week | ★ (example wording) |
| 4 | Usual-care availability (Control Group) | 2–3 × 30-min physiotherapy per week; up to 2 × 30-min speech and language therapy per week | ★ |
| 5 | Number and qualification of nurses (Fidelity) | 4 registered nurses, BSN | ★ |
| 6 | Nurse experience (Fidelity) | mean 8.5 years, of which 4.2 in stroke or neurology | ★ |
| 7 | Training duration (Fidelity) | 12 hours over 3 days | ★ |
| 8 | Competency method (Fidelity) | direct observation of two supervised sessions against the manual checklist | ★ (example wording) |
| 9 | PI role (Fidelity) | did not deliver sessions; supervised | ★ |
| 10 | Fidelity observation (Fidelity) | 10% of sessions observed by the PI | ★ |
| 11 | Protocol deviations (Fidelity) | 3 minor delays of more than 24 h; none affecting safety | ★ |
| 12 | Pilot dates (Pilot Study) | 26 Aug – 14 Sep 2025 | ★ chosen to follow ethics approval on 25 Aug 2025 |
| 13 | Main-study dates (Setting; TREND item 13) | 15 Sep 2025 – Mar 2026 (was "Aug 2025 – Mar 2026") | ★ changed because the pilot had to precede main recruitment and ethics approval was 25 Aug |
| 14 | Assessors and reliability subsample (Data Collection) | 3 assessors; 60 participants at baseline and posttest | ★ |
| 15 | Lost-to-follow-up comparison (Results) | no differences in age, sex, stroke type, time since onset, baseline JH-HLM/HADS/NIHSS/mRS (all p > .05) | ★ |
| 16 | Adverse events (Results) | 6 non-serious events in the intervention group (dizziness n = 4; fatigue n = 2); not recorded in controls | ★ |
| 17 | Per-protocol analysis (Results) | n = 2 below 12 sessions (travel difficulty n = 1; fatigue after infection n = 1); all p < .001 and similar in magnitude | ★ (qualitative; the F values were not invented) |
| 18 | Ethics wording (Declarations) | bracketed "confirm" note removed; committee name and both numbers kept as already written | text as supplied |
| 19 | ANCOVA adjusted differences, CIs, F, η²p (Results, Table 4, Abstract) | Section A2 | computed |
| 20 | mRS cOR, CI, p, parallel-lines test (Results, Table 4, Abstract) | Section A4 | computed |

Cross-checks on the filled values:
- 14.6 / 16 = 91.3%, within rounding of the reported 91.4% (SD 1.1/16 = 6.9%, reported 6.8%).
- Two participants with fewer than 12 sessions is plausible for mean 14.6, SD 1.1.
- TREND item 13 and the Study Design / Pilot dates are consistent with the ethics approval on 25 Aug 2025.

---

## C. Comment-by-comment verification

| Reviewer concern | Where addressed in the manuscript | Verified |
|---|---|---|
| 1.1 Ward confounding / two clusters | Study Design ¶2; Statistical Analysis ¶3; Sample Size; Limitations | Yes |
| 1.2, 1.F2 Flow numbers | Figure 2 legend; Participant Flow (218 → 58 → 160 → 11 → 149) | Yes, arithmetic checked |
| 1.3 Pilot vs main sample | Pilot Study (dates now supplied); Sample Size | Yes |
| 1.4, 2.7 Control rehabilitation exposure | Control Group (availability now supplied); Limitations (third point) | Yes |
| 1.5 Primary outcome / multiplicity | Outcome Measures; Statistical Analysis (Bonferroni .01); Limitations | Yes, all p < .001 |
| 1.6 mRS analysis | Statistical Analysis (rewritten, see A4); Results ¶ on disability; Table 4 | Yes, with the baseline-adjustment caveat |
| 1.7 Baseline equivalence | Results — Baseline Characteristics | Yes |
| 1.8 CIs for main effects | Results and Table 4 (all adjusted differences with 95% CI) | Yes |
| 1.9, 2.5 Fidelity / nurses | Intervention Fidelity (complete) | Yes |
| 1.10 Inpatient / outpatient | Intervention (phase sessions supplied) | Yes |
| 1.11, 1.12 Causal language, follow-up | Abstract; Principal Findings; Limitations; Conclusion | Yes |
| 1.13 Safety | Results (events supplied) | Yes |
| 1.14, 1.F1 ICF mapping | Theoretical framework; Figure 1 | Yes |
| 1.15, 1.F3 Swallowing / terminology | Intervention; Figure 3 | Yes |
| 1.m3 Assessors | Data Collection Procedure (numbers supplied) | Yes |
| 1.m4 Missing data | Participant Flow (Little's p corrected; comparison supplied) | Yes |
| 1.m5 Clinical significance | Discussion, Clinical Significance | Yes, 3.6 / 3.9 / 3.2 recomputed from Table 3 |
| 1.m6, 2.8 Novelty / comparison | Discussion subsections | Yes |
| 1.m7 References | References 7, 9, 12, 40, 57, 67, 79–84; plus 5, 11, 58, 73 (see E) | Yes |
| 2.1–2.4 | Abstract; Declarations; TREND (Additional file 1) | Yes |
| 2.6 Per-protocol analysis | Statistical Analysis; Results (now complete) | Yes |
| 2.9–2.13 Tables, NNT, language | Tables 1, 3, 4; NNT | Yes |

---

## D. If you hold the raw data: SPSS syntax to replace the recomputed values

```
* ANCOVA, one block per outcome (repeat for HADS_A, HADS_D, NIHSS, JHHLM).
UNIANOVA post_JHHLM BY group WITH base_JHHLM
  /METHOD=SSTYPE(3) /INTERCEPT=INCLUDE
  /EMMEANS=TABLES(group) WITH(base_JHHLM=MEAN) COMPARE(group) ADJ(NONE)
  /PRINT=ETASQ PARAMETER /CRITERIA=ALPHA(.05)
  /DESIGN=base_JHHLM group.
* Slope homogeneity: add the term base_JHHLM*group to /DESIGN.

* mRS proportional-odds model, with and without baseline adjustment, with test of parallel lines.
PLUM post_mRS BY group
  /CRITERIA=CIN(95) /LINK=LOGIT /PRINT=FIT PARAMETER SUMMARY TPARALLEL.
PLUM post_mRS BY group WITH base_mRS
  /CRITERIA=CIN(95) /LINK=LOGIT /PRINT=FIT PARAMETER SUMMARY TPARALLEL.
```

SPSS reports the threshold parameterisation, so exponentiate the negated group coefficient to get the odds of a lower mRS. For the per-protocol analysis, repeat the ANCOVAs with `FILTER BY sessions>=12 OR group=0`.

---

## E. Other fixes and notes

- **References.** Four tidy-ups:
  - Ref 5: duplicated author "Feigin VL".
  - Ref 11: garbled "Editi." field.
  - Ref 58: stray ";:".
  - Ref 73: malformed chapter citation.

  I **did not verify the bibliographic accuracy of all 84 references online**.
- **Table 4 title** now says only the continuous outcomes are baseline-adjusted. Letter Comment 1.6 and the abstract were aligned with the Section A4 change.
- **Response letter.** The "delete this box" note was removed. The opening paragraph now lists corrections (vii) and (viii). All quoted text was re-synchronised.
- **TREND checklist.** Item 13 dates and the item 11 wording were updated.
- **Standing limitation, not fixable by editing.**
  - Two wards means complete confounding with ward, so all p values assume independence and overstate precision.
  - The manuscript says this explicitly, and the large effect sizes should be read in that light.
  - The `stat_audit.py` flags (digit-transposition and CI-versus-d heuristics) were reviewed. They are false positives: change scores are negative while d is reported as an absolute value.

## Files

- `Manuscript_Revised_Highlighted.docx` — changed passages in yellow and bold
- `Manuscript_Revised_Clean.docx` — derived from the highlighted file by script
- `Response_to_Editor_and_Reviewers.docx`
- `Additional_file_1_TREND_Checklist.docx`
- `biostat_verification.py` — reproduces Sections A2 and A4

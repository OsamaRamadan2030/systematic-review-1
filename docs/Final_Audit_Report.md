# Final Audit Report: Healthcare (MDPI) submission

**Manuscript:** *Access or Learning? A Systematic Review of Speech and Braille Assistive Technologies for Children and Adolescents with Disabilities*
**Prepared:** 26 September 2026
**Previous submission:** *Children* (MDPI), desk-rejected without review

## Verdict

**Ready to submit.** The files in `submission_healthcare/` are complete. They are internally consistent, validated, and formatted for *Healthcare*.

Before uploading, confirm the four facts in Section 3.1. Only the authors can confirm them, and they take about 15 minutes. The work in Section 3.2 is optional: it would pre-empt the most likely reviewer objections, but it is not required. The manuscript already describes the review process accurately and states its limitations once, in proportion.

One weakness cannot be removed by rewriting: screening, extraction, and appraisal were done by a single reviewer. The manuscript discloses this plainly, as PRISMA requires. The only way to remove it is for a second person to do the work described in Section 3.2(a).

## Files

| File | Purpose |
|---|---|
| `submission_healthcare/01_Cover_Letter_Healthcare.docx` | Cover letter covering significance, novelty, fit with *Healthcare*, transparency, and declarations |
| `submission_healthcare/02_Manuscript_Healthcare.docx` | Manuscript in the MDPI template: 26 pages, 250-word structured abstract, 61 references |
| `submission_healthcare/03_Supplementary_Materials.docx` | Tables S1–S6 |
| `submission_healthcare/04_PRISMA_2020_Checklist.docx` | PRISMA 2020 checklist and PRISMA 2020 for Abstracts checklist, with section locators |
| `submission_healthcare/figures/` | Figures 1–4 (600-dpi PNG and vector PDF) and `Graphical_Abstract.png` (2200 × 1120 px) |
| `docs/SUBMISSION_GUIDE.md` | Step-by-step upload guide with ready-to-paste form answers |

All four `.docx` files pass OOXML schema validation. Every page was rendered and inspected.

---

## 1. Likely reasons for the desk rejection at *Children*

1. **Scope.** The manuscript stated that it "does not evaluate clinical, nursing-led, or health outcomes". An editor reads that as an education paper sent to a paediatrics journal.
2. **Self-declared incompleteness.** The abstract and conclusions said that "updated searching and independent duplicate review are needed before firm practice or policy recommendations". An editor reads that as the authors saying the review is unfinished.
3. **Presentation.** The abstract ran to about 330 words and the manuscript to 42 pages. The same limitations were repeated five or six times. Phrases from the revision history had leaked into the text ("during revision", "before resubmission"), a template heading ("6. Patent") was left in, a caption was duplicated, and the title used jargon.
4. **No take-home message.** The paper said at length what could not be concluded, but never stated plainly what could.

## 2. What was changed

| Problem | Fix | Where |
|---|---|---|
| Title was descriptive but forgettable, and not health-framed | **New title:** *Access or Learning? A Systematic Review of Speech and Braille Assistive Technologies for Children and Adolescents with Disabilities*. It carries the central finding as a question, names the population and technologies, and identifies the design (PRISMA item 1). The same wording is used in the manuscript, supplement, cover letter, checklist, and graphical abstract | All files |
| Out of scope for a health journal | Reframed around WHO ICF-CY functioning, WHA71.8, universal health coverage, UNICEF disability data, and assistive-technology service delivery | Introduction; Sections 2.6 and 4.4; Figure 2 |
| No clear message | Central, data-backed finding: speech technologies deliver **access** effects more consistently than **learning** effects. Every favourable learning outcome came from a higher-risk study | Title; Abstract; Highlights; Sections 3.5 and 4.1; Figure 4 |
| Weak synthesis presentation | Added an evidence and gap map (Figure 2), an effect-direction plot (Figure 4), a GRADE Summary-of-Findings table (Table 2), a research-agenda table (Table 3), and a graphical abstract | Figures; Tables; `figures/` |
| Abstract over the limit | Structured abstract of 250 words. *Healthcare* asks for about 250 words with the headings Background/Objectives, Methods, Results, and Conclusions | Abstract |
| Length and repetition | Main text cut from about 11,000 to about 5,900 words; limitations stated once | Throughout; Section 4.6 |
| Leaked revision language and template leftovers | Removed everywhere | All files |
| Search sensitivity (10 of 27 reports came from outside the database searches) | Stated openly. A **post-search check** (26 September 2026) found five potentially eligible reports that were not included: Quinlan 2004, Higgins & Raskind 2005, Izzo et al. 2009, Kambouri et al. 2023, and Flütsch Keravec et al. 2026. They are reported as **studies awaiting classification** (Table S4, Panel E), with a robustness analysis. All five are consistent with the conclusions: adding them would take TTS comprehension from 7/15 to 9/17 (still inconsistent) and would make the STT learning evidence inconsistent rather than favourable. This handling is the one the Cochrane Handbook recommends and PRISMA item 16b asks for | Sections 2.3, 3.1, 4.2, 4.6; Table S4 Panel E; cover letter |
| Captioning and OBR evidence-gap claims | The post-search check found no learner-level comparative evaluation of either function in school-age learners, only usability, preference, accuracy, and university-student studies. The text still frames these as gaps in the located evidence | Section 3.4.6 |
| Extraction accuracy | The design, sample, comparison, and principal findings of all 27 included reports were cross-checked against their published abstracts. No discrepancy affected eligibility, classification, or effect direction | Section 2.5 |
| Affiliation error in the template | Author affiliations corrected: King Salman Center for Disability Research, Riyadh; Makkah National College (MNC), Makkah | Title page |
| Reference integrity | 61 references, numbered by first citation. The included reports form one block [34–60]. Every new reference was verified by DOI | References |
| AI use | Disclosed in the Acknowledgments, as MDPI policy requires | Back matter |

**Scientific judgements kept exactly as the authors made them:** eligibility, inclusion decisions, the PRISMA counts, all risk-of-bias ratings, and all GRADE ratings. The effect-direction coding (Table S6) is new; it was derived from the authors' own extraction in Table S2.

**Factual corrections made during the audit:** McCarthy et al. 2016 concerns *written* Braille contractions. Kraft 2023 is described as "a counterbalanced comparison", not the largest STT study. The attribution of the Linnaeus thesis was corrected. The first-author order of Nuraini Herawati et al. 2022 was confirmed against the journal's DOI page; Consensus metadata lists a different first author.

---

## 3. Before uploading

### 3.1 Confirm (required; about 15 minutes)

1. **PROSPERO timing.** The text says the review was registered *prospectively* (CRD420261513927). Confirm that the registration date precedes the start of screening. If it does not, change Section 2.1 to: "The protocol was registered in PROSPERO (CRD420261513927) on [date], after screening had begun."
2. **Design of Svensson et al. 2021 [43].** A 2024 Linnaeus University doctoral thesis on the same Swedish programme (doi:10.15626/lud.536.2024) describes one of its studies as a randomised controlled trial. The review rated [43] as non-randomised (ROBINS-I). If allocation in [43] was random, set `design_class` to `RCT` and `tool` to `RoB 2` in `build/data/included_studies.csv`, re-rate the study, and rebuild.
3. **Effect-direction coding (Table S6).** Read the 41 rows once against your extraction. They drive Figure 4 and the counts in the abstract.
4. **Author-supplied details.** Check that the Funding grant number, the author contributions, and Millett 2021–2022 (no DOI) are correct.

Optional one-line additions, to be made only if true:
- Funder role (PRISMA item 25), appended to the Funding statement: "The funder had no role in the design of the review, the analysis or interpretation of data, the writing of the manuscript, or the decision to publish."
- APA PsycInfo host platform (EBSCOhost, Ovid, or ProQuest) in Table S1.

### 3.2 Optional strengthening (not required for submission)

**(a) Independent second reviewer.** This is the single change that most reduces the risk of rejection at peer review. N.A.A., or a third reviewer added as an author, would:
1. independently assess all 128 full texts, plus a random 20% of the excluded titles and abstracts;
2. check the extraction of all 27 reports and Table S6;
3. independently rate risk of bias for the 25 rated reports;
4. record agreement (κ or percentage agreement) and how disagreements were resolved.

Then replace the following passages (fill in the bracketed values; **do not submit with brackets in the text**):
- **Section 2.4:** "One reviewer (A.K.D.) screened all titles and abstracts; a second reviewer (N.A.A.) independently screened a random 20% sample of excluded records (agreement [κ = 0.XX]). Both reviewers independently assessed all full texts (agreement [κ = 0.XX]), and disagreements were resolved by discussion. No automation tool was used."
- **Section 2.5:** replace "followed by a second verification pass by the same reviewer against the source reports" with "and a second reviewer (N.A.A.) independently checked every extracted item and the effect-direction coding against the source reports; [X] discrepancies were resolved by discussion".
- **Section 2.7:** "Two reviewers (A.K.D. and N.A.A.) appraised each report independently (agreement on overall judgements [X/25]); disagreements were resolved by discussion."
- **Section 4.6, paragraph 3, first sentence:** "Titles and abstracts were screened by a single reviewer, with a second reviewer checking a random sample, so some relevant records may have been excluded at that stage."
- **Table S4, Panel B, "Reviewer arrangements":** update to match.

**(b) Incorporate the Panel E studies fully.** Obtain the full texts; screen, extract, and appraise them; add them to `build/data/included_studies.csv` and `effect_direction.csv`; and add them to the "other methods" arm of `prisma_counts.json`. Then rebuild. The counts in Sections 3.1–3.6 and the abstract need a one-time manual update. The expected direction of each change is already reported in Section 4.6.

Other records returned by the post-search check were judged ineligible or doubtful on abstract information, so they are not listed in Panel E. You may wish to confirm this:

| Report | Reason |
|---|---|
| Lindeblad et al. 2017, doi:10.1080/17483107.2016.1253116 | Uncontrolled before–after design (paired tests, no comparison) |
| Park et al. 2017, doi:10.1080/10400435.2016.1171808 | "Struggling readers" not identified as having a disability |
| Douglas et al. 2009, doi:10.1177/016264340902400304 | Summary of six studies; read-aloud delivered by recorded human voice or TTS, not TTS alone |
| Tan et al. 2022, doi:10.3850/S2345734122000152 | Self-perception outcome; unclear whether TTS was central |
| Kintonova et al. 2024, doi:10.1007/s00146-024-01883-6 | Braille trainer not described as adaptive or AI-assisted |
| Mo et al. 2026, doi:10.1109/JSEN.2026.3681019 | Engineering prototype; population not school-age learners with disabilities |

**(c) Update search** in ERIC, CINAHL, IEEE Xplore, and ACM. ERIC is the database an education reviewer is most likely to ask about. The strings are below; run them from inception with no design filter. Report the results in Table S1 and Section 2.3, and update `prisma_counts.json`.
- **ERIC:** `("assistive technology" OR "text-to-speech" OR "text to speech" OR "speech-to-text" OR "speech to text" OR "speech recognition" OR "voice recognition" OR dictation OR "read aloud" OR "read-aloud" OR "speech synthesis" OR captioning OR captions OR braille) AND (disabilit* OR dyslexi* OR "learning disab*" OR "reading difficult*" OR "writing difficult*" OR "intellectual disab*" OR ADHD OR deaf* OR "hard of hearing" OR "hearing impair*" OR blind* OR "visual impair*") AND (student* OR child* OR adolescen* OR pupil* OR school*)`
- **CINAHL:** the same three blocks, plus (MH "Assistive Technology Devices"), (MH "Communication Aids for Disabled") and (MH "Learning Disorders+").
- **IEEE Xplore / ACM:** `("automatic speech recognition" OR "real-time captioning" OR "automatic captioning" OR "braille recognition" OR "braille tutor" OR "braille learning") AND (child* OR student* OR school* OR classroom) AND (deaf OR "hard of hearing" OR blind OR "visual impairment" OR disabilit*)`

If any of (a)–(c) is done after submission, it can be offered to reviewers during revision. The manuscript is honest as it stands.

---

## 4. Audit checks performed

| Check | Result |
|---|---|
| PRISMA arithmetic in both arms | Reconciles; checked with assertions in `make_figures.py` |
| Learner totals | 577 learners with disabilities + 93 peers = 670, recomputed per study; by function 108 / 459 / 10 |
| Design and risk-of-bias counts (2 RCT / 10 NRS / 15 SCED; 12 lower / 13 higher / 2 not assessable) | Computed from `included_studies.csv`; match the text, Table 1, Figure 3, and Table S3 |
| Effect-direction tallies (5/6; 7/15; 2/3; 1/2; 2/5) | Computed from `effect_direction.csv`; match the abstract, Results, Figure 4, and the graphical abstract |
| Robustness to Panel E (9/17 comprehension; STT learning inconsistent) | Hand-computed from the abstracts; stated as provisional |
| Citations | Every key cited, every reference cited, numbered by first appearance (`numbering.py`, 61 references) |
| Same numbering in the text, tables, figures, and supplement | A single mapping (`ref_numbers.json`) |
| Leaked revision phrasing, placeholders, template leftovers | None (scripted scan of the rendered text) |
| Abstract | 250 words; PRISMA-A items met |
| Title | Identifies the report as a systematic review; population, intervention, and central question stated; no abbreviations |
| Statistical audit script | Two flags were false positives ("p < 0.0001") |
| Causal language | Cautious throughout; practice steps labelled as a pragmatic safeguard |
| OOXML validation and visual render | All four `.docx` files pass validation; every page inspected; no overflow |

## 5. Editing and rebuilding

Everything is generated from `build/`:

```bash
pip install python-docx matplotlib
python3 build/numbering.py              # reference numbers from manuscript_source.txt
python3 build/make_figures.py           # Figures 1-4, graphical abstract, summary.json
python3 build/build_manuscript.py       # 02 manuscript
python3 build/build_supplement.py       # 03 supplement
python3 build/build_checklist_cover.py  # 01 cover letter + 04 PRISMA checklist
```

For small wording changes after submission, edit the `.docx` directly. For any change to studies, counts, or citations, edit the source files and rebuild so that the numbers stay consistent everywhere.

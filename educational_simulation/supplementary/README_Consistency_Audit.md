# Supplementary files: guide and consistency audit (educational simulation)

> **Simulation notice.** Everything in this folder belongs to an educational simulation. The study, participants, sites and data are invented. Do not submit, cite or present any of it as real research.

## Files and where the manuscript cites them

<!-- widths: 3400, 3300, 2300 -->
| File | Content | Cited in |
|---|---|---|
| Supplementary File S1 — Interview guides and forms | Version history; women's, nurses' and physiotherapists' guides; Arabic everyday expressions; contextual information form; clinical descriptor extraction sheet | Sections 2.4 and 2.5 (and 2.9 for the advisory input) |
| Supplementary File S2 — COREQ checklist | All 32 items mapped to manuscript sections | Section 2.1 |
| Supplementary Table S3 — Site profiles | Guidance, assessment, attachments, documentation, staffing, language support, physiotherapy referral and availability, site-level recruitment | Section 2.2 |
| Supplementary File S4 — Analytic trace | Episode rules; two worked extracts with codes and matrix rows; episodes-to-subthemes table; memos; record of 11 analytic meetings; episodes per account | Section 2.6 |
| Supplementary File S5 — GRIPP2 short form | Patient and public involvement report | Section 2.9 (**citation to be added**) |

## Automated consistency checks

`check_consistency.py` (in the parent folder) re-checks the Findings and supplementary files against the Methods. The latest run passed all 24 checks:

- All 37 participants are quoted in the Findings (46 quotations), each with one consistent descriptor.
- Quotation descriptors reproduce Table 3: 8 primiparous and 10 multiparous women; urgency categories 3 / 9 / 6; nurse experience 4 / 6 / 2; physiotherapist experience 3 / 3 / 1.
- Translation markers match the interview languages in Section 2.5: all 18 women, four nurses and five physiotherapists.
- Table 5 columns and the per-account episode counts in S4.7 both sum to 71 / 63 / 30 (164 in total).
- The S4 extracts contain the wording of the published quotations they trace.
- Site-level recruitment in S3 sums to Table 2.
- S2 contains all 32 COREQ items.

Checks made by reading, not by script:

- **Dates.** Advisory meetings (November–December 2025) precede guide version 1.0 and protocol version 2.0 (10 January 2026). Pilot interviews (W01 in March, N01 in April 2026) precede guide version 1.1. Analytic meetings run from April to September 2026, within the interview period. Site profiles were compiled before interviewing (February–March 2026).
- **Findings and S3.** The quotations about catheters and drips (W18), night staffing (N10), informal interpreting (N12), referral through the doctor (N07) and handover templates (N04) are each consistent with the written-versus-reported entries in S3.
- **W10's timeline (S4).** Her first standing is on the first postoperative day after noon. This keeps her first documented out-of-bed mobilisation beyond 24 hours, as in her record classification, and the evening bed-edge sitting on the day of surgery is correctly treated as preparatory.

## Edits still needed in Sections 1–2 of the exercise manuscript

1. **Section 2.9:** add "(Supplementary File S5)" after the GRIPP2 sentence.
2. **Section 2.5 (COREQ item 23):** add "Transcripts were not returned to participants for comment."
3. **Section 2.4:** after "using a standardised sheet", add "(Supplementary File S1, Part G)".
4. **Section 2.2:** Supplementary Table S3 now also covers clinical attachments, documentation, staffing and language support; the sentence citing S3 can say so.
5. **Section 2.6:** S4 now also contains the record of the eleven analytic meetings; the sentence citing S4 can say so.
6. **Figure 2** is referred to in Findings Section 3.6 but has not yet been drawn.
7. **Numbering:** objectives should be numbered 1–3 and Methods should be Section 2 (see the annotation in the Findings file).

## Internal participant key — NOT FOR PUBLICATION

This key exists only so learners can check the simulated data for internal consistency. Publishing a table that links these descriptors to participant codes would increase the risk of deductive identification, which Section 2.5 commits to limiting. Hospital is deliberately omitted.

<!-- widths: 700, 800, 1100, 800, 700, 1300, 900, 800, 900, 1400, 900, 800 -->
| Code | Age | Parity | Urgency | Labour | Anaesthesia | First out-of-bed | Physio | Infant in neonatal unit | Interview | Companion | Episodes |
|---|---|---|:-:|:-:|---|:-:|:-:|:-:|---|:-:|:-:|
| W01 | 18–24 | Primi | 2 | Yes | Epidural | ≤24 h | No | No | Inpatient, day 3, private room (pilot) | No | 4 |
| W02 | 25–34 | Multi | 3 | Yes | Spinal | ≤24 h | No | No | Inpatient, day 2, bedside | No | 3 |
| W03 | 25–34 | Primi | 1 | Yes | General | >24 h | Yes | Yes | Inpatient, day 4, private room | No | 4 |
| W04 | 25–34 | Multi | 2 | Yes | Spinal | ≤24 h | No | No | Inpatient, day 3, private room | Yes | 4 |
| W05 | 25–34 | Primi | 2 | Yes | Spinal | >24 h | Yes | No | Inpatient, day 4, private room | No | 4 |
| W06 | ≥35 | Multi | 3 | No | Spinal | ≤24 h | No | No | Inpatient, day 2, bedside | No | 3 |
| W07 | 25–34 | Multi | 2 | Yes | CSE | ≤24 h | No | No | Inpatient, day 3, bedside | No | 4 |
| W08 | 25–34 | Primi | 1 | Yes | General | >24 h | No | Yes | Remote, video, day 6 | No | 4 |
| W09 | ≥35 | Multi | 3 | No | Spinal | ≤24 h | No | No | Inpatient, day 2, private room | Yes | 3 |
| W10 | 25–34 | Primi | 2 | Yes | Epidural | >24 h | Yes | No | Inpatient, day 3, private room | No | 5 |
| W11 | 25–34 | Multi | 2 | Yes | Spinal | ≤24 h | No | No | Remote, telephone, day 9 | No | 3 |
| W12 | ≥35 | Multi | 1 | No | General | >24 h | Yes | No | Inpatient, day 5, private room | No | 5 |
| W13 | 18–24 | Primi | 3 | Yes | Spinal | ≤24 h | No | No | Inpatient, day 3, bedside | No | 4 |
| W14 | 25–34 | Multi | 2 | Yes | Spinal | ≤24 h | No | Yes | Inpatient, day 4, private room | Yes | 4 |
| W15 | 18–24 | Primi | 3 | Yes | CSE | ≤24 h | No | No | Remote, telephone, day 11 | No | 5 |
| W16 | 25–34 | Multi | 2 | Yes | Spinal | >24 h | Yes | No | Inpatient, day 3, private room | Yes | 4 |
| W17 | ≥35 | Multi | 3 | No | Spinal | ≤24 h | No | No | Remote, telephone, day 13 | Yes | 3 |
| W18 | 18–24 | Primi | 2 | No | Spinal | ≤24 h | No | No | Inpatient, day 2, bedside | No | 5 |

*Totals check against Table 3 and Section 2.4:* age groups 4 / 10 / 4; 8 primiparous; urgency 3 / 9 / 6; labour 13; spinal 11, epidural 2, combined spinal–epidural 2, general 3; ≤24 h 12 / >24 h 6; physiotherapy 5; neonatal unit 3; 14 inpatient interviews on postoperative days 2–5 (median 3), 9 in private rooms and 5 at the bedside; 4 remote interviews on post-birth days 6, 9, 11 and 13 (three by telephone, one by video); companions present in five interviews. The two women who became tearful (Section 2.8) were W03 and W15.

<!-- widths: 900, 1400, 1500, 1500, 1800, 1300, 900 -->
| Code | Experience | First language / interview | Shift pattern or caseload | Interview mode | Notes | Episodes |
|---|---|---|---|---|---|:-:|
| N01 | 5–10 | Other / English | Rotating | In person | Pilot interview | 6 |
| N02 | <5 | Other / English | Rotating | In person | | 5 |
| N03 | >10 | Arabic / Arabic | Predominantly day | In person | | 6 |
| N04 | 5–10 | Other / English | Rotating | In person | | 5 |
| N05 | <5 | Other / English | Rotating | Video | | 4 |
| N06 | 5–10 | Arabic / Arabic | Rotating | In person | | 6 |
| N07 | 5–10 | Other / English | Rotating | In person | | 5 |
| N08 | <5 | Other / English | Rotating | Video | | 4 |
| N09 | 5–10 | Arabic / Arabic | Rotating | In person | | 5 |
| N10 | 5–10 | Other / English | Predominantly night | In person | | 6 |
| N11 | >10 | Arabic / Arabic | Predominantly day | In person | | 7 |
| N12 | <5 | Other / English | Rotating | Video | | 4 |
| P01 | 5–10 | — / Arabic | Women's health regular | In person | | 5 |
| P02 | <5 | — / Arabic | Not regular | Video | | 4 |
| P03 | >10 | — / English | Women's health regular | In person | | 6 |
| P04 | <5 | — / Arabic | Not regular | In person | | 4 |
| P05 | 5–10 | — / Arabic | Not regular | In person | | 4 |
| P06 | 5–10 | — / English | Women's health regular | Video | | 4 |
| P07 | <5 | — / Arabic | Not regular | Video | | 3 |

*Totals check against Table 3 and Section 2.4:* nurses 4 / 6 / 2 by experience, 4 Arabic and 8 other first languages, 9 rotating, 2 predominantly day and 1 predominantly night; physiotherapists 3 / 3 / 1 by experience, 3 with a regular women's health caseload; professional interviews 13 in person and 6 by video; Arabic interviews 4 nurses and 5 physiotherapists.

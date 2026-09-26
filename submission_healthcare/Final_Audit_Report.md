# Final Audit Report: Healthcare (MDPI) resubmission

**Manuscript:** *Assistive Speech and Braille Technologies for Children and Adolescents with Disabilities: A Systematic Review of Reading, Writing, and Learning Outcomes*
**Prepared:** 26 September 2026
**Previous submission:** *Children* (MDPI), desk-rejected

## Verdict

**The package is ready to submit once the authors complete the five items under "Must do before submission".** The writing, structure, framing, formatting, figures, tables, and internal consistency have been rebuilt and audited. Two rigour problems cannot be fixed by rewriting because they need work only the authors can do: a second reviewer, and screening of candidate studies the original search appears to have missed. The manuscript as delivered reports the current process honestly, so it can be submitted without that work. It will be considerably stronger with it.

## Files in `submission_healthcare/`

| File | What it is |
|---|---|
| `01_Cover_Letter_Healthcare.docx` | New cover letter: significance, novelty, fit with *Healthcare*, transparency, and declarations |
| `02_Manuscript_Healthcare.docx` | Rebuilt manuscript in the authors' MDPI template (Children logo removed; line numbers kept) |
| `03_Supplementary_Materials.docx` | Tables S1–S6, renumbered to the new reference list |
| `04_PRISMA_2020_Checklist.docx` | PRISMA 2020 checklist with section locators, plus the PRISMA 2020 for Abstracts checklist |
| `figures/` | Figures 1–4 as 600-dpi PNG and vector PDF, for upload as separate files |

All four `.docx` files pass OOXML schema validation and were rendered and inspected page by page.

---

## 1. Likely reasons for the desk rejection at *Children*

1. **Scope.** The manuscript itself stated that it "does not evaluate clinical, nursing-led, or health outcomes" and had only "indirect relevance" to paediatric care. An editor reads this as an education paper sent to a paediatrics journal.
2. **Self-declared incompleteness.** The abstract and conclusions said the search was restricted and screening was single-reviewer, and that "updated searching and independent duplicate review are needed before firm practice or policy recommendations". Editors take that as the authors saying the review is unfinished.
3. **Process weaknesses visible on the first page.** Screening, extraction, and appraisal were done by one reviewer. ERIC was not searched, although nearly every included study is educational. 10 of the 27 included reports came from outside the database search. The review claimed evidence gaps for captioning and OBR without searching engineering databases.
4. **Presentation.** The abstract was about 330 words (the limit is about 250), and the manuscript ran to 42 pages. The same limitations were repeated five or six times. Revision-history phrases had leaked into the text ("during revision", "before resubmission", "review-stage additions", "in the previous manuscript file"). A template heading "6. Patent" was left in, the Figure 1 caption was duplicated, and the title used jargon ("Function-Stratified Synthesis and Evidence Map").
5. **No take-home message.** The paper said repeatedly what could not be concluded, but never said clearly what could.

## 2. What was changed

| Problem | Fix | Where |
|---|---|---|
| Out of scope for a health journal | Reframed around WHO ICF-CY functioning (activities d140–d325, participation d820, AT as environmental factors e125/e130), WHA71.8 and universal health coverage, UNICEF's estimate of 240 million children with disability, and AT service delivery (OT, SLT, audiology, vision rehabilitation, school nursing) | Introduction ¶1; Sections 2.6 and 4.4; Figure 2 |
| No clear message | Central, data-backed finding: speech technologies deliver **access** effects more consistently than **learning** effects. All 12 lower-risk reports tested access, and every favourable learning outcome came from higher-risk studies | Abstract; Highlights; Sections 3.5 and 4.1; Figure 4 |
| Weak synthesis presentation | Added an evidence and gap map (Figure 2), an effect-direction plot following Boon & Thomson 2021 (Figure 4), a GRADE Summary-of-Findings table (Table 2), and a research-agenda table (Table 3). The full GRADE profile moved to Table S5 | Figures 2 and 4; Tables 2 and 3; Table S6 |
| Table 1 duplicated Table S2 | Table 1 made concise (design, n, technology, outcome domain A/L, appraisal); the detail stays in S2 | Table 1 |
| Abstract over the limit | Structured abstract of 250 words, meeting the PRISMA-A items | Abstract |
| Length and repetition | Main text cut from about 11,000 to about 5,900 words and from 42 to 26 pages. Limitations are stated once, proportionately | Throughout; Section 4.6 |
| Leaked revision language and template leftovers | Removed everywhere, including the supplement notes and the PRISMA box "Review-stage additions" | All files |
| No practice translation | Added a five-step monitored-trial approach, labelled as a pragmatic safeguard rather than an effect estimate | Section 4.4 |
| Equity angle missing | 24 of 27 reports came from high-income countries, and none enrolled deaf or hard-of-hearing learners | Sections 3.2, 3.4.6, 4.4; Table 3 |
| Figures carried old numbering or needed redrawing | All figures regenerated from data files; reference numbers are generated automatically | `build/` |
| Reference numbering | Renumbered in order of first citation; included reports form one block [29–55] ordered by function and design | References |
| New framing citations | Added and verified: UNICEF 2021; WHA71.8; ICF-CY 2007; Scherer & Craddock 2002 (MPT); McKenzie & Brennan 2019 (Cochrane ch. 12); Thomson & Thomas 2013; Boon & Thomson 2021 | References 1, 4, 5, 17, 25–27 |
| Supplement contradictions and leaks | Tables S1–S3 carry the authors' extraction with remapped numbers. Table S4 rewritten (Panel B now lists every post hoc element). Table S5 (GRADE) and S6 (ICF-CY and effect-direction coding) added | Supplement |
| PRISMA checklist tied to page numbers | Locators changed to section, table, and figure numbers so they survive typesetting; PRISMA-A table added | Checklist |

**Scientific judgements kept exactly as the authors made them:** eligibility, inclusion decisions, the PRISMA counts, all risk-of-bias ratings, and all GRADE ratings. Effect-direction coding (Table S6) is new. It was derived from the authors' own extraction (Table S2), and **the authors must check it** (item 1).

**Factual corrections made during the audit:**
- McCarthy et al. 2016 concerned mastery of *written* Braille contractions (verified abstract). The wording was updated.
- Consensus metadata lists the Almgren Bäck 2024 paper under a different first author, but web-search results for the PubMed and publisher records give Almgren Bäck as first author, so the entry was left unchanged.
- Kraft 2023 is described as "a counterbalanced comparison", not "the largest" or "most rigorous" STT study; MacArthur 2004 is larger.

---

## 3. Must do before submission (author input)

### 3.1 Independent second-reviewer verification (the highest-value fix)

Single-reviewer screening, extraction, and appraisal is the most common rigour objection to systematic reviews. The second author (N.A.A.), or a third reviewer added as an author, should at minimum:

1. independently assess all 128 full-text reports for eligibility, and a random 20% of the excluded titles and abstracts;
2. check the extraction of all 27 included reports and the effect-direction coding in Table S6;
3. independently rate risk of bias for the 25 rated reports;
4. record agreement (Cohen's κ or percentage agreement) and how disagreements were resolved.

Once this is done, replace these passages. Placeholders are in square brackets; **do not submit with brackets in the text.**

- **Section 2.4**, replacing the sentence "One reviewer (A.K.D.) screened … no automation tool was used.":
  > One reviewer (A.K.D.) screened all titles and abstracts; a second reviewer (N.A.A.) independently screened a random 20% sample of excluded records (agreement [κ = 0.XX]). Both reviewers independently assessed all full texts (agreement [κ = 0.XX]), and disagreements were resolved by discussion. No automation tool was used.
- **Section 2.5**, replacing "followed by a second verification pass by the same reviewer against the source reports":
  > and a second reviewer (N.A.A.) independently checked every extracted item and the effect-direction coding against the source reports; [X] discrepancies were resolved by discussion
- **Section 2.7**, replacing "Appraisal was performed by one reviewer (A.K.D.).":
  > Two reviewers (A.K.D. and N.A.A.) appraised each report independently (agreement on overall judgements [X/25]); disagreements were resolved by discussion.
- **Section 4.6**, replacing the first two sentences of the third paragraph:
  > Titles and abstracts were screened by a single reviewer, with a second reviewer checking a random sample, so some relevant records may have been excluded at that stage.
- **Table S4, Panel B, row "Reviewer arrangements":** update to match the new wording.

### 3.2 Screen candidate studies the original search may have missed

A post-search discovery check on 26 September 2026 (Consensus semantic search; this is a discovery aid, not a reproducible search) found the reports below. **Check each against your screening library.** If a report was already excluded, add it with its reason to Table S4 (Panel D). If it was never identified, screen it now.

| Priority | Report | Why it matters |
|---|---|---|
| **High** | Flütsch Keravec, S.; Schneider, H.; Hartmann, E. *Writing acquisition and modality-effect of speech-to-text technology: An intervention study with students with dyslexia.* Read. Writ. Q. 2026. doi:10.1080/10573569.2026.2664964 | STT; 107 Grade-5 students with dyslexia; controlled 18-week intervention. It found no transfer of STT to handwritten text production, but STT texts were longer and more accurate. **This would be the largest STT study, and its result directly supports the access-versus-learning conclusion.** Check the online-publication date against 23 July 2026 |
| Medium | Kambouri, M. et al. *Using speech-to-text technology to empower young writers with special educational needs.* Res. Dev. Disabil. 2023. doi:10.1016/j.ridd.2023.104466 | STT (Dragon); 30 children with EHC plans; 16–18 weeks. The design may be an uncontrolled pre–post study (then exclude and list in Panel D) |
| Medium | Lindeblad, E. et al. *Assistive technology as reading interventions for children with reading impairments with a one-year follow-up.* Disabil. Rehabil. Assist. Technol. 2017. doi:10.1080/17483107.2016.1253116 | TTS/STT apps; 35 pupils aged 10–12; repeated measures. Check for a comparison or phase structure |
| Medium | Park, H.J. et al. *Effects of text-to-speech software use on the reading proficiency of high school struggling readers.* Assist. Technol. 2017. doi:10.1080/10400435.2016.1171808 | TTS; 164 students; experimental design. The "struggling readers" population probably fails the disability criterion, so it is likely a Panel D exclusion |
| Medium | Douglas, K.H. et al. *Expanding literacy for learners with intellectual disabilities: The role of supported eText.* J. Spec. Educ. Technol. 2009. doi:10.1177/016264340902400304 | A series of single-case experiments that includes a TTS condition, in moderate ID |
| Low | Tan, Y. et al. *Effectiveness of mobile assistive technology on improving the self-perceptions of students with dyslexia in Singapore.* 2022. doi:10.3850/S2345734122000152 | App-based; experimental vs. control. Check whether TTS is the central function |
| Low | Kintonova, A. et al. *Experiment on teaching visually impaired and blind children using a mobile electronic alphabetic braille trainer.* AI Soc. 2024. doi:10.1007/s00146-024-01883-6 | Braille trainer vs. no trainer in blind children. Check whether it is adaptive or AI-assisted |
| Low | Mo, Z. et al. *A pen-shaped visual–tactile sensor system for Braille recognition with multimodal fusion and LLM-enhanced feedback.* IEEE Sens. J. 2026. doi:10.1109/JSEN.2026.3681019 | Braille-recognition learning system with a user study reporting learning outcomes. Check the population. **It illustrates why IEEE Xplore must be searched before claiming an OBR evidence gap** |

**If Flütsch Keravec 2026 went online after 23 July 2026:** add it to the Discussion as post-search evidence. Suggested text for Section 4.2, after the sentence on STT:
> A controlled study of 107 fifth-grade students with dyslexia, published after our search closed, reported the same pattern: texts written with STT were longer and more accurate, but 18 weeks of STT use did not improve handwritten text production [new ref.].

Add the reference to `build/references.py` and cite it in `build/manuscript_source.txt`. The builder renumbers everything automatically.

**If it went online before 23 July 2026 (or any other candidate proves eligible):** screen, extract, and appraise it; add it to `build/data/included_studies.csv` and `effect_direction.csv`; update `prisma_counts.json`; and rebuild (Section 5). All counts, figures, and tables regenerate. The text counts in Sections 3.1–3.6 and the abstract then need a one-time manual update.

### 3.3 Run an update search (strongly recommended)

Not searching ERIC is the omission an education or rehabilitation reviewer is most likely to raise, and IEEE Xplore and ACM matter for the captioning and OBR gap claims. Run these from inception, with **no design filter** (screen designs manually):

- **ERIC (EBSCOhost or ies.ed.gov):** `("assistive technology" OR "text-to-speech" OR "text to speech" OR "speech-to-text" OR "speech to text" OR "speech recognition" OR "voice recognition" OR dictation OR "read aloud" OR "read-aloud" OR "speech synthesis" OR captioning OR captions OR braille) AND (disabilit* OR dyslexi* OR "learning disab*" OR "reading difficult*" OR "writing difficult*" OR "intellectual disab*" OR ADHD OR deaf* OR "hard of hearing" OR "hearing impair*" OR blind* OR "visual impair*") AND (student* OR child* OR adolescen* OR pupil* OR school*)`
- **CINAHL:** the same three blocks, adding the CINAHL headings (MH "Assistive Technology Devices"), (MH "Communication Aids for Disabled") and (MH "Learning Disorders+").
- **IEEE Xplore and ACM Digital Library:** `("automatic speech recognition" OR "real-time captioning" OR "automatic captioning" OR "braille recognition" OR "braille tutor" OR "braille learning") AND (child* OR student* OR school* OR classroom) AND (deaf OR "hard of hearing" OR blind OR "visual impairment" OR disabilit*)`

Report the searches in Table S1 and Section 2.3, update `build/data/prisma_counts.json`, and rebuild. The builder refuses to draw a PRISMA diagram whose arithmetic does not reconcile. The existing search (July 2026) is recent enough, so this update is about coverage, not currency.

### 3.4 Confirm facts that could not be verified from here

1. **PROSPERO timing.** The text says the review was *prospectively* registered. Confirm that the registration date precedes the start of screening. If it does not, change Section 2.1 to "registered in PROSPERO (CRD420261513927) on [date], after screening had begun".
2. **APA PsycInfo host platform** (EBSCOhost, Ovid, or ProQuest): add it to Table S1 (a PRISMA-S item) if it can be recovered.
3. **Design of Svensson et al. 2021 [38].** A 2024 Linnaeus University doctoral thesis on the same Swedish assistive-technology programme (doi:10.15626/lud.536.2024) describes its first study, an AT intervention focused on reading and listening comprehension, as a randomised controlled trial. The review rated [38] as non-randomised with ROBINS-I, so check whether that thesis study is [38] and how allocation was done. Check the allocation method. If allocation was random, re-rate it with RoB 2 and update Table 1, Figure 3 (via `included_studies.csv`), Table S3, Table S5, and the design counts in Section 3.2.
4. **Funder role** (PRISMA item 25). If true, append to the Funding statement: "The funder had no role in the design of the review, the analysis or interpretation of data, the writing of the manuscript, or the decision to publish."
5. **Generative-AI disclosure** (Acknowledgments). MDPI policy requires disclosure of substantive AI use. The drafted text names Claude (Anthropic). Edit the wording as you see fit, and add a version if the submission form asks for one.
6. **Prior-submission sentence in the cover letter.** It is recommended to keep it, because MDPI's system records previous submissions, but it is your decision.
7. **Author contributions.** Consider adding "visualization" and "funding acquisition" if they are accurate. They were not added on your behalf.
8. **Journals with limited indexing.** Three included reports (Bhola 2022, *IJRAH*; Ebajay & Malabo 2026, *PEMJ*; Nuraini Herawati 2022, *J. ICSAR*) appear in journals whose peer-review processes reviewers may question. All three are at high or serious risk of bias and none contributes to the lower-risk synthesis. If you wish, add to Section 4.6, paragraph 2: "Three reports were published in journals with limited indexing; all were at high or serious risk of bias and none contributed to the lower-risk synthesis."
9. **Author-supplied references** marked in `build/references.py` were not independently re-verified. In particular, Millett 2021–2022 has no DOI; confirm the volume and pages.

### 3.5 Submission logistics

- **Template.** The manuscript uses your MDPI template with the *Children* logo removed. Paste it into the official *Healthcare* Word template if you want the journal logo; the editorial office otherwise typesets it.
- **Where to submit.** Choose the section that fits best (the digital health or rehabilitation sections), or the special issue *Assistive Technologies, Robotics, and Automated Machines in the Health Domain: Third Edition* if it is still open.
- **Figures.** Upload Figures 1–4 from `figures/` as separate files. Figure 2 and Figure 4 are the strongest selling points; consider using Figure 2 as the graphical abstract.
- **Suggested reviewers.** MDPI asks for them. Choose them yourselves, and avoid co-authors of included studies and recent collaborators.

---

## 4. Audit checks performed

| Check | Result |
|---|---|
| PRISMA arithmetic (identified − duplicates = screened, and so on, in both arms) | Reconciles; asserted in `make_figures.py` |
| Learner totals | 577 with disability + 93 peers = 670, recomputed from per-study data; per-function 108 / 459 / 10 |
| Design and risk-of-bias counts (2 / 10 / 15; 12 lower / 13 higher / 2 not assessable) | Computed from `included_studies.csv`; they match the text, Table 1, Figure 3, and Table S3 |
| Effect-direction tallies in the abstract and results (5 of 6; 7 of 15; 2 of 3; 1 of 2; 2 of 5) | Computed from `effect_direction.csv` |
| Sensitivity claim: 11 of 12 lower-risk reports are access-only; all favourable learning outcomes come from higher-risk reports | Computed (`summary.json`) |
| Citations: every key cited, every reference cited, numbered by first appearance | Asserted by `numbering.py` (56 references) |
| Same numbering in the text, tables, figures, and supplement | A single mapping (`ref_numbers.json`) is used everywhere |
| Leaked reviewer or revision phrasing, placeholders, template leftovers | None found (scripted scan) |
| Abstract length | 250 words including the section labels |
| Statistical audit script | Two flags were false positives ("p < 0.0001" read as p = .000). The F-test degrees of freedom are as reported in the source studies |
| Causal language | Cautious throughout; the practice steps are labelled as a pragmatic safeguard |
| OOXML schema validation | All four `.docx` files pass |
| Visual render check | All pages inspected; no overflow; landscape tables fit |

## 5. Editing and rebuilding

Everything is generated from `build/`. The text is in `build/manuscript_source.txt` (plain text with light markup), the references in `build/references.py`, and the data in `build/data/`.

```bash
# from the repository root; needs python-docx and matplotlib (pip install python-docx matplotlib)
python3 build/numbering.py            # assigns reference numbers from the manuscript source
python3 build/make_figures.py         # Figures 1-4 + build/data/summary.json (uses the numbering)
python3 build/build_manuscript.py     # 02_Manuscript_Healthcare.docx (also re-runs the numbering)
python3 build/build_supplement.py     # 03_Supplementary_Materials.docx
python3 build/build_checklist_cover.py  # 01 cover letter + 04 PRISMA checklist
```

If citations change, run `make_figures.py` after `numbering.py`, because Figures 3 and 4 print reference numbers.

For small wording changes after submission, editing the `.docx` directly is fine. For any change to studies, counts, or citations, edit the source files and rebuild so the numbers stay consistent everywhere.

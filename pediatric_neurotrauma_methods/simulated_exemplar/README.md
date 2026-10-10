# Simulated teaching exemplar

`Methods_Simulated_Exemplar.docx` gives the Introduction (unchanged) and a fully specified Methods section with no
placeholders. Every participant count, date, criterion and statistic that the study records would normally supply was
generated for educational use.

**These values are fictitious.** They must not be submitted, cited or presented as data from the real study. The page
header of the document says so on every page.

## How the numbers were produced

`build/simulate.py` is a seeded simulation (seed 20260212). It generates a cohort of 450 students in 15 sections, the
allocation search, pilot and baseline knowledge-test item responses, expert content-validity ratings, and rating data.
The rating data cover the monitoring sample, the four-rater common subset, the procedural checklist and the LCJR. Every
reported statistic is computed from those data: the equating coefficients, KR-20, CVI, ICCs with cluster-bootstrap
confidence intervals, REML variance components with generalisability coefficients, and the LCJR correlation. The values
are therefore internally consistent. Running the script reproduces `simulated_values.json`.

A small number of design figures were fixed by hand, not simulated, but chosen to agree with the totals in the original
draft: attendance and the reasons for missing follow-up by arm (they sum to the draft's 8, 7, 4 and 2), map node counts,
the fidelity double-coding table, dates and staff details.

## Rebuild

```bash
cd build
NBOOT=200 python3 simulate.py ../simulated_values.json
python3 fig1_filled.py ../simulated_values.json ../Figure1_participant_flow_simulated.png
python3 build_exemplar.py <original Reviewed_Introduction_and_Methods.docx> ../simulated_values.json \
    ../Figure1_participant_flow_simulated.png ../Methods_Simulated_Exemplar.docx
```

Requires numpy, pandas, scipy, matplotlib and python-docx.

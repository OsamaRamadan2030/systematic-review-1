# Formal design-appropriate appraisal applied to the recorded study information (Table S3 notes; Table S2 extraction).
# RoB 2 domains: D1 randomization (incl. period/carryover for within-participant designs), D2 deviations,
#   D3 missing outcome data, D4 outcome measurement, D5 selection of reported result. L = low, SC = some concerns,
#   H = high, NI = no information. Overall: High if any domain High or >=3 domains SC/NI; Some concerns if any SC/NI; else Low.
#   Reports verified only through limited sources are rated "Insufficient information" overall.
# ROBINS-I domains: confounding, selection, classification, deviations, missing data, measurement, reporting.
# WWC v5.0 single-case design standards: Meets / Meets with reservations / Does not meet / Cannot be determined.
APPRAISAL = {
 # ---------- RoB 2: parallel randomized ----------
 "Ahlgrim-Delzell et al., 2016": ("RoB 2", "D1 SC; D2 L; D3 NI; D4 SC; D5 SC", "High", "Blocked randomization with concealment not reported; attrition not reported; researcher-developed proximal measures with assessor masking not reported; inconsistent ANOVA degrees of freedom, F, and p values."),
 "Bhola, 2022": ("RoB 2", "D1 SC; D2 NI; D3 NI; D4 SC; D5 SC", "High", "Sequence generation and concealment not described; researcher-developed achievement test without reported validation; assistance during testing unclear; no prespecified analysis."),
 "Camardese et al., 2014": ("RoB 2", "D1 SC; D2 SC; D3 NI; D4 SC; D5 H", "High", "Concealment not described; multicomponent e-reader; outcome analysis insufficiently described and no numerical treatment contrast reported."),
 "Staels & Van den Broeck, 2015": ("RoB 2", "D1 SC; D2 L; D3 L; D4 L; D5 SC", "Some concerns", "Allocation sequence and concealment insufficiently documented; computer-scored orthographic-choice outcome; multiple outcomes without a prespecified analysis plan."),
 # ---------- RoB 2: within-participant / crossover ----------
 "Chen et al., 2026": ("RoB 2 (crossover)", "D1 SC; D2 L; D3 L; D4 L; D5 SC", "Some concerns", "Counterbalanced rather than randomized order; complete comprehension data (n = 59); multiple exploratory comparisons."),
 "Dolan et al., 2005": ("RoB 2 (crossover)", "D1 SC; D2 SC; D3 SC; D4 L; D5 L", "High", "Order and form assignment incompletely described; optional TTS use and bundled format changes; analyzed denominator uncertain (10 reported, recruitment description implies 9)."),
 "Frankel & Brownstein, 2016": ("RoB 2 (crossover)", "D1 L; D2 L; D3 L; D4 L; D5 SC", "Some concerns", "Randomized presentation-order versions; analyses did not consistently account for within-person dependence."),
 "Gonzalez, 2014": ("RoB 2 (crossover)", "D1 SC; D2 SC; D3 L; D4 SC; D5 L", "High", "Randomized order with sequence generation unclear; books and media differed between conditions; retelling scored without reported assessor masking (kappa = 0.777)."),
 "Keelor et al., 2020": ("RoB 2 (crossover)", "D1 SC; D2 L; D3 L; D4 SC; D5 H", "High", "Condition order unclear; three questions per condition read aloud by the researcher; internally inconsistent summary statistics."),
 "Kraft, 2023": ("RoB 2 (crossover)", "D1 SC; D2 L; D3 L; D4 SC; D5 L", "Some concerns", "Counterbalanced order and topic; condition-revealing transcription errors may unmask quality raters."),
 "Grunér et al., 2018": ("RoB 2 (crossover)", "D1 SC; D2 NI; D3 NI; D4 NI; D5 NI", "Insufficient information", "Random first-condition assignment stated; carryover control, missing data, and masking could not be assessed from the abstract."),
 "Higgins & Raskind, 2005": ("RoB 2 (crossover)", "D1 NI; D2 NI; D3 NI; D4 NI; D5 NI", "Insufficient information", "Condition order, test equivalence, missing data, and scoring not available from the abstract."),
 "Keelor et al., 2018": ("RoB 2 (crossover)", "D1 NI; D2 NI; D3 NI; D4 NI; D5 NI", "Insufficient information", "Journal methods not accessible; predictor analysis of a linked cohort."),
 "Keelor et al., 2023": ("RoB 2 (crossover)", "D1 SC; D2 NI; D3 NI; D4 NI; D5 NI", "Insufficient information", "Counterbalanced design stated; journal methods and exact estimates not accessible."),
 "MacArthur & Cavalier, 2004": ("RoB 2 (crossover)", "D1 NI; D2 NI; D3 NI; D4 NI; D5 NI", "Insufficient information", "Ordering, masking, reliability, and missing data not available from the abstract."),
 "Silvestri et al., 2022": ("RoB 2 (crossover)", "D1 SC; D2 NI; D3 NI; D4 NI; D5 SC", "Insufficient information", "Counterbalanced design stated; corrigendum altered signs in one table; full corrected results not accessible."),
 # ---------- ROBINS-I ----------
 "Flütsch Keravec et al., 2026": ("ROBINS-I", "Conf Serious; Sel Moderate; Class Low; Dev Moderate; Miss Moderate; Meas Moderate; Rep Moderate", "Serious", "Self-selected groups; 11 exclusions or dropouts and outlier removal; interrater agreement 0.55; prose conflicts with Table 4."),
 "Svensson et al., 2021": ("ROBINS-I", "Conf Moderate; Sel Low; Class Low; Dev Moderate; Miss Serious; Meas Moderate; Rep Moderate", "Serious", "Deterministic balancing rather than randomization; 104 of 149 allocated learners at final assessment; combined TTS/STT training."),
 "Wei, 2024": ("ROBINS-I", "Conf Serious; Sel Moderate; Class Low; Dev Low; Miss Moderate; Meas Low; Rep Moderate", "Serious", "Self-selected TTS use with confounding by indication; endpoint denominators not reported."),
 "Ogut et al., 2025": ("ROBINS-I", "Conf Serious; Sel Moderate; Class Low; Dev Low; Miss Moderate; Meas Low; Rep Low", "Serious", "Self-selected use; inverse-probability weighting and doubly robust adjustment cannot address unmeasured severity or prior skill."),
 "Ebajay & Malabo, 2026": ("ROBINS-I", "Conf Serious; Sel NI; Class Low; Dev NI; Miss NI; Meas Moderate; Rep Serious", "Serious", "Nonequivalent groups; researcher-developed outcome with unclear assistance during testing; inconsistent standard deviations."),
 "Raskind & Higgins, 1999": ("ROBINS-I", "Conf Serious; Sel NI; Class Low; Dev NI; Miss NI; Meas NI; Rep NI", "Serious", "Nonrandom allocation; full methods not accessible."),
 "Higgins & Raskind, 2000": ("ROBINS-I", "Conf Serious; Sel NI; Class Low; Dev NI; Miss NI; Meas NI; Rep Moderate", "Serious", "Continuous-speech cohort added in a later semester; shares 39 participants with Raskind and Higgins (1999)."),
 "Park et al., 2017": ("ROBINS-I", "Conf NI; Sel NI; Class NI; Dev NI; Miss NI; Meas NI; Rep NI", "Insufficient information", "Final journal methods not accessible; allocation described only in a precursor report."),
 # ---------- WWC single-case design standards ----------
 "Almgren Bäck et al., 2024": ("WWC SCD", "Replication: fewer than three distinct intervention onsets; one learner with one usable baseline point", "Does not meet", "Partially staggered multiple baseline."),
 "Cuifolo et al., 2025": ("WWC SCD", "Alternation: three cycles per condition (fewer than four)", "Does not meet", "Brief experimental analysis."),
 "Fälth, Björklund, et al., 2025": ("WWC SCD", "Replication: single A–B transition per learner", "Does not meet", "A–B design."),
 "Fälth, Nilsson, et al., 2025": ("WWC SCD", "Replication: single phase transition per learner", "Does not meet", "Two-condition comparison without replication."),
 "Izzo et al., 2009": ("WWC SCD", "Manipulation: phase changes coincided with curriculum-unit changes; short phases", "Does not meet", "Repeated-phase withdrawal across units."),
 "McCarthy et al., 2016": ("WWC SCD", "Alternation: non-equivalent target sets across conditions; no replicated demonstration", "Does not meet", "Adapted alternating treatments."),
 "Nuraini Herawati et al., 2022": ("WWC SCD", "Replication: A–B–A (two demonstrations); individual trajectories not shown", "Does not meet", "A–B–A design."),
 "Sand et al., 2025": ("WWC SCD", "Replication: single A–B transition; three-point baseline", "Does not meet", "A–B design with maintenance."),
 "Schneider et al., 2013": ("WWC SCD", "Alternation: up to three consecutive sessions in one condition; strategy instruction added in a later phase", "Does not meet", "Multiphase alternating treatments."),
 "Svensson et al., 2026": ("WWC SCD", "Replication: A–B design; fewer than three baseline points for five of eight learners", "Does not meet", "Time-lagged A–B design."),
 "Young et al., 2019": ("WWC SCD", "Replication criterion met (A–B–A–B in four learners); phase lengths and interobserver agreement not recorded", "Cannot be determined", "A–B–A–B withdrawal."),
 "Alqahtani, 2023": ("WWC SCD", "Phase data and agreement not accessible", "Cannot be determined", "Limited source."),
 "Brunow & Cullen, 2021": ("WWC SCD", "Condition sequences and agreement not accessible", "Cannot be determined", "Limited source."),
 "Franklin et al., 2026": ("WWC SCD", "Phase data not accessible", "Cannot be determined", "Limited source."),
 "Garrett et al., 2011": ("WWC SCD", "Journal phase data not accessible (design described in companion dissertation)", "Cannot be determined", "Limited source."),
 "Meyer & Bouck, 2014": ("WWC SCD", "Phase data and agreement not accessible", "Cannot be determined", "Limited source."),
 "Meyer & Bouck, 2017": ("WWC SCD", "Phase data not accessible", "Cannot be determined", "Limited source."),
 "Moorman et al., 2010": ("WWC SCD", "Phase observations not accessible", "Cannot be determined", "Limited source."),
 "Noakes et al., 2019": ("WWC SCD", "Phase data not accessible", "Cannot be determined", "Limited source."),
 "Schmitt et al., 2019": ("WWC SCD", "Phase observations and agreement not accessible", "Cannot be determined", "Limited source."),
 "Silió & Barbetta, 2010": ("WWC SCD", "Phase lengths and agreement not accessible", "Cannot be determined", "Limited source."),
 "Sulaimon & Schaefer, 2023": ("WWC SCD", "Phase lengths and agreement not accessible", "Cannot be determined", "Limited source."),
 "Wood et al., 2020": ("WWC SCD", "Probe data not accessible", "Cannot be determined", "Limited source."),
}
SHORT = {"High": "H", "Some concerns": "SC", "Insufficient information": "NI", "Serious": "Ser", "Does not meet": "DNM", "Cannot be determined": "CBD"}

if __name__ == "__main__":
    from studies import STUDIES
    from collections import Counter
    keys = {s[0] for s in STUDIES}
    assert keys == set(APPRAISAL), (keys ^ set(APPRAISAL))
    print(Counter((v[0].split(' ')[0], v[2]) for v in APPRAISAL.values()))
    low = [k for k, v in APPRAISAL.items() if v[2] in ("Some concerns", "Low", "Meets", "Meets with reservations", "Moderate")]
    print(low)

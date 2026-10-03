# Included reports (n = 47). Derived from Supplementary S2/S3 of the authors' extraction.
# fields: key(citation), year, design_cat, design, n, participants, tech, contrast, cond, phase, source
# design_cat: RG randomized group; NRG nonrandomized group; GA group comparison, allocation unverified;
#             WP within-participant group experiment; SCD single-case design; OBS observational
# tech: TTS, STT, TTS+STT, BRL
# cond: A assisted; U unaided (controlled); P proximal acquisition; X unclear test condition
# phase: 1 main searches; 2 supplementary searches
# source: F full text checked; L limited (abstract, preview, figure or linked primary document)
STUDIES = [
 ("Ahlgrim-Delzell et al., 2016", 2016, "RG", "Randomized trial (blocked by teacher)", "31", "Developmental disabilities, AAC users; K–8", "TTS", "TTS-supported phonics package vs. structured sight-word instruction", "P", 2, "F"),
 ("Almgren Bäck et al., 2024", 2024, "SCD", "Multiple baseline", "8", "Severe reading/writing difficulties", "STT", "STT instruction (TTS for revision) vs. keyboard baseline", "A", 1, "F"),
 ("Alqahtani, 2023", 2023, "SCD", "Multiple baseline + alternating treatments", "3", "Reading difficulties/SLD; grades 3–4", "TTS", "TTS + question generation vs. repeated reading + question generation", "A", 1, "L"),
 ("Bhola, 2022", 2022, "RG", "Randomized pre–post (as reported)", "20", "Dyslexia; 6–12 y", "TTS", "TTS-supported teaching vs. conventional teaching", "X", 1, "F"),
 ("Brunow & Cullen, 2021", 2021, "SCD", "Alternating treatments", "4", "Learning disabilities; 16–17 y", "TTS", "TTS vs. human reader", "A", 1, "L"),
 ("Camardese et al., 2014", 2014, "RG", "Randomized group comparison", "60", "IEP reading goals; grades 5–8", "TTS", "E-reader with TTS, font and dictionary vs. print", "X", 2, "F"),
 ("Chen et al., 2026", 2026, "WP", "Counterbalanced mixed-factorial experiment", "59 (eye tracking 47)", "Dyslexia, ADHD, typical readers; junior high", "TTS", "TTS vs. silent reading", "A", 1, "F"),
 ("Cuifolo et al., 2025", 2025, "SCD", "Brief experimental analysis", "1", "Traumatic brain injury; high school", "STT", "STT ± graphic organizer vs. handwriting ± organizer", "A", 2, "L"),
 ("Dolan et al., 2005", 2005, "WP", "Counterbalanced crossover", "10 (as reported)", "Learning disabilities (IEP); grades 11–12", "TTS", "Computer-based test with TTS vs. paper test", "A", 2, "F"),
 ("Ebajay & Malabo, 2026", 2026, "NRG", "Nonequivalent matched groups, pre–post", "20", "Specific learning disabilities; grades 1–5", "TTS", "TTS-assisted mathematics instruction vs. conventional", "X", 1, "L"),
 ("Fälth, Björklund, et al., 2025", 2025, "SCD", "A–B design", "7", "Mild intellectual disability; 10–13 y", "STT", "STT + writing instruction vs. keyboard baseline", "A", 1, "F"),
 ("Fälth, Nilsson, et al., 2025", 2025, "SCD", "Two-condition comparison", "5", "Mild intellectual disability", "TTS", "Listening with TTS vs. independent reading", "A", 1, "F"),
 ("Flütsch Keravec et al., 2026", 2026, "NRG", "Nonrandomized three-group pre–post + paired modality comparison", "107 analyzed", "Dyslexia; grade 5", "STT", "STT + writing instruction vs. handwriting + instruction vs. usual instruction", "U", 2, "F"),
 ("Frankel & Brownstein, 2016", 2016, "WP", "Within-participant, randomized order", "22", "Blindness or low vision; grades 8–12", "TTS", "Alternative synthetic math-speech configurations", "A", 2, "F"),
 ("Franklin et al., 2026", 2026, "SCD", "Alternating treatments", "3", "Cerebral palsy; adolescents", "STT", "STT vs. handwriting", "A", 2, "L"),
 ("Garrett et al., 2011", 2011, "SCD", "Alternating treatments", "5 (thesis)", "Physical disabilities; grades 9–12", "STT", "STT vs. word processing", "A", 2, "L"),
 ("Gonzalez, 2014", 2014, "WP", "Within-participant, randomized order", "17", "Reading disabilities (IEP); grades 3–4", "TTS", "Full-text TTS vs. print vs. selective vocabulary support", "A", 2, "F"),
 ("Grunér et al., 2018", 2018, "WP", "Randomized two-period crossover", "49", "Reading disability; grades 3–9", "TTS", "TTS vs. independent reading", "A", 1, "L"),
 ("Higgins & Raskind, 2000", 2000, "NRG", "Nonrandomized three-group comparison", "52 (39 shared)", "Learning disabilities; 9–18 y", "STT", "Continuous vs. discrete STT vs. computer instruction", "U", 1, "L"),
 ("Higgins & Raskind, 2005", 2005, "WP", "Paired aided vs. unaided comparison", "30", "Reading disabilities; 10–18 y", "TTS", "Reading pen (OCR + speech) vs. unaided reading", "A", 2, "L"),
 ("Izzo et al., 2009", 2009, "SCD", "Repeated-phase withdrawal", "7 analyzed (9 enrolled)", "Mixed disabilities; grades 9–12", "TTS", "TTS vs. same curriculum without TTS", "A", 2, "F"),
 ("Keelor et al., 2018", 2018, "WP", "Five-condition experiment; predictor analysis", "29 (shared cohort)", "Reading difficulties; 8–12 y", "TTS", "TTS ± highlighting vs. silent, oral, listen-only", "A", 2, "L"),
 ("Keelor et al., 2020", 2020, "WP", "Six-condition comparison", "10", "Reading difficulty; 8–11 y", "TTS", "TTS (± highlighting, two rates) vs. silent/oral reading, audio only", "A", 2, "F"),
 ("Keelor et al., 2023", 2023, "WP", "Counterbalanced five-condition experiment", "29", "Reading and language difficulties; 8–12 y", "TTS", "TTS ± highlighting vs. silent, oral, listen-only", "A", 1, "L"),
 ("Kraft, 2023", 2023, "WP", "Counterbalanced within-participant", "16 eligible (of 28)", "Reading/writing difficulties; 10–13 y", "STT", "STT vs. keyboarding", "A", 1, "F"),
 ("MacArthur & Cavalier, 2004", 2004, "WP", "Counterbalanced within-participant", "21 eligible (of 31)", "Learning disabilities; high school", "STT", "STT vs. handwriting vs. human scribe", "A", 1, "L"),
 ("McCarthy et al., 2016", 2016, "SCD", "Adapted alternating treatments", "10", "Visual impairment, Braille learners; 4 y 11 m–14 y 11 m", "BRL", "Adaptive Braille tutor + teacher vs. teacher only", "P", 1, "F"),
 ("Meyer & Bouck, 2014", 2014, "SCD", "Multiple baseline", "3", "Reading disabilities; junior high", "TTS", "TTS vs. unsupported reading", "A", 1, "L"),
 ("Meyer & Bouck, 2017", 2017, "SCD", "Alternating treatments", "4", "Reading learning disabilities; secondary", "TTS", "TTS vs. live read-aloud vs. independent reading", "A", 1, "L"),
 ("Moorman et al., 2010", 2010, "SCD", "A–B–A–B withdrawal", "2", "Specific learning disabilities; high school", "TTS", "TTS vs. unsupported reading", "A", 1, "L"),
 ("Noakes et al., 2019", 2019, "SCD", "Single-case comparison", "3", "Traumatic brain injury; grades 4–9", "STT", "STT vs. handwriting", "A", 2, "L"),
 ("Nuraini Herawati et al., 2022", 2022, "SCD", "A–B–A design", "2", "ADHD; grade 2", "TTS", "TTS-supported e-learning vs. baseline", "X", 1, "F"),
 ("Ogut et al., 2025", 2025, "OBS", "Observational assessment data (NAEP 2017)", "≈2790", "Students with disabilities; grade 8", "TTS", "TTS use vs. nonuse during mathematics assessment", "A", 2, "F"),
 ("Park et al., 2017", 2017, "GA", "Comparative group study (allocation details unverified)", "164", "Below reading threshold; grade 9", "TTS", "TTS software (about 10 weeks) vs. control", "U", 2, "L"),
 ("Raskind & Higgins, 1999", 1999, "NRG", "Nonrandomized controlled pre–post", "39", "Learning disabilities; 9–18 y", "STT", "STT writing practice vs. computer instruction", "U", 1, "L"),
 ("Sand et al., 2025", 2025, "SCD", "A–B design with maintenance", "4", "Mild intellectual disability; 10–13 y", "STT", "STT intervention vs. baseline", "A", 1, "F"),
 ("Schmitt et al., 2019", 2019, "SCD", "Adapted alternating treatments", "4", "Reading learning disabilities; middle school", "TTS", "Continuous TTS vs. reading pen vs. silent reading", "A", 1, "L"),
 ("Schneider et al., 2013", 2013, "SCD", "Multiphase alternating treatments", "4", "Asperger syndrome; grades 4–6", "STT", "STT vs. handwriting vs. keyboarding (± strategy instruction)", "A", 2, "F"),
 ("Silió & Barbetta, 2010", 2010, "SCD", "Multiple baseline", "6", "Specific learning disabilities; grade 5", "TTS", "TTS and/or word prediction vs. word-processing baseline", "A", 2, "L"),
 ("Silvestri et al., 2022", 2022, "WP", "Counterbalanced within-participant", "94", "Reading difficulties; grade 8", "TTS", "Reading with vs. without TTS", "A", 1, "L"),
 ("Staels & Van den Broeck, 2015", 2015, "RG", "Randomized 2 × 2 factorial", "65", "Dyslexia or reading difficulty below threshold; grades 4–5", "TTS", "TTS vs. independent silent reading", "U", 2, "F"),
 ("Sulaimon & Schaefer, 2023", 2023, "SCD", "A–B–A–B withdrawal", "2", "Learning disabilities; grade 4", "TTS", "TTS vs. unsupported reading", "A", 1, "L"),
 ("Svensson et al., 2021", 2021, "NRG", "Nonrandomized controlled longitudinal", "149", "Severe reading/writing difficulties; grades 4, 8, and upper secondary", "TTS+STT", "TTS/STT application training vs. usual support", "U", 1, "F"),
 ("Svensson et al., 2026", 2026, "SCD", "Time-lagged A–B with follow-up", "8", "Mild intellectual disability; 11–14 y", "TTS", "TTS listening vs. independent reading", "A", 1, "F"),
 ("Wei, 2024", 2024, "OBS", "Observational assessment data (NAEP 2017)", "≈2750", "Students with disabilities; grade 8", "TTS", "TTS use vs. nonuse during mathematics assessment", "A", 2, "F"),
 ("Wood et al., 2020", 2020, "SCD", "Multiple probe", "3", "Moderate intellectual disability; elementary", "TTS", "TTS e-text + systematic instruction vs. baseline", "P", 2, "L"),
 ("Young et al., 2019", 2019, "SCD", "A–B–A–B withdrawal", "4", "Learning disabilities; secondary", "TTS", "TTS vs. unsupported reading", "A", 1, "F"),
]

if __name__ == "__main__":
    from collections import Counter
    print(len(STUDIES))
    for i, name in [(2,"design"),(6,"tech"),(8,"cond"),(9,"phase"),(10,"source")]:
        print(name, Counter(s[i] for s in STUDIES))
    print("since2020", sum(s[1] >= 2020 for s in STUDIES), "years", min(s[1] for s in STUDIES), max(s[1] for s in STUDIES))
    print("phase2 source", Counter(s[10] for s in STUDIES if s[9] == 2))

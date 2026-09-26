# Speech and Braille technologies systematic review: Healthcare (MDPI) submission package

**Access or Learning? A Systematic Review of Speech and Braille Assistive Technologies for Children and Adolescents with Disabilities**

Rebuilt after a desk rejection at *Children* (MDPI) and prepared for submission to *Healthcare* (MDPI).

**Start here:**
1. [`docs/SUBMISSION_GUIDE.md`](docs/SUBMISSION_GUIDE.md): what to upload, in what order, and what to enter in each form field.
2. [`docs/Final_Audit_Report.md`](docs/Final_Audit_Report.md): what was wrong, what was changed, the four facts to confirm before uploading, and optional strengthening steps.

## Contents

| Folder | Contents |
|---|---|
| `submission_healthcare/` | Upload files only: cover letter, manuscript, supplementary materials, PRISMA 2020 checklist, and `figures/` (Figures 1–4 as 600-dpi PNG and PDF, plus the graphical abstract) |
| `docs/` | Submission guide and audit report (for the authors; not for upload) |
| `original_children_submission/` | The four files submitted to *Children*, kept for reference |
| `build/` | Single source of truth and build scripts: manuscript text (`manuscript_source.txt`), references (`references.py`), study data (`data/`), and scripts that generate every figure, table, and `.docx` |

## Rebuild

```bash
pip install python-docx matplotlib
python3 build/numbering.py
python3 build/make_figures.py
python3 build/build_manuscript.py
python3 build/build_supplement.py
python3 build/build_checklist_cover.py
```

All counts in the text, figures, and tables are computed from `build/data/`. Reference numbers are assigned in order of
first citation and shared by every document.

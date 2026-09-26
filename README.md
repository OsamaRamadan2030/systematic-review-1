# Speech and Braille technologies systematic review: Healthcare (MDPI) submission package

Rebuilt after a desk rejection at *Children* (MDPI) and prepared for submission to *Healthcare* (MDPI).

**Start here:** [`submission_healthcare/Final_Audit_Report.md`](submission_healthcare/Final_Audit_Report.md). It explains
what was wrong, what was changed, and the items the authors must complete before submitting.

## Contents

| Folder | Contents |
|---|---|
| `submission_healthcare/` | Files to upload: cover letter, manuscript, supplementary materials, PRISMA 2020 checklist, figures (PNG 600 dpi and PDF), and the audit report |
| `original_children_submission/` | The four files submitted to *Children*, kept for reference |
| `build/` | Single source of truth and build scripts: manuscript text (`manuscript_source.txt`), references (`references.py`), study data (`data/`), and scripts that generate every figure, table and `.docx` |

## Rebuild

```bash
pip install python-docx matplotlib
python3 build/numbering.py
python3 build/make_figures.py
python3 build/build_manuscript.py
python3 build/build_supplement.py
python3 build/build_checklist_cover.py
```

All counts in the text, figures and tables are computed from `build/data/`. Reference numbers are assigned in order of
first citation and shared by every document.

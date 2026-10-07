# Word formatting prompt

Paste the prompt below into Copilot in Microsoft Word (Home → Copilot, or the Copilot icon in the margin) with the
document open. It formats the document only and does not change any wording. The specification follows the MDPI
house style used by the files in `submission_healthcare/`: Palatino Linotype on A4.

Copilot handles shorter requests more reliably than long ones. If it applies only part of the prompt, run the
follow-up prompts at the end of this file one at a time.

---

## Main prompt (copy everything inside the box)

```text
You are a professional academic copy editor. Format this entire document so that it looks professional, clean,
and uniformly formatted, ready for submission to an MDPI journal (Healthcare). Apply the rules below to every page.

STRICT RULE: Change formatting only. Do NOT rewrite, shorten, add, delete, translate, or reorder any text. Do NOT
change any numbers, statistics, citation numbers in square brackets such as [12] or [3–5], table contents, figure
contents, or references. Do NOT remove tables, figures, captions, footnotes, or comments.

1. PAGE SETUP
- Paper size A4 (21.0 × 29.7 cm), portrait. Margins: 2.0 cm on all sides.
- Page numbers at the bottom centre, in the body font at 9 pt.
- Wide tables only may sit in a landscape section; every other page stays portrait.

2. FONT AND BODY TEXT
- Use Palatino Linotype everywhere: body text, headings, tables, captions, and references. Remove every other font.
- Body text: 10 pt, black, justified, single line spacing (1.0), 0 pt before and 6 pt after each paragraph,
  first-line indent 0.75 cm. No first-line indent on the first paragraph after a heading.
- No blank empty paragraphs used as spacing. Remove double spaces between words and after full stops.
- Apply all of these through Word Styles (Normal, Heading 1–3, Caption, and so on), not manual formatting, so the
  document stays consistent.

3. TITLE PAGE
- Article type ("Systematic Review"): 10 pt, italic, left-aligned.
- Title: 18 pt, bold, left-aligned, 12 pt after.
- Author names: 10 pt, bold. Affiliations: 8 pt, regular, with superscript numbers matching the authors.
- Correspondence line and e-mail addresses: 8 pt.
- Abstract heading "Abstract:" in bold, followed by the abstract text in 9 pt, justified, on the same line.
  Inside a structured abstract, make the sub-labels (Background:, Methods:, Results:, Conclusions:) bold.
- "Keywords:" in bold, followed by the keywords at 9 pt, separated by semicolons.

4. HEADINGS (numbered, the same style at every level)
- Heading 1 (e.g., "1. Introduction", "2. Materials and Methods"): 10 pt, bold, left-aligned, 12 pt before, 6 pt after.
- Heading 2 (e.g., "2.1. Eligibility Criteria"): 10 pt, italic, not bold, 6 pt before, 6 pt after.
- Heading 3 (e.g., "2.1.1. Population"): 10 pt, regular, 6 pt before, 3 pt after.
- Use sentence-style numbering "1.", "1.1.", "1.1.1." consistently. Headings are never justified, never underlined,
  never in all capitals, and use "Keep with next" so that no heading is left alone at the bottom of a page.
- Back-matter headings (Supplementary Materials, Author Contributions, Funding, Institutional Review Board Statement,
  Informed Consent Statement, Data Availability Statement, Acknowledgments, Conflicts of Interest, Abbreviations,
  References) are bold, 9 pt, and unnumbered. Their text is 9 pt.

5. TABLES (the same design for every table)
- Three-line academic table: a 1 pt black line above the header row, a 0.5 pt line below the header row, and a
  1 pt line below the last row. No vertical lines and no other horizontal lines. No shading or colour.
- Table text: 8 pt, single spacing, 0 pt before and after. Header row bold. Header row repeats on each new page.
- Text columns are left-aligned. Numeric columns are centred. Vertical alignment is centred.
- Every table fits the page width (AutoFit to window) and is centred on the page. Rows may not break across pages.
- Table notes and abbreviation lines directly below a table: 8 pt, left-aligned.

6. FIGURES AND CAPTIONS
- Figures centred, in line with text, never wider than the text area, with 6 pt before and after.
- Table captions go ABOVE the table. Figure captions go BELOW the figure.
- Captions: 9 pt, left-aligned. The label is bold followed by a full stop ("Table 1." / "Figure 1."), and the caption
  text after it is regular. Keep each caption on the same page as its table or figure.
- Make sure the numbering of tables and figures runs in order (Table 1, 2, 3 …; Figure 1, 2, 3 …).

7. LISTS
- Use the same bullet symbol (•) and the same indentation (left 0.75 cm, hanging 0.5 cm) for every bulleted list.
- Numbered lists use "1." style with the same indentation. List items are 10 pt with 3 pt after.

8. CITATIONS, SYMBOLS, AND TYPOGRAPHY
- In-text citations stay in square brackets before the punctuation, e.g., "... reading outcomes [12,15]." Do not
  turn them into superscripts and do not change their numbers.
- Use an en dash (–) for number ranges (e.g., 2015–2024, [3–5]) and a non-breaking space between a number and its
  unit. Use the same quotation marks (“ ”) throughout.
- Italicise Latin terms and statistical symbols consistently: et al., p, n, N, I², k.
- Remove any highlighting, coloured text, and leftover track-change formatting marks from the main text.

9. REFERENCES
- Reference list: 9 pt, left-aligned (not justified), numbered "1." "2." … in citation order, with a hanging indent
  of 0.75 cm and 0 pt before, 3 pt after.
- Every reference uses the same layout: Authors. Title. Journal Abbrev. Year, Volume, Pages. DOI. Journal names in
  italic, year in bold, volume in italic. Do not change the content of any reference.

10. FINAL CHECK
- Make sure the same style is applied to every paragraph of the same type, from the first page to the last.
- When you finish, give me a short list of anything you could not apply automatically, or anything that looks
  inconsistent and needs my manual check (for example, a table that is too wide or a heading with the wrong number).
```

---

## Follow-up prompts (use them one at a time if the main prompt is only partly applied)

1. **Font and body:** `Change every paragraph in this document to Palatino Linotype. Body text 10 pt, justified, single line spacing, 6 pt after, first-line indent 0.75 cm. Do not change any wording.`
2. **Headings:** `Format all numbered headings uniformly: level 1 (e.g., "1. Introduction") 10 pt bold; level 2 (e.g., "2.1.") 10 pt italic; level 3 (e.g., "2.1.1.") 10 pt regular. Apply them as Heading 1, Heading 2, and Heading 3 styles, with Keep with next. Do not change the text.`
3. **Tables:** `Format every table as a three-line academic table: 1 pt top border, 0.5 pt border under the header row, 1 pt bottom border, no vertical lines, no shading, 8 pt Palatino Linotype, bold header row that repeats on each page, fitted to the page width. Do not change any cell content.`
4. **Captions:** `Make all table captions sit above their tables and all figure captions below their figures. Captions 9 pt, with the label in bold ("Table 1." / "Figure 1.") and the rest in regular text. Do not change the caption wording.`
5. **References:** `Format the reference list as 9 pt Palatino Linotype, left-aligned, numbered in order, with a 0.75 cm hanging indent and 3 pt after each entry. Do not change any reference content.`
6. **Clean-up:** `Remove double spaces, empty paragraphs used for spacing, highlighting, and coloured text across the document without changing any wording. Then list any paragraphs whose formatting still differs from others of the same type.`

## If Copilot is not available

Apply the same specification by hand through **Home → Styles**: right-click a style (Normal, Heading 1, Heading 2,
Heading 3, Caption) → **Modify**, and set the font, size, and spacing above. Then use **Select → Select All Text With
Similar Formatting** to apply each style to all matching paragraphs at once. For tables, design one table and save
its look with **Table Design → New Table Style**, then apply that style to every table.

"""Check every double-quoted passage in the response against its source text.

Usage:
    python3 check_quotes.py <published_article.txt> <commentary.txt>

The article text is a pdftotext extraction of the published PDF; the commentary text
is a pandoc extraction of the commentary .docx. Quotations from external sources
(Blumer, Tanner) are listed separately and must be checked against those works.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
EXTERNAL = {
    'directions along which to look': 'Blumer 1954, p. 7',
    'prescriptions of what to see': 'Blumer 1954, p. 7',
    'rests to some degree on knowing the patient': 'Tanner 2006 (abstract, conclusion 2)',
}


def norm(t):
    t = t.replace('­', '').replace('‘', "'").replace('’', "'")
    t = t.replace('“', '"').replace('”', '"')
    t = re.sub(r'(\w)-\s+(\w)', r'\1-\2', t)  # PDF line-break hyphenation
    return re.sub(r'\s+', ' ', t).lower().strip()


def main(article_path, commentary_path):
    article = norm(Path(article_path).read_text(encoding='utf-8'))
    commentary = norm(Path(commentary_path).read_text(encoding='utf-8'))
    body = json.loads(subprocess.check_output(
        ['node', '-e', "const R=require('./response_text.js');"
         "console.log(JSON.stringify(R.BODY.flatMap(([h,ps])=>ps)))"], cwd=HERE))
    text = re.sub(r'\{[0-9,]+\}', '', ' '.join(body))
    quotes = re.findall('“(.*?)”', text)
    failures = 0
    for q in quotes:
        nq = norm(q).rstrip('.,;:')
        if nq in EXTERNAL:
            print(f'EXTERNAL  {q}  [{EXTERNAL[nq]}]')
        elif nq in article:
            print(f'ARTICLE   {q}')
        elif nq in commentary:
            print(f'COMMENT   {q}')
        else:
            failures += 1
            print(f'NOT FOUND {q}')
    print(f'\n{len(quotes)} quotations checked; {failures} not found in either source.')
    return failures


if __name__ == '__main__':
    sys.exit(1 if main(*sys.argv[1:3]) else 0)

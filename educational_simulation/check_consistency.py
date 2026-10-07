"""Cross-file consistency checks for the simulated Findings and supplementary files."""
import re, pathlib
root = pathlib.Path(__file__).parent
F = (root / 'Findings_Mobilisation_Emergency_Caesarean_SIMULATED.md').read_text()
S = {p.name: p.read_text() for p in (root / 'supplementary').glob('*.md')}
S3 = S['Supplementary_Table_S3_Site_Profiles.md']; S4 = S['Supplementary_File_S4_Analytic_Trace.md']
ok = True
def check(cond, msg):
    global ok
    print(('PASS ' if cond else 'FAIL ') + msg); ok &= bool(cond)

# 1. every participant quoted in Findings
quoted = set(re.findall(r'^> ".*?\(([WNP]\d{2}),', F, re.M))
expected = {f'W{i:02d}' for i in range(1, 19)} | {f'N{i:02d}' for i in range(1, 13)} | {f'P{i:02d}' for i in range(1, 8)}
check(quoted == expected, f'all 37 participants quoted in Findings ({len(quoted)} found)')
n_quotes = len(re.findall(r'^> ".*\([WNP]\d{2},', F, re.M))
check(n_quotes == 46, f'46 quotations in Findings ({n_quotes} found)')

# 2. descriptors consistent per participant and with Table 3
desc = {}
for code, d in re.findall(r'^> ".*" \(([WNP]\d{2}), ([^)]*)\)', F, re.M):
    desc.setdefault(code, set()).add(d)
check(all(len(v) == 1 for v in desc.values()), 'each participant has one consistent descriptor')
w = {c: next(iter(v)) for c, v in desc.items() if c[0] == 'W'}
check(sum('primiparous' in d for d in w.values()) == 8, 'women: 8 primiparous / 10 multiparous (Table 3)')
cats = [d.split('category ')[1] for d in w.values()]
check((cats.count('1'), cats.count('2'), cats.count('3')) == (3, 9, 6), 'women: urgency 3 / 9 / 6 (Table 3)')
n = {c: next(iter(v)) for c, v in desc.items() if c[0] == 'N'}
check([sum(b in d for d in n.values()) for b in ('<5', '5–10', '>10')] == [4, 6, 2], 'nurses: experience 4 / 6 / 2 (Table 3)')
p = {c: next(iter(v)) for c, v in desc.items() if c[0] == 'P'}
check([sum(b in d for d in p.values()) for b in ('<5', '5–10', '>10')] == [3, 3, 1], 'physiotherapists: experience 3 / 3 / 1 (Table 3)')

# 3. Arabic-interview markers: all women; 4 nurses; 5 physiotherapists
ar = set(re.findall(r'\(([WNP]\d{2}), [^)]*\) \*\(Ar\)\*', F))
check({c for c in ar if c[0] == 'W'} == {c for c in expected if c[0] == 'W'}, 'all women quoted as translated (18 Arabic interviews)')
check(len({c for c in ar if c[0] == 'N'}) == 4, 'four nurses marked (Ar) (Section 2.5)')
check(len({c for c in ar if c[0] == 'P'}) == 5, 'five physiotherapists marked (Ar) (Section 2.5)')

# 4. Table 5 sums
t5 = re.findall(r'^\| (Attempted|Adapted|Paused|Deferred)[^|]*\| (\d+) \| (\d+) \| (\d+) \|', F, re.M)
cols = [sum(int(r[i]) for r in t5) for i in (1, 2, 3)]
check(cols == [71, 63, 30], f'Table 5 columns sum to 71 / 63 / 30 ({cols})')

# 5. S4.7 episode counts per account
for grp, total in (('Women', 71), ('Maternity nurses', 63), ('Physiotherapists', 30)):
    row = re.search(rf'^\| {grp} \| (.*?) \| (\d+) \|', S4, re.M)
    vals = [int(x) for x in re.findall(r'[WNP]\d{2} (\d+)', row.group(1))]
    check(sum(vals) == total == int(row.group(2)), f'S4.7 {grp}: {len(vals)} accounts sum to {sum(vals)}')
check(re.search(r'W10 5;', S4) and re.search(r'N01 6;', S4), 'S4 worked examples match S4.7 (W10 5 episodes, N01 6)')

# 6. S4 extracts contain the published quotations
for q in ["I wasn't afraid of walking. I was afraid of the blood. When I sat up I felt it come out, a lot, and nobody had told me if that is normal.",
          "In the end I started telling them myself: yesterday I walked to the door, I got dizzy at the bathroom, give me the pain medicine first.",
          'I didn\'t write "refused". I wrote "dizzy on standing, BP [low], retry after fluids and analgesia".',
          "The second time we did it slowly, longer sitting first, and she walked to the bathroom."]:
    check(q in S4, f'S4 extract contains published quotation: "{q[:45]}..."')

# 7. S3 site recruitment sums to Table 2
for label, exp in (('Physiotherapists eligible / interested / interviewed', (9, 8, 7)),
                   ('Women approached / interviewed', (27, 18)), ('Nurses expressing interest / interviewed', (16, 12))):
    row = re.search(rf'^\| \*\*{re.escape(label)}\*\* \| (.*) \|$', S3, re.M).group(1)
    cells = [[int(x) for x in c.split('/')] for c in row.split(' | ')]
    sums = tuple(sum(c[i] for c in cells) for i in range(len(exp)))
    check(sums == exp, f'S3 {label}: {sums}')
check([int(c.split('/')[-1]) for c in re.search(r'Women approached / interviewed\*\* \| (.*) \|', S3).group(1).split(' | ')] == [7, 6, 5],
      'S3 women interviewed by hospital = Table 2 (7 / 6 / 5)')

# 8. COREQ has all 32 items
coreq = S['Supplementary_File_S2_COREQ_Checklist.md']
items = sorted(int(x) for x in re.findall(r'^\| (\d+) \|', coreq, re.M))
check(items == list(range(1, 33)), f'COREQ lists items 1-32 ({len(items)} found)')
print('\nALL CHECKS PASSED' if ok else '\nSOME CHECKS FAILED')

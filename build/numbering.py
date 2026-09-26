"""Assign reference numbers in order of first citation in manuscript_source.txt.

Writes build/data/ref_numbers.json ({key: number}). Tables and figures that cite
included reports read this file, so every document uses the same numbers.
"""
import json
import os
import re

from references import INCLUDED_ORDER, REFS

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "manuscript_source.txt")
OUT = os.path.join(HERE, "data", "ref_numbers.json")

CITE_RE = re.compile(r"\[@([^\]]+)\]")


def cite_keys(group):
    keys = []
    for k in group.split(";"):
        k = k.strip().lstrip("@")
        if k == "INCLUDED":
            keys.extend(INCLUDED_ORDER)
        else:
            keys.append(k)
    return keys


def assign():
    text = open(SRC, encoding="utf-8").read()
    text = "\n".join(l for l in text.splitlines() if not l.startswith("%"))
    order = {}
    for m in CITE_RE.finditer(text):
        for k in cite_keys(m.group(1)):
            if k not in REFS:
                raise KeyError(f"Unknown reference key: {k}")
            if k not in order:
                order[k] = len(order) + 1
    unused = sorted(set(REFS) - set(order))
    if unused:
        raise ValueError(f"References never cited: {unused}")
    return order


if __name__ == "__main__":
    nums = assign()
    with open(OUT, "w") as fh:
        json.dump(nums, fh, indent=1)
    print(len(nums), "references;", "included:", nums["s23"], "-", max(nums[k] for k in INCLUDED_ORDER))

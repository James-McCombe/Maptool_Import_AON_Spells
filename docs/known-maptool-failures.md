# Known MapTool Failures

## Standard JSON syntax fails

Bad:
[h: obj = {"Name":"Harpy"}]

Good:
[h: obj = json.set("", "Name", "Harpy")]

## Array literals are unsafe

Bad:
[h: Traits = ["beast", "humanoid"]]

Good:
[h: Traits = json.append("", "beast", "humanoid")]

## Macro nesting gets fragile

Avoid nested if/code blocks deeper than 2 levels.

Split logic into helper macros.

## Missing JSON fields

Always check field existence before reading.

Use json.contains() where possible.

## Large JSON should live in token properties

Do not hide large source JSON in data macros.

## Macro files are not documentation files

Files ending in `.mts` should contain only importable macro body content.

Do not add Markdown headings, code fences, prose, or trailing instructions to `.mts` files.

Keep explanations in `/docs`.

## Working examples can be partial

`/examples/existing-importer-working.mts` demonstrates AoN REST.get lookup and MapTool JSON handling.

Do not assume it demonstrates token creation unless token creation code is present in that file.

## AoN index IDs are lowercase

Use lowercase full index IDs for shared lookup macros.

Good:
`creature-3046`

Bad:
`Creature-3046`

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

## getTime is not a MapTool function

Bad:
[h: importDate = getTime()]

Good:
[h: cInfo = getInfo("client")]
[h: importDate = json.get(cInfo,"timeDate")]

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

## createToken needs tokenImage

Do not call `createToken()` with only a token name.

Build its data object with `json.set()` and include at least `name` and `tokenImage`.

Use the image from `baseNPCToken` for starter NPC imports.

For starter creature imports, set visible `name` to `Creature` and `gmName` to the AoN creature name.

Store raw AoN JSON in `AON_JSON_RAW`; do not print it to chat.

Set imported creature tokens to the `NPC` property type before setting framework properties.

Check AoN JSON keys with `json.contains()` before setting each NPC property.

When converting the AoN `trait` array to the framework `type` property, join values with ` | `.

Avoid wrapping trait conversion in nested `if/code` blocks.

Use simple guards, set `traitCount` to 0 when missing, and run a single `for/code` loop.

For `sense_markdown`, extract display labels from inside square brackets and store them with a leading pipe, such as `| Darkvision`.

Keep token creation and property setting in separate macros once a test macro grows beyond the smoke-test stage.

Do not pass external image URLs directly to `createToken()`.

`createAsset(name, URL)` may reject AoN image URLs even when the URL appears valid.

Use `baseNPCToken` as the automatic fallback image and output the AoN image URL for manual token creation.

Store the AoN image URL in `AON_IMG_URL` when it is available.

## Anchor tokens may be larger than 1x1

Do not assume `Lib:AON` occupies only one cell when placing generated tokens nearby.

Find the first empty cell to the right of the full token footprint.

Use cell coordinates for placement math.

Good:
`getTokenX(0)`

Bad:
Converting pixel widths into cells by assuming a grid size.

## getTokens conditions should be built, not typed

Use `json.set()` and `json.append()` when building `getTokens()` conditions.

Do not hand-write condition JSON unless there is no MapTool-safe alternative.

## GM-only clean output

Use combined roll options when generated macros should show clean text only to the GM.

Good:
[g,r: 1d20 + Perception]

Bad:
[g: 1d20 + Perception]

The `g` option restricts visibility to GMs.

The `r` option renders plain output without the extra roll display.

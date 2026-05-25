# Codex Rules for This Repo

This repo uses MapTool MTScript.

Do not write JavaScript, TypeScript, Lua, Python, or standard JSON syntax unless explicitly requested.

## Hard Rule: MTScript Only

This repository is MapTool MTScript.

Do not refactor code into:
- JavaScript
- TypeScript
- Lua
- Python
- standard JSON
- browser DOM code
- Node-style modules
- async/await
- fetch()
- classes

If existing code looks strange, preserve it unless asked.

MapTool syntax is the target runtime.
Correct MTScript is better than cleaner-looking non-MTScript.

## File Rules

Files ending in `.mts` are MapTool macro bodies only.

Do not add:
- Markdown
- explanations
- comments outside valid MTScript comments
- code fences
- headings
- prose
- JSON examples outside strings
- “Here is the code”
- trailing notes

Output only valid MTScript content for `.mts` files.

## Macro Import Safety

MapTool macros break if extra text is pasted into the macro body.

When editing `.mts` files:

- Preserve macro-only content.
- Do not wrap code in ``` fences.
- Do not add commentary.
- Do not include test instructions inside the file.
- Put explanations in `/docs`, not `.mts`.

## Main Goal

Build a Pathfinder 2E Remastered AoN creature importer.

Day-one scope only:

1. Import creature by AoN creature ID
2. Create a base creature token
3. Save the full AoN JSON object to a token property
4. Set token name from the JSON
5. Set token image from the JSON if available
6. Add a macro that opens the AoN creature page

Do not parse attacks yet.
Do not parse abilities yet.
Do not fill all NPC stats yet.
Do not generate combat macros yet.

## Architecture

The importer prepares the token.

The existing PF2E framework runs the token.

Use token properties as the storage layer.

Do not store large raw JSON inside generated macros.

## Required Token Properties

AON_JSON
AON_JSON_RAW
AON_SourceID
AON_Type
AON_ID
AON_URL
AON_IMG_URL
AON_ImportDate
AON_ImporterVersion
AON_ManualReviewNeeded

## Preferred Data Split

AON_JSON stores source metadata and future parsed data.
AON_JSON_RAW stores the raw AoN source object.

Framework NPC properties store playable NPC data.

Future parsed data may be added under AON_JSON.Parsed.

## MapTool Rules

Use MapTool JSON functions:

- json.set()
- json.get()
- json.append()
- json.contains()
- json.type()

Do not use standard object syntax inside executable MTScript.

Traits and arrays must use json.append().

Avoid nested if/code blocks deeper than 2 levels.

Prefer small macros.

Prefer one macro per responsibility.

Check values exist before reading them.

Do not assume AoN JSON fields always exist.

Build `createToken()` input with `json.set()`.
The required starter keys are `name` and `tokenImage`.
Use visible token name `Creature` for starter imports and set `gmName` to the AoN creature name.

Use `getTokens("json", conditions)` with `area.offsets` to find nearby occupied cells.
Build the conditions object with `json.set()` and arrays with `json.append()`.

## Macro Design Rules

Each macro should do one job.

Good:
- AON_ImportCreatureByID
- AON_CreateCreatureToken
- AON_SaveCreatureJSON
- AON_SetCreatureImage
- AON_AddOpenPageMacro
- _SetCreatureProperties

Bad:
- AON_DoEverything

## Refactor Rule

When modifying existing macros:

- Preserve MTScript syntax.
- Make the smallest working change.
- Do not restructure working code unless asked.
- Do not introduce new language features.
- Do not replace REST.get with fetch().
- Do not replace json.set/json.get/json.append with normal JSON.
- Do not replace macro calls with functions.

## Working Examples

Before writing importer code, inspect:

/examples/existing-importer-working.mts

Treat this as the source of truth for:
- REST.get
- AoN fetch handling
- MapTool-compatible JSON usage

Use existing framework macros for token creation style until a dedicated creature-token example exists.

The current AoN index lookup pattern expects full lowercase AoN index IDs such as `armor-3`.
Creature import by numeric page ID must normalize that input to lowercase `creature-####` before calling shared lookup macros.

Do not replace working patterns with theoretical alternatives.

## Source Link Macro

Every imported creature token must get an Open AoN Page macro.

The macro should read AON_URL from the token property and open that page.

## MTScript References

Primary references:

- https://wiki.rptools.info/index.php/Introduction_to_Macro_Writing
- https://wiki.rptools.info/index.php/Category:Macro_Function
- https://wiki.rptools.info/index.php/json.set
- https://wiki.rptools.info/index.php/json.get
- https://wiki.rptools.info/index.php/json.append
- https://wiki.rptools.info/index.php/REST.get
- https://wiki.rptools.info/index.php/createMacro
- https://wiki.rptools.info/index.php/setProperty
- https://wiki.rptools.info/index.php/getProperty

Use MTScript-compatible syntax only.

## Build Request Pattern

Importer macros must support two entry modes:

1. Called with macro.args containing a BuildRequest object
2. Called directly with no macro.args

If BuildRequest exists, use it.

If no BuildRequest exists, prompt for required fields and build from scratch.

BuildRequest is intended for future front-end macros that select creatures and call the importer.

Required BuildRequest fields for creature import:

- Type = Creature
- Source = AoN
- AONID
- CreateToken
- SetImage
- AddOpenPageMacro

The importer must normalize numeric creature IDs into lowercase AoN index IDs.

Example:

3046 → creature-3046
Creature-3046 → creature-3046
creature-3046 → creature-3046

## Current Campaign Properties

The following token properties now exist in the PF2E campaign and are safe to populate:

- AON_JSON
- AON_JSON_RAW
- AON_URL
- AON_IMG_URL
- AON_SourceID
- AON_ID
- AON_Type
- AON_Source
- AON_ImportDate
- AON_ImporterVersion
- AON_ManualReviewNeeded

Importer macros should populate these properties during creature import.

AON_JSON_RAW stores the original AoN source object.

AON_JSON stores importer metadata and future parsed data.

Do not remove or rename these properties.

## AON Property Definitions

These token properties must be populated during creature import.

### AON_JSON_RAW

Type:
- JSON OBJECT

Purpose:
- Stores the original raw AoN creature object exactly as retrieved from AoN.

Example:
- Entire creatureData object returned from _GetAonItemByID.

Example value:
{
  "id": "creature-3046",
  "name": "Harpy",
  ...
}

### AON_JSON

Type:
- JSON OBJECT

Purpose:
- Stores importer metadata and future parsed data.

Structure:
{
  "Metadata": {},
  "Parsed": {}
}

Example:
{
  "Metadata": {
    "SourceID": "creature-3046",
    "AONID": "3046",
    "Type": "Creature",
    "Source": "AoN",
    "URL": "https://2e.aonprd.com/Monsters.aspx?ID=3046",
    "ImageURL": "https://2e.aonprd.com/Images/Monsters/Harpy.png",
    "ImporterVersion": "1.00",
    "ManualReviewNeeded": 1
  },
  "Parsed": {}
}

### AON_SourceID

Type:
- STRING

Purpose:
- Canonical lowercase AoN object ID.

Example:
creature-3046

### AON_ID

Type:
- STRING

Purpose:
- Numeric AoN page ID without prefix.

Example:
3046

### AON_Type

Type:
- STRING

Purpose:
- Imported AoN object type.

Example:
Creature

### AON_Source

Type:
- STRING

Purpose:
- Source system identifier.

Example:
AoN

### AON_ImportDate

Type:
- STRING

Purpose:
- Date imported.

Example:
2026-05-25

Use:
[h: cInfo = getInfo("client")]
[h: importDate = json.get(cInfo,"timeDate")]

Do not use `getTime()`.

### AON_ImporterVersion

Type:
- STRING

Purpose:
- Importer version used to build the token.

Example:
1.00

### AON_ManualReviewNeeded

Type:
- NUMBER

Purpose:
- Indicates imported creature should still be reviewed in the framework NPC editor.

Values:
0 = reviewed
1 = review needed

Default:
1

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

Current creature importer scope:

1. Import creature by AoN creature ID
2. Create a base creature token
3. Save the full AoN JSON object to a token property
4. Set token name from the JSON
5. Set token image from the JSON if available
6. Add a macro that opens the AoN creature page
7. Parse creature attacks and abilities into AON_JSON.Parsed
8. Generate lightweight parsed attack wrapper macros that call the framework

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

Most generated output macros should show results to the GM only.
Use combined roll options for clean GM-only output:
[g,r: expression]

Do not use `[g: expression]` when clean plain output is needed.

## Macro Design Rules

Each macro should do one job.

Good:
- ImportCreatureByID
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

## AON_JSON Structure

AON_JSON is the importer-controlled metadata object.

AON_JSON_RAW stores the full raw AoN object.
AON_JSON must NOT store the full raw AoN object.

AON_JSON must use this structure:

{
  "Metadata": {
    "SourceID": "creature-3046",
    "AONID": "3046",
    "Type": "Creature",
    "Source": "AoN",
    "URL": "https://2e.aonprd.com/Monsters.aspx?ID=3046",
    "ImageURL": "https://2e.aonprd.com/path/to/image.png",
    "ImporterVersion": "1.00",
    "ImportDate": "MapTool client timeDate value",
    "ManualReviewNeeded": 1
  },
  "Parsed": {}
}

Field meanings:

- Metadata.SourceID is the lowercase AoN index ID, such as creature-3046.
- Metadata.AONID is the numeric AoN page ID, such as 3046.
- Metadata.Type is the imported object type, currently Creature.
- Metadata.Source is the source system, currently AoN.
- Metadata.URL is the AoN page URL.
- Metadata.ImageURL is the AoN image URL when available, otherwise blank.
- Metadata.ImporterVersion is the importer version string.
- Metadata.ImportDate is the MapTool import date.
- Metadata.ManualReviewNeeded defaults to 1.
- Parsed starts as an empty JSON object and will later hold parsed attacks, abilities, spells, and parser versions.

## Parsed Creature Data Rules

Parsed creature data lives under AON_JSON.Parsed.

Parsed data is importer-controlled derived data.
Do not remove source data from AON_JSON_RAW.
Do not generate framework combat macros while parsing.

### Parsed.Attacks

Parsed.Attacks stores only actual AoN Strike blocks from **Melee** and **Ranged** sections.

Do not put creature abilities such as Hungry Winds, Rapid Strikes, Stench, or Putrid Plague into Parsed.Attacks unless AoN presents them as **Melee** or **Ranged** strike blocks.

Each attack object should preserve source inspection fields and also include framework-shaped fields for future NPCSimpleAttack macro args.

Required framework-shaped attack fields:

- AttackName
- AttackType
- Traits
- AttackModifier
- Damage
- DamageType
- Damage2
- Damage2Type
- Effect
- Action
- ApplyAttackKeyword

AttackName is the strike name, such as jaws, talon, or claw.
AttackType is Melee or Ranged.
Traits is a JSON array of lowercase trait names.
The attack type trait, such as melee or ranged, should be included in Traits.
AttackModifier must be stored as a string.
Action must be stored as a string for framework macro args.
ActionText may preserve the original AoN action text, such as Single Action.
ApplyAttackKeyword defaults to 1 for normal imported strike attacks.

Remove AoN markdown URLs from AttackText.
Keep RawBlock as the original parsed AoN markdown slice.

Damage and Damage2 should contain only damage dice or explicit numeric damage values.
DamageType and Damage2Type should contain the damage type text.
Effect should contain non-damage riders or extra rules text.

Examples:

2d8+4 piercing plus putrid plague:
- Damage = 2d8+4
- DamageType = piercing
- Damage2 = blank
- Damage2Type = blank
- Effect = putrid plague

2d4 fire plus 1 persistent acid damage:
- Damage = 2d4
- DamageType = fire
- Damage2 = 1
- Damage2Type = persistent acid
- Effect = blank

AoN indexed attack metadata such as attack_bonus, attack_bonus_scale_number, strike_damage_average, and strike_damage_scale_number may be stored on the parsed attack object.
If AoN provides a single attack_bonus_scale or attack_bonus_scale_number value, apply it to every parsed attack.

### Parsed.Abilities

Parsed.Abilities stores entries from the AoN creature_ability list.

Creature abilities remain abilities even if they reference Strikes or can later be represented by framework macros.
Hungry Winds, Rapid Strikes, Stench, and Putrid Plague are abilities, not Parsed.Attacks, unless AoN presents them as **Melee** or **Ranged** strike blocks.

Ability parsing should preserve:

- Name
- FeatLevel
- Traits
- Trigger
- Requirements
- Action
- Text
- TraitsText
- DescriptionText
- RawBlock

Name, FeatLevel, Traits, Trigger, Requirements, Action, and Text are shaped for future feat-style framework macro args.
FeatLevel may use the creature level when no ability-specific level exists.
Traits must be a JSON array.
Ability Traits should preserve AoN display casing, such as Air, Concentrate, or Primal.
Action must be stored as a framework action string when possible: 1, 2, 3, R, or F.
ActionText may preserve the original AoN action text.
Text should be the cleaned ability rules text with AoN markdown URLs removed.
TraitsText and DescriptionText should also remove AoN markdown URLs.
RawBlock is the only parsed ability field that should preserve the original AoN markdown URLs.
Trigger and Requirements default to blank until explicit parsing is added.

Do not call feat-style framework macros while parsing abilities.
Generated special ability macros may use Parsed.Abilities entries as Feat@Lib:Pf2 macro args.

### Generated Parsed Special Ability Macros

Parsed special ability macros are generated from AON_JSON.Parsed.Abilities after creature properties are saved.

Generated special ability macros may embed the small framework-shaped ability args generated from AON_JSON.Parsed.Abilities.
They should assign framework fields directly, build FeatData with json.set(), and pass FeatData as macro.args to Feat@Lib:Pf2.

Generated framework special ability macro fields should include:

- Name
- FeatLevel
- Traits
- Trigger
- Requirements
- Action
- Text
- FeatData

Generated special ability macro labels may append action diamonds for 1, 2, and 3 action abilities.
Generated special ability macros must not re-parse AoN markdown.
Generated special ability macros must not fetch from AoN.

### Generated Parsed Attack Macros

Parsed attack macros are generated from AON_JSON.Parsed.Attacks after creature properties are saved.

Generated attack macros must not embed the full raw AoN object or a copied attack payload.
They may embed the small framework-shaped attack args generated from AON_JSON.Parsed.Attacks.
They should assign framework fields directly, build AttackData with json.set(), and pass AttackData as macro.args to NPCSimpleAttack@Lib:Pf2.

Generated framework attack macro fields should include:

- AttackName
- DamageTooltip
- DamageRoll
- AttackType
- Traits
- AttackModifier
- Damage
- DamageType
- Damage2
- Damage2Type
- Effect
- Action
- ApplyAttackKeyword
- AttackData

Generated attack macro Traits should omit the synthetic attack type trait, such as melee or ranged, because AttackType carries that value.

Generated attack macros are framework-facing wrappers.
They must not re-parse AoN markdown.
They must not fetch from AoN.
They must not turn creature abilities into attacks.

Rebuild should call the parsed attack macro helper after _SetCreatureProperties@Lib:AON so parser upgrades can add or update generated attack macros.
The helper should update matching generated attack macros instead of duplicating stale copies.

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

## REBUILD_AON Rule

REBUILD_AON is a generated token macro used to rebuild an imported creature from stored AoN data.

It must not fetch AoN again.

It must read existing token properties:

- AON_JSON_RAW
- AON_URL
- AON_IMG_URL
- AON_SourceID
- AON_ID
- AON_Type

Purpose:

- Re-run framework property population
- Re-apply current importer mappings
- Support future parser upgrades
- Avoid re-importing from AoN
- Preserve the same token

Required behavior:

1. Read AON_JSON_RAW from the current token.
2. Assert AON_JSON_RAW is not blank.
3. Assert AON_JSON_RAW is a JSON object.
4. Read AON_URL and AON_IMG_URL from the current token.
5. Build propertyArgs with:
   - tokenID = currentToken()
   - creatureData = AON_JSON_RAW
   - aonURL = AON_URL
   - aonImageURL = AON_IMG_URL
   - creatureID = AON_SourceID
   - aonCreatureNumber = AON_ID
   - aonSource = "AoN"
   - aonType = AON_Type
   - importerVersion = current importer version
   - manualReviewNeeded = 1
6. Call _SetCreatureProperties@Lib:AON.
7. Do not create a new token.
8. Do not change token position.
9. Do not change token image unless explicitly requested later.
10. Do not fetch from AoN.
11. Re-run current parsed data helpers from AON_JSON_RAW.
12. Re-add or update generated parsed attack and special ability macros without duplicating stale copies.

REBUILD_AON should be safe to run multiple times.

It may overwrite framework NPC properties populated from AoN.

It should not delete existing custom macros.

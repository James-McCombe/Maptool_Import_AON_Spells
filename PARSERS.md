# Parser Rules

## Purpose

This document defines parser contracts for AoN importer output.

Use this when changing parser macros or generated macro builders.

AGENTS.md remains the source of truth for coding rules and MTScript restrictions.

## Parser Output Location

Parsed data lives under:

AON_JSON.Parsed

AON_JSON_RAW remains the source of truth for rebuilds.

Do not remove source data from AON_JSON_RAW.

Do not embed full AoN source objects in generated token macros.

## Attack Parsing

### Source

Attack parsing reads AoN creature attack data from:

- AoN markdown
- Melee strike blocks
- Ranged strike blocks
- indexed AoN attack metadata when available

### Output

Attack parser output lives at:

AON_JSON.Parsed.Attacks

### Rules

Only actual AoN Strike blocks from Melee and Ranged sections belong in Parsed.Attacks.

Do not put creature abilities in Parsed.Attacks unless AoN presents them as Melee or Ranged strike blocks.

Examples of abilities that should stay out of Parsed.Attacks:

- Hungry Winds
- Rapid Strikes
- Stench
- Putrid Plague

### Required Fields

Each parsed attack object should include:

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
- ActionText
- RawBlock

### Framework-Facing Fields

Generated attack macros should pass these fields to _NPCSimpleAttack@Lib:AON:

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

### Field Rules

AttackName is the strike name, such as jaws, claw, talon, or bow.

AttackType is Melee or Ranged.

Traits is a JSON array of lowercase trait names.

The attack type trait, such as melee or ranged, should be preserved in parsed data.

AttackModifier must be stored as a string.

Action must be stored as a string.

ActionText may preserve the original AoN action text, such as Single Action.

ApplyAttackKeyword defaults to 1 for normal imported strike attacks.

RawBlock preserves the original parsed AoN markdown slice.

Generated framework-facing fields should remove AoN markdown URLs.

### Damage Rules

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

## Ability Parsing

### Source

Ability parsing reads AoN creature ability data from:

- creature_ability list
- AoN markdown ability blocks when needed

### Output

Ability parser output lives at:

AON_JSON.Parsed.Abilities

### Rules

Creature abilities remain abilities even if they reference Strikes or can later be represented by framework macros.

Do not move abilities into Parsed.Attacks unless AoN presents them as Melee or Ranged strike blocks.

### Required Fields

Each parsed ability object should include:

- Name
- FeatLevel
- Traits
- Trigger
- Requirements
- Action
- ActionText
- Text
- TraitsText
- DescriptionText
- RawBlock

### Field Rules

Name is the ability name.

FeatLevel may use the creature level when no ability-specific level exists.

Traits is a JSON array.

Ability traits should preserve AoN display casing, such as Air, Concentrate, or Primal.

Trigger defaults to blank until explicit parsing is available.

Requirements defaults to blank until explicit parsing is available.

Action should be stored as a framework action string when possible:

- 1
- 2
- 3
- R
- F

ActionText may preserve the original AoN action text.

Text should be the cleaned ability rules text with AoN markdown URLs removed.

TraitsText and DescriptionText should remove AoN markdown URLs.

RawBlock is the only parsed ability field that should preserve the original AoN markdown URLs.

### Generated Ability Macros

Generated special ability macros may use Parsed.Abilities entries as Feat@Lib:Pf2 macro args.

Generated special ability macros should assign framework fields directly, build FeatData with json.set(), and pass FeatData as macro.args to Feat@Lib:Pf2.

## Spell Parsing

Status: Planned

### Target Output

Future spell parser output should live at:

AON_JSON.Parsed.Spells

### Planned Sources

Spell parsing should support:

- Prepared spells
- Spontaneous spells
- Focus spells
- Cantrips
- Innate spells
- Constant spells

### Planned Fields

Future parsed spell objects should preserve:

- SpellName
- Rank
- Tradition
- SpellType
- CastingType
- Action
- ActionText
- Frequency
- DC
- AttackModifier
- Slots
- PreparedCount
- RawBlock

### Rules

Do not generate spell macros while parsing.

Store parsed spell data first.

Generate spell macros after creature properties are saved.

Preserve spell rank and casting type.

Cantrips should remain identified as cantrips.

Focus spells should remain identified as focus spells.

Innate and constant spells should remain separate from prepared or spontaneous spell lists.

## Parser Versioning

Parser metadata belongs under AON_JSON.Parsed.

Current parser metadata fields:

- AttackParserVersion
- AbilityParserVersion
- AttackParseSource
- AbilityParseSource

Future spell parser metadata should include:

- SpellParserVersion
- SpellParseSource

## Rebuild Rules

REBUILD_AON must reparse from AON_JSON_RAW.

REBUILD_AON should update AON_JSON.Parsed.

REBUILD_AON should regenerate generated macros after parsed data is updated.

Generated token macros are not parser source data.

Never rebuild parsed data from generated token macros.
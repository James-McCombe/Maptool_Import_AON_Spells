# Creature Importer Plan

## Phase 1 (Complete)
Create token and store AoN JSON.

Input:
- Creature AoN ID, such as 3046

Normalize numeric creature page IDs to the AoN index ID shape before lookup.
Example: 3046 must become lowercase `creature-3046`.
Build the AoN page URL from the number after the hyphen.

Output:
- New token
- Token property type set to NPC
- Token name set to Creature
- GM Name set from creature name
- AON_JSON property populated
- AON_JSON_RAW property populated
- AON_URL populated
- AON_IMG_URL populated when AoN image data is available
- Open AoN Page macro created

Reuse the REST.get and bucket lookup pattern from `/examples/existing-importer-working.mts`.
That example does not define token creation.

Starter token creation:
- Use `baseNPCToken` as the source for `tokenImage`.
- Create the imported creature token in the next empty cell to the right of `Lib:AON`.
- Account for the full footprint of `Lib:AON`; it may be larger than 1x1.
- Use cell units for placement math: `getTokenX(0)` and `getTokenY(0)`.
- Use `getTokens("json", conditions)` with an `area` condition to test whether a target cell is empty.
- Build `createToken()` data with `json.set()`, starting with `name`, `gmName`, and `tokenImage`.
- For starter imports, use visible token name `Creature` and GM Name from the AoN creature name.
- If AoN JSON has an `image` array, use the first entry to build an AoN image URL.
- Starter imports should keep using `baseNPCToken` as the token image until AoN image asset creation is resolved.
- Output the AoN image URL so a token image can be made manually if needed.

Property setting should live in `_SetCreatureProperties`.

Pass a JSON args object with:
- tokenID
- creatureData
- aonURL
- aonImageURL

## Phase 2 (Complete)

Fill basic framework NPC properties.

Examples:
- Level
- AC
- HP
- Saves
- Perception
- Speed
- Traits

Started basic NPC property mapping:
- level to Lvl
- strength to Str
- dexterity to Dex
- constitution to Con
- intelligence to Int
- wisdom to Wis
- charisma to Cha
- hp_raw to HP and MaxHP
- ac to AC
- fortitude_save to Fortitude
- reflex_save to Reflex
- will_save to Will
- perception to Perception
- speed_markdown to Speed
- trait array to type as `Trait | Trait`
- sense_markdown bracket labels to Senses as `| Sense | Sense`

Apply
## Phase 3 (Complete)

Parse attacks.

**Fields Captured:**
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

**Fields Written into Generated Attack Macros:**
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

**Information Preserved in AON_JSON.Parsed.Attacks:**
- The parsed attack data is stored under `AON_JSON.Parsed.Attacks`.
- Each attack object includes the fields mentioned above.
- The framework-shaped fields are preserved for future NPCSimpleAttack macro args.

**Current Limitations Discovered During Review:**
- The parser does not handle complex damage types or multiple effects cleanly.
- Some attack descriptions may still contain AoN-specific markdown that needs to be cleaned up.

## Phase 4

Parse abilities.

**Fields Parsed:**
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

**Fields Written into Generated Special Ability Macros:**
- Name
- FeatLevel
- Traits
- Trigger
- Requirements
- Action
- Text
- FeatData

**Information Preserved in AON_JSON.Parsed.Abilities:**
- The parsed ability data is stored under `AON_JSON.Parsed.Abilities`.
- Each ability object includes the fields mentioned above.
- The framework-shaped fields are preserved for future feat-style macro args.

**Generated Ability Macros Do:**
- Assign framework fields directly.
- Build FeatData with json.set().
- Pass FeatData as macro.args to Feat@Lib:Pf2.

**Current Limitations or Items Needing Verification:**
- The parser does not handle complex ability descriptions cleanly. "Needs verification."
- Some ability triggers and requirements may still contain AoN-specific markdown that needs to be cleaned up. "Needs verification."
- The exact mapping of ActionText to framework actions (1, 2, 3, R, or F) is uncertain and requires testing. "Needs verification."

**References:**
- [src\creature\_ParseCreatureAbilities.mts]
- [src\creature\_AddParsedSpecialAbilities.mts]

## Phase 5 (Complete)

Parse creature info.

**Fields Parsed:**
- Name
- SourceID
- Type
- Source
- URL
- ImageURL
- ImporterVersion
- ImportDate
- ManualReviewNeeded

**Fields Written into Generated Info Macros:**
- Name
- SourceID
- Type
- Source
- URL
- ImageURL
- ImporterVersion
- ImportDate
- ManualReviewNeeded

**Information Preserved in AON_JSON.Parsed.Info:**
- The parsed info data is stored under `AON_JSON.Parsed.Info`.
- Each info object includes the fields mentioned above.
- The framework-shaped fields are preserved for future info macro args.

**Generated Info Macros Do:**
- Assign framework fields directly.
- Build InfoData with json.set().
- Pass InfoData as macro.args to Info@Lib:AON.

**Current Limitations or Items Needing Verification:**
- The parser does not handle complex info fields cleanly. "Needs verification."
- Some info fields may still contain AoN-specific markdown that needs to be cleaned up. "Needs verification."
- The exact mapping of info fields to framework actions is uncertain and requires testing. "Needs verification."

**References:**
- [src\creature\_ParseCreatureInfo.mts]
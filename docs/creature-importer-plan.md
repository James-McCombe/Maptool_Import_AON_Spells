# Creature Importer Plan

## Phase 1

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

## Phase 2

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

## Phase 3

Parse attacks.

Do not start this until Phase 1 works.

## Phase 4

Parse abilities.

Do not start this until attack parsing is stable.

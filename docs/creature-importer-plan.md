# Creature Importer Plan

## Phase 1

Create token and store AoN JSON.

Input:
- Creature AoN ID, such as 3046

Normalize numeric creature page IDs to the AoN index ID shape before lookup.
Example: 3046 must become lowercase `creature-3046`.

Output:
- New token
- Token name set from creature name
- AON_JSON property populated
- AON_URL populated
- Open AoN Page macro created

Reuse the REST.get and bucket lookup pattern from `/examples/existing-importer-working.mts`.
That example does not define token creation.

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

## Phase 3

Parse attacks.

Do not start this until Phase 1 works.

## Phase 4

Parse abilities.

Do not start this until attack parsing is stable.

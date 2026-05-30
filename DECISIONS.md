# Architecture Decisions

## Generated Macros Are Update Safe

Generated macros must update existing macros by label instead of creating duplicates.

Applies to:
- OPEN_AON
- REBUILD_AON
- Parsed attack macros
- Parsed ability macros

## BuildRequest Contract

Supported inputs:
- Direct AON ID
- BuildRequest string
- BuildRequest.AONID
- BuildRequest.SourceID

## MTScript Only

All .mts files must contain only valid MapTool MTScript.

Do not convert MTScript into JavaScript, TypeScript, Python, Lua, or pseudocode.

## AON_JSON_RAW Is Source Of Truth

REBUILD_AON must regenerate importer data from AON_JSON_RAW.

Do not rebuild from generated token macros.

## Lightweight Generated Macros

Generated attack and ability macros should contain only framework-facing data.

Do not embed full AoN source objects inside generated macros.
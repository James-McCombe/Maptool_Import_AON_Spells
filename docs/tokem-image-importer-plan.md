# Token Image Importer Roadmap

## Purpose

This document describes a long-term roadmap for adding token image support to the MapTool AoN importer.

The goal is to make imported creatures easier to recognize on the tabletop by pairing each creature with a generated token image when a suitable source image is available.

This is a roadmap, not a current implementation plan.

## Constraints

The importer runs in MapTool MTScript.

That means the current importer can prepare metadata, create tokens, and store image URLs, but it cannot reliably:

* download remote artwork
* manipulate, crop, frame, or composite token images
* create assets directly from a remote URL
* embed base64 image data into macros as a practical workflow

Because of those constraints, token image generation is a separate long-term workflow.

MapTool remains responsible for:

* creature import
* token creation
* storing AoN image metadata
* exposing the image URL needed by a later image pipeline

An external companion utility remains responsible for:

* downloading artwork
* caching source files
* generating final token images
* reusing previously generated images when possible

## Current State

Creature imports already capture the information needed to support a future image workflow:

* `AON_ID`
* `AON_URL`
* `AON_IMG_URL`
* parsed attacks
* parsed abilities

The importer creates a token, but token image generation is not yet part of the MTScript workflow.

## Roadmap Summary

The long-term direction is to separate the work into two systems:

1. MapTool exports creature and image metadata.
2. A companion image tool turns that metadata into token art.

That keeps the importer lightweight and avoids trying to force image processing into MTScript.

## Roadmap Phases

### Phase 1: Image Metadata Only

MapTool should continue to import creatures and record the image URL when AoN provides one.

At this stage:

* the importer stores the AoN image URL
* the importer creates the token normally
* the token uses a safe fallback image
* the actual artwork workflow remains external

This phase keeps the importer useful without blocking on image generation.

### Phase 2: Queue Export

MapTool may later export a small queue entry for an external tool to consume.

The queue entry should contain only the minimum data needed to generate a token image:

* AoN ID
* creature name
* image URL
* any frame or style hints needed later

This queue is a handoff format, not a token image format.

### Phase 3: External Image Generation

PowerShell will process the queue and call ImageMagick to produce token images outside MapTool.

That tool would be responsible for:

* downloading AoN artwork
* caching source images
* creating 256x256 token images
* center-cropping source art to 256x256
* applying a circular mask
* compositing the correct frame
* saving the final image for reuse

This is where image compositing belongs, not inside the macro importer or MapTool.

### Phase 4: Rebuild Integration

Once a generated token image exists, rebuild workflows can look for it and reapply it during creature updates.

This phase should stay optional and safe:

* if no generated image exists, the token remains usable
* if a generated image exists, rebuild can reuse it
* rebuild should not re-download artwork inside MapTool

### Phase 5: Expansion Beyond Creatures

If the creature workflow proves stable, the same image pipeline can later support:

* NPCs
* items
* hazards
* custom artwork

That expansion should happen only after the creature workflow is proven reliable.

## Suggested Data Flow

The intended long-term flow is:

1. Import creature in MapTool.
2. Store AoN metadata, including the image URL when available.
3. Optionally export a queue entry for the external image tool.
4. External tool downloads and composes the token image.
5. MapTool rebuilds or updates the token when the generated image is available.

## Storage Guidance

Generated image artifacts should live outside the documentation tree.

The roadmap may reference a future working directory, cache directory, or export directory, but those paths should be treated as implementation details for the external tool rather than as documentation assets.

## Technology Direction

ImageMagick is the preferred image processor for the long-term image pipeline.

The implementation path is PowerShell for queue orchestration and calling `magick`.

Python remains a possible future fallback if the ImageMagick path proves insufficient.

The chosen path should handle:

* remote image download
* deterministic caching
* token framing
* repeatable output
* easy rebuild behavior

## Initial Milestone

The first milestone is already partly complete:

1. Import a Harpy creature. Done.
2. Preserve the AoN image URL. Done.
3. Export a queue entry for the companion tool. Pending.
4. Generate a 256x256 token image externally. Pending.
5. Confirm the generated image can be reused on rebuild. Pending.

The remaining milestone work is the first real handoff point for the external image pipeline.

The Harpy is the best baseline creature for this work because it exercises a broad set of parser and presentation features:

* creature description text
* Recall Knowledge block
* traits
* statistics
* melee attacks
* ranged attacks
* special abilities
* disease effects

That makes Harpy the preferred regression example for token image roadmap work as well as parser work.

## Future Milestones

### M2: Frame Support

Add support for the blue NPC frame and the gold Creature frame once the external generation path is stable.

### M3: Automatic Reuse

Automatically reuse generated token images during rebuild when they are present.

### M4: Broader Coverage

Extend the workflow to other imported content types after creature support is stable.

### M5: Standalone Companion Tool

Package the external generator as a reusable companion utility for MapTool users.

## Open Questions

Before implementation begins, the following should still be decided:

* where its cache files will live
* how generated images will be versioned
* whether frame choice is manual or automatic
* whether image generation happens on import or only on rebuild

## Summary

The long-term design is intentionally split:

* MapTool stays focused on importer duties
* an external tool handles image generation
* the workflow remains safe even when no generated image is available

That keeps the importer maintainable while still leaving room for a future token image pipeline.

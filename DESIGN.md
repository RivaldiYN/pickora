# Pickora design direction

Source: the owner's brief (first project message). Items marked *(derived)* are the agent's interpretation of that brief and can be changed by the owner.

## Identity

- Curated affiliate picks. The visitor's job: scan, filter by interest, click through to a store.
- Brief: "modern, eye-catching, but NOT tacky", "clean card containers", "tech-inspired palette inspired by modern corporate deck aesthetics like Google/Bain reports", "multi-column grid".

## Palette *(derived from the corporate-report reference)*

| Token | Value | Use |
|-------|-------|-----|
| paper | `#F7F6F2` | page background, report-paper tone instead of pure white |
| surface | `#FFFFFF` | cards, inputs, admin panels |
| ink | `#16181D` | text, primary admin buttons |
| muted | `#5B606B` | secondary text (6:1 on paper) |
| rule | `#DAD8D1` | borders, dividers |
| accent | `#B3261E` | the one accent: public "Buy Now" CTA, active filter, exhibit numbers |

Accent appears only where a visitor acts or where the eye should land. Admin screens stay ink-on-white.

## Typography *(derived)*

IBM Plex Sans. Reason: it was drawn for a corporate identity and reads like a technical report, which matches the deck reference better than a generic UI sans.

## Motif *(derived)*

Numbered "exhibits" (01, 02, ...) heading each category section, with a thin rule above. This is the most recognizable device in consulting decks and gives the grid a reading order.

## Dials

- ENERGY 2: restrained, the product photos carry the color.
- RHYTHM 2: category sections repeat by design (same data shape), header row varies with description and count.
- MOTION 1: hover and focus states only. No entrance animations, no loops.

## Elevation

Flat by default. Shadow only on the modal (it sits above the page). Cards use a border that darkens on hover.


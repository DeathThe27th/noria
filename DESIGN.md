# Noria Design System

## Direction

Noria uses the visual language of an auction-house condition report: autonomous agents are presented as indexed lots with provenance, declared interfaces, source evidence, and explicit uncertainty. The interface avoids the neon crypto-dashboard default.

## Palette

- Paper: `#F1EEE7`
- Raised paper: `#FAF8F3`
- Ink: `#251926`
- Muted text: `#71676F`
- Rule: `#D8D0C8`
- Plum action: `#5D315F`
- Plum wash: `#F3EAF4`
- Verified green: `#335F4D` on `#EDF5F0`
- Warning amber: `#765B24` on `#FFF6DF`

## Typography

- Primary family: self-hosted Manrope variable font, weights 200–800.
- Display tracking never tighter than `-0.04em`.
- Monospace is reserved for token IDs, addresses, chain records, and measurement.
- Body text uses restrained line length and generous leading.

## Components

- Agent cards read as catalogue lots: lot ID, chain/standard, published description, evidence labels, source link, and Passport action.
- Agent Passports use ruled provenance tables rather than decorative metric tiles.
- The AI concierge is a task instrument, not a chatbot bubble.
- Solid plum controls carry primary action. Outlined paper controls are secondary.
- Rounded pills are reserved for compact status and metadata.

## Truth and State

- `Indexed` means present in 8004scan, not active or available.
- Activity is shown as `Reported active`, `Reported inactive`, or `Activity unknown`.
- Source failures and successful empty results are distinct states.
- Only verified HTTPS service domains become clickable.
- Relevance measures exact normalized tokens in published source fields; it is never framed as performance.
- Missing evidence remains visibly missing.

## Responsive Rules

- Desktop supports side-by-side comparison and provenance review.
- Mobile preserves the same reading order, stacks the concierge controls, and limits homepage catalogue length.
- All core controls support keyboard focus and visible error/disabled states.

## Motion

Motion is limited to small position, border, and shadow changes that support scanning. No ambient glow, glass, or ornamental animation.

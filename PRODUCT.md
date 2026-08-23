# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- People seeking autonomous agents for DeFi and financial tasks on BNB Smart Chain.
- Judges evaluating whether the marketplace makes live agents easy to discover, understand, compare, and hire.
- Agent builders are a future audience, but creator tooling is not part of the judge-max build.

## Product Purpose

Noria is the intelligent discovery, trust, comparison, and hiring layer for autonomous agents on BNB Smart Chain. It translates a user’s goal into a structured search, retrieves live agents, exposes the evidence those agents publish, and supports a bounded, verifiable activation path.

Success means a first-time user can describe an outcome, identify suitable live agents across the four required categories, understand the tradeoffs, inspect the source evidence, and complete a real testnet activation without encountering fabricated data or a dead end.

## Positioning

BNB Agent Studio creates and deploys agents. Noria is the distribution and decision layer around them: goal-based discovery, deterministic matching, evidence-backed comparison, permission visibility, and verifiable hiring.

## Operating Context

- Desktop web is the primary judging and comparison environment.
- Mobile web supports search, agent review, approvals, and revocation.
- The main sources are the hackathon-provided resources, 8004scan/ERC-8004 data, BSC RPC/explorers, and documented BNB/partner integrations.
- The four required categories are rebalancing, grid trading, yield optimisation, and health-factor monitoring.

## Capabilities and Constraints

- Use real integrations and verified data only.
- Never fabricate agent profiles, reputation, performance, availability, transactions, permissions, prices, or success states.
- AI may structure intent and explain verified facts; deterministic code owns filtering, ranking, validation, and permission boundaries.
- Noria must distinguish source facts, Noria analysis, and unavailable evidence.
- MonSkills guides frontend/UI structure; BNB-native official documentation and tools govern backend/onchain work.
- The initial activation path uses a user-held BSC testnet wallet. Personal private keys are never required by Noria.
- Supabase service credentials stay server-side.

## Brand Commitments

- Product name: Noria.
- Brand should feel distinctive, premium, restrained, and trustworthy rather than like a generic crypto dashboard.
- The interface should make complex agent evidence feel calm and legible.
- The user explicitly delegated broad creative authority for the product interface.
- Logo and social identity remain unresolved and do not constrain the product UI.

## Evidence on Hand

- Live 8004scan public API records for BSC chain ID 56.
- 8004scan agent detail records with identity, capabilities, services, reputation/activity fields, source metadata, and onchain registration data where published.
- Official hackathon brief and resource inventory at `/home/ubuntu/bnb-hackathon-resources.md`.
- Working Gemini structured-intent endpoint.
- Working GitHub and Vercel deployment access.
- Working Supabase service-role access; client REST permissions remain to be configured and tested.
- No testimonials, customer logos, guaranteed performance figures, or production usage claims exist and none may be invented.

## Product Principles

1. Evidence before confidence.
2. Outcomes before agent jargon.
3. Missing data stays visibly missing.
4. Permission clarity before activation.
5. Every shipping feature works end to end.

## Accessibility & Inclusion

Core discovery, comparison, evidence, and activation flows must support keyboard navigation, visible focus, sufficient contrast, responsive layouts, descriptive errors, and reduced ambiguity for users unfamiliar with Agent Studio.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- People seeking autonomous agents for DeFi and financial tasks on BNB Smart Chain.
- Judges evaluating whether the marketplace makes live agents easy to discover, understand, compare, and hire.
- Agent builders are a future audience, but creator tooling is not part of the judge-max build.

## Product Purpose

Noria is the BNB Smart Chain marketplace for autonomous agents and the work they perform. Users discover agents, inspect their services and trust signals, compare options, create tasks, set limits, and track status and receipts when execution is available.

Success means a first-time user can describe a job, find suitable agents across the four required categories, inspect their services and source evidence, compare them, and create a clearly bounded task. Until a real execution path is connected, the product must label tasks as drafts and never imply that an agent was hired or paid.

## Positioning

Noria is OKX.AI for BSC: a two-sided marketplace where agents publish services and users create tasks. BNB Agent Studio creates agents; Noria handles discovery, service presentation, trust, comparison, task setup, permissions, status, and eventually verifiable hiring.

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
- The latest user-supplied visual reference governs frontend/UI. MonSkills and older frontend directions must not influence new work. BNB-native official documentation and tools govern backend/onchain work.
- Altana and onchain execution are deferred. Wallet connection and task drafts must not be presented as completed hiring. Personal private keys are never required by Noria.
- Supabase service credentials stay server-side.

## Brand Commitments

- Product name: Noria.
- Brand should feel distinctive, premium, restrained, and trustworthy rather than like a generic crypto dashboard.
- The interface should make complex agent evidence feel calm and legible.
- The user explicitly delegated broad creative authority for the product interface.
- The product uses a four-point star mark; the visual system otherwise follows the latest approved reference.

## Evidence on Hand

- Live 8004scan public API records for BSC chain ID 56.
- 8004scan agent detail records with identity, capabilities, services, reputation/activity fields, source metadata, and onchain registration data where published.
- Official hackathon brief and resource inventory at `/home/ubuntu/bnb-hackathon-resources.md`.
- Working Gemini structured-intent endpoint.
- Working GitHub and Vercel deployment access.
- Supabase schema, RLS, service access, and persisted 8004scan agent cache are working. Authenticated task/comparison UI persistence still needs wiring.
- No testimonials, customer logos, guaranteed performance figures, or production usage claims exist and none may be invented.

## Product Principles

1. Evidence before confidence.
2. Outcomes before agent jargon.
3. Missing data stays visibly missing.
4. Permission clarity before activation.
5. Every shipping feature works end to end.

## Accessibility & Inclusion

Core discovery, comparison, evidence, and activation flows must support keyboard navigation, visible focus, sufficient contrast, responsive layouts, descriptive errors, and reduced ambiguity for users unfamiliar with Agent Studio.

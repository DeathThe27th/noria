# Noria

Noria is an intelligent discovery and hiring layer for autonomous agents on BNB Smart Chain.

It helps users:

- Find agents by goal and category
- Compare agents using real identity, capability, reputation, and activity data
- Understand permissions, costs, and tradeoffs
- Hire and safely manage agents

## Hackathon MVP

The first build targets the BNB Smart Money Era hackathon and uses the official hackathon resources first, including BNB Agent Studio, 8004scan, BSC testnet infrastructure, and relevant partner tooling.

## Backend setup

The app uses the official 8004scan BSC agent source and Supabase for persisted agent records, evidence, comparisons, and mission data.

```bash
npm install
npm run sync:agents
npm run dev
```

`sync:agents` pulls the latest BSC index page plus the four hackathon outcome searches and upserts real records into Supabase. Secrets belong in `.env.local` and must never be committed.

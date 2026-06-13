# No Refunds: Dungeon Shop - MVP

## One-Line Hook

Run the shop outside a deadly dungeon. Sell adventurers exactly enough gear to survive, or just enough to die rich.

## Genre

Dark-comedy dungeon shopkeeper roguelite simulation.

## Player Fantasy

You are the merchant everyone needs and nobody should fully trust. You are not fighting monsters. You are pricing risk, exploiting desperation, and deciding whether repeat customers are worth more alive than dead.

## Core Loop

1. Morning: buy stock from the market.
2. Day: customers arrive with a class, dungeon risk, and need.
3. Sale: choose one item and a price policy.
4. Dungeon: customer survives, limps back, dies, or returns with loot.
5. Night: update gold, reputation, greed, investigation risk, curse, and inventory.
6. Repeat for 30 days.

## Non-Negotiable Differentiator

The game is not about going into the dungeon. It is about influencing someone else's survival odds for profit.

Core sentence:

> If they live, they may become regulars. If they die, you may resell what comes back.

## MVP Scope

- One shop screen
- Fixed diorama camera
- Four customer classes: Fighter, Rogue, Mage, Cleric
- Thirty items
- Six dungeon danger types
- Five customers per day
- Thirty-day run target
- Resources: gold, reputation, greed, investigation, curse
- Endings: honest supplier, rich suspect, cursed merchant, bankrupt, shut down

## Prototype Success Criteria

The prototype is worth continuing if a player says at least one of these:

- "I should not sell this cursed item, but the money is good."
- "I actually want this customer to come back."
- "Wait, I can sell their recovered gear again?"
- "One more day."

## Risks

- Too cozy: becomes another generic shop sim.
- Too abstract: feels like spreadsheet math instead of a shop.
- Too cruel: players stop caring and just min-max death.
- Too 3D-heavy: production cost eats the prototype.

## Current Direction

Use a browser prototype first. If the core loop works, move to a fixed-camera 3D diorama implementation in Godot or Unity.

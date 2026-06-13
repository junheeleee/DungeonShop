# DungeonShop

Working title for a dark-comedy shopkeeper roguelite.

You are not the hero. You run the shop at the dungeon entrance. Sell adventurers enough gear to survive, or just enough to die rich.

## Current Goal

Build a fast playable prototype that validates the core tension:

- Do players care whether a customer survives?
- Is it tempting to overcharge or sell cursed gear?
- Does death-powered resale create a funny but uncomfortable loop?

## Run The Prototype

```bash
python3 -m http.server 5173
```

Then open:

```text
http://127.0.0.1:5173
```

## Project Shape

- `index.html` - static prototype shell
- `src/game.js` - prototype rules and state
- `src/styles.css` - diorama UI and layout
- `docs/mvp.md` - one-page MVP target

## Prototype Promise

The first prototype is deliberately small. It should prove the decision loop before we commit to a full engine, large art pipeline, or complex simulation.

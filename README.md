# Campus Bites

A responsive university canteen menu built with React, Vite, and plain CSS. It is a frontend-only project: cart and favorites are saved in the browser, and checkout displays a pickup confirmation without contacting a server or taking payment.

## Start the project

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. In the integrated terminal, run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.

Useful commands: `npm test` runs the tests, `npm run lint` checks the source, and `npm run build` creates the production files in `dist/`.

## Structure

- `src/pages/` contains the route-level views.
- `src/components/` contains reusable interface pieces.
- `src/context/` shares cart, favorite, and toast state.
- `src/hooks/` contains browser storage and menu loading hooks.
- `src/services/` loads the static menu data from `public/data/menu.json`.
- `public/images/` contains the menu photography used by the app.
- `tests/` contains the menu service and app interaction tests.
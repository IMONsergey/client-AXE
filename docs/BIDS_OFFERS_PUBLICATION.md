# Bids & Offers publication

The Bids & Offers flow is implemented as an isolated static page in `bids-offers/`.

Source Figma file: `https://www.figma.com/design/2PiZIPJsiBJLIR7W5aTGdG/Untitled?node-id=0-1&p=f&t=BToI16E10fzT8rRJ-0`.

Implemented screens:

- login;
- registration;
- email confirmation;
- password reset request and confirmation;
- trade requests table;
- request details drawer;
- new request form.

Implemented behavior:

- login, registration, confirmation, password reset, list, drawer, and form views are routed client-side;
- table rows are rendered from a request dataset and all rows open the details drawer;
- filters work together by type, participant, product, delivery terms, and status;
- the new request form validates required fields, creates a request in the current browser session, prepends it to the table, and opens its details drawer;
- focus, hover, view transitions, row entrance, and drawer transitions are implemented with reduced-motion support.

Publication target: GitHub Pages subpath `/client-AXE/bids-offers/`.

The page is intentionally standalone because the repository `main` branch currently contains project documentation but no application build system. The `gh-pages` branch is the active Pages source.

The current implementation is a frontend-only static system. New requests are not persisted after reload until a backend/API storage layer is connected.

Visual constraints for this standalone page:

- the page gradient stays light at the top and moves into color toward the bottom;
- the ACE logo asset must not include exported Figma frame backgrounds;
- the request details drawer is viewport-fixed and must cover the full browser height;
- the back icon in `На главную` points left;
- the authenticated header actions stay in one row on desktop and supported narrow widths.

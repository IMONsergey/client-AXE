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
- page-to-page transitions use a short exit and soft enter animation so navigation between demo views stays visually continuous;
- email confirmation and password reset confirmation use the email entered by the user in the current demo flow;
- table rows are rendered from a request dataset and all rows open the details drawer;
- the table includes an empty state when selected filters return no requests;
- the empty state includes a reset filters action;
- filters work together by type, participant, product, delivery terms, and status;
- active filters are highlighted both in the filter panel and in table column filter icons;
- the request dataset includes twelve demo requests for sorting and filtering checks;
- on desktop scroll, the page header and table header remain sticky;
- long price and payment terms are clamped to three lines in the table and remain fully visible in the details drawer;
- the new request form validates required fields, creates a request in the current browser session, prepends it to the table, and opens its details drawer;
- the request date field validates real `дд.мм.гггг` dates and includes a compact demo calendar picker;
- focus, hover, view transitions, row entrance, and drawer transitions are implemented with reduced-motion support.

Publication target: GitHub Pages subpath `/client-AXE/bids-offers/`.

The page is intentionally standalone because the repository `main` branch currently contains project documentation but no application build system. The `gh-pages` branch is the active Pages source.

The current implementation is a frontend-only static system. New requests are not persisted after reload until a backend/API storage layer is connected.

Visual constraints for this standalone page:

- the page gradient stays light at the top and moves into color toward the bottom;
- the ACE logo asset must not include exported Figma frame backgrounds;
- the request details drawer is viewport-fixed and must cover the full browser height;
- the request details drawer is mounted at the document body root, outside the app shell and animated view panels;
- the back icon in `На главную` points left;
- the authenticated header actions stay in one row on desktop and supported narrow widths.
- the auth and workspace states share the same page gradient;
- the requests workspace uses a fluid flex layout instead of a fixed narrow frame;
- below desktop width, request rows become readable cards instead of a horizontally clipped table;
- on phone width, the header stays compact: the logo remains readable, while language and actions stay grouped on the right without overlap;
- on mobile request-form width, the top cancel action is hidden and bottom form actions stretch to the form width;
- `ТИП` and `СТАТУС` table headers expose column filters;
- `ДАТА ЗАЯВКИ`, `ОБЪЁМ`, and `ЦЕНА И УСЛОВИЯ` table headers expose sorting.

## Visual correction pass: 2026-08-31

- `На главную` is a real link to the published homepage; `Выйти` returns the demo flow to the login screen.
- Header actions may change color on hover, but their position and dimensions stay static.
- Oswald remains limited to display headings, Inter is used for body text and segmented/text controls, and Inter Tight is used for command buttons.
- The active login or registration segment uses the dark interface color `#1F323F`.
- `Восстановить`, `Зарегистрироваться`, and `Войти` text links are underlined.
- Empty validation messages do not reserve vertical space; errors appear only after validation.
- Confirmation, password recovery, and password-reset actions span the content width. The password-recovery screen contains only the `Подтвердить` action.
- Auth and new-request forms use compact vertical spacing while preserving the existing validation and responsive layouts.

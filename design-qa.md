# Homepage Design QA

Дата: 2026-08-30

## Scope

Проверены текущий hero, промоблок `Bids & Offers`, мозаика «Об ассоциации», блоки «Наша цель», «Наши задачи», «Направления деятельности», «Этапы развития», «Страны—участники» и «Ключевые события» в ветке `gh-pages`.

Референс:

- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_aNVGuS/Снимок экрана — 2026-08-30 в 13.10.34.png`
- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_q10uoj/Снимок экрана — 2026-08-30 в 14.06.04.png`
- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_zqqeNl/Снимок экрана — 2026-08-30 в 14.06.52.png`
- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_nMsD91/Снимок экрана — 2026-08-30 в 16.57.26.png`
- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_Dn25qR/Снимок экрана — 2026-08-30 в 16.57.41.png`
- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_reH8YT/Снимок экрана — 2026-08-30 в 17.01.06.png`
- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_Nogtv3/Снимок экрана — 2026-08-30 в 17.02.09.png`

Исходные ассеты:

- `/Users/erdc/Downloads/Untitled (8)/Фон для секции Bids & Offers.png`
- `/Users/erdc/Downloads/Untitled (8)/Элемент над фото.png`
- `/Users/erdc/Downloads/Untitled (8)/Фото для секции Bids & Offers.png`
- `/Users/erdc/Downloads/Untitled (9)/1.png` — `/Users/erdc/Downloads/Untitled (9)/7.png`
- `/Users/erdc/Downloads/Untitled (11).zip`
- `/Users/erdc/Downloads/Map assett.png`
- `/Users/erdc/Downloads/Untitled (12)/` — семь флагов
- `/Users/erdc/Downloads/Untitled (13)/` — восемь логотипов бирж
- `/Users/erdc/Downloads/Фото собятия.png`
- `/Users/erdc/Downloads/Стрелка внутр собцтия.svg`

Итоговые кадры:

- `output/playwright/current-home-hero-desktop.png`
- `output/playwright/current-home-bids-promo-desktop.png`
- `output/playwright/current-home-bids-promo-mobile.png`
- `output/playwright/current-home-association-desktop.png`
- `output/playwright/current-home-association-mobile.png`
- `output/playwright/current-home-goal-desktop.png`
- `output/playwright/current-home-goal-mobile.png`
- `output/playwright/current-home-tasks-desktop.png`
- `output/playwright/current-home-tasks-mobile.png`
- `output/playwright/current-home-directions-desktop.png`
- `output/playwright/current-home-directions-mobile.png`
- `output/playwright/current-home-timeline-desktop.png`
- `output/playwright/current-home-timeline-mobile.png`
- `output/playwright/current-home-countries-map-desktop.png`
- `output/playwright/current-home-countries-map-desktop-hover.png`
- `output/playwright/current-home-countries-map-mobile.png`
- `output/playwright/current-home-events-desktop.png`
- `output/playwright/current-home-events-mobile.png`
- `output/playwright/current-home-events-320.png`

## Checks

- Hero-кнопка отделена от дескриптора интервалом `56px` на desktop и `42px` на mobile.
- Desktop-секция сохраняет исходную пропорцию `1922:918`, радиус `6px` и обводку `rgba(47, 224, 253, 0.24)`.
- На desktop фотография раскрывается маской слева направо; на tablet/mobile — сверху вниз.
- Прозрачный сетевой ассет расположен поверх фотографии и не подменён CSS-графикой.
- При ширине до `1050px` порядок элементов становится вертикальным: текст, кнопка, фотография.
- Проверены ширины `1440`, `1051`, `1050`, `768` и `390px`.
- Нет горизонтального переполнения, обрезанных элементов, ошибок или предупреждений в консоли.
- Все видимые строки блока дословно совпадают с реестром разрешённого текста.
- Desktop-мозаика собрана как единая сетка `5 × 4` в порядке, заданном референсом.
- До `1050px` мозаика перестраивается в `2 × 5`, после нее следуют полноширинный текст и четыре навигационные плитки.
- Проверены граничные ширины `1050`, `1051` и `1181px`: нет переполнения ячеек или скачка содержимого за границы.
- На `390` и `320px` текстовый блок и навигационные плитки увеличивают высоту по содержимому и не обрезают текст.
- Фон мозаики прозрачен; утвержденный общий градиент продолжается ниже без локальной подложки.
- Семь фотографий загружены в размере `768 × 633`; пять SVG взяты из пользовательского архива.
- Старые CSS-правила и ассеты замененных секций удалены.
- Блок «Наша цель» сохраняет композицию `1 + 3` колонки на desktop и вертикальную композицию на mobile.
- Desktop-высота блока — `680px`, mobile-высота — `450px`; утвержденные переносы текста сохранены в обоих режимах.
- Верхний градиент заканчивается вместе с блоком «Наша цель»; следующий раздел имеет фон `#F1F4F6`.
- Desktop-блок «Наши задачи» сохраняет сетку `4 × 2`, все шесть карточек и логотипную плитку.
- На `780px` отображается одна карточка с кнопками и без логотипа; на `781px` возвращается полная desktop-сетка.
- Проверены циклическое переключение кнопками, hover-состояние стрелок, mobile swipe и отсутствие обрезания текста на `320px`.
- Блок не создаёт горизонтального переполнения; консоль браузера не содержит ошибок и предупреждений.
- Desktop-блок «Направления деятельности» сохраняет схему `1 + 2 × 2`; его высота — `824px`, сетка начинается на `243px`.
- Mobile-карточка сохраняет фоновый растр при переключении номера и текста; кнопки и свайп используют общий контроллер с блоком задач.
- На `320px` длинный текст первой карточки не пересекается с номером; на `781px` обе карусели возвращаются в полные desktop-сетки.
- Блок «Этапы развития» имеет высоту `678px` на desktop и `962px` на контрольной mobile-ширине `732px`.
- Desktop-карточки имеют размер `366 × 326px`; mobile-карточка — `472 × 523px`, следующая карточка остается частично видимой.
- Стрелки прокручивают хронологию на одну карточку, hover/focus использует активные ассеты; все шесть карточек остаются доступны горизонтальной прокруткой.
- На `320px` ни одна из шести карточек не переполняется по высоте, общий горизонтальный overflow страницы отсутствует.
- Утвержденный нижний градиент начинается с хронологии, визуально совпадает с контрольными кадрами и продолжается под последующими секциями.
- Проверены регрессии на `780/781px`: слайдеры задач и направлений сохраняют прежнее переключение, хронология остается горизонтальной лентой.
- Desktop-блок «Страны—участники» имеет высоту `1132px` при ширине `1740px`; семь карточек и восемь логотипов соответствуют позициям референса.
- Россия строит один пунктирный путь; Иран строит два пути и активирует оба логотипа. После pointer leave линии удаляются, keyboard focus воспроизводит то же поведение.
- До `900px` остаются только карта и семь флагов в порядке `3 + 3 + 1`; desktop-карточки, логотипы и линии скрыты.
- На `320px` mobile-сетка перестраивается в две колонки, ни одна подпись не переполняется; общий горизонтальный overflow отсутствует.
- Проверены границы `900/901px`, размеры карты на `732px`, сохранность геометрии таймлайна и отсутствие ошибок или предупреждений в консоли.
- Все 16 пользовательских изображений и `countries-map.js` отвечают локально со статусом `200`.
- Desktop-блок «Ключевые события» имеет высоту `896px` при ширине `1552px`; карточка сохраняет исходную пропорцию `2:1`, текст и внутренняя стрелка расположены поверх фотографии.
- На `684px` фотография начинается на `302px`, а дата, заголовок и описание идут ниже отдельным потоком; нижний разделитель расположен на `1101px`, как в референсе.
- На границе `780/781px` секция без переполнения переключается между mobile и desktop-композициями. На `320px` заголовки переносятся без наложений, весь утверждённый текст остаётся видимым.
- Кнопки слайдера подключены к общему контроллеру, единственный текущий слайд остаётся активным после переключения; консоль не содержит ошибок или предупреждений.

## Result

final result: passed
---

# Contact Form And Footer Design QA

Дата: 2026-08-31

## Artifacts

- Desktop source: `/Users/erdc/Desktop/Снимок экрана — 2026-08-31 в 12.06.51.png`
- Desktop implementation: `/tmp/ace-contact-desktop-implementation.jpg`
- Mobile source: `/Users/erdc/Desktop/Снимок экрана — 2026-08-31 в 12.06.59.png`
- Mobile implementation: `/tmp/ace-contact-mobile-implementation.jpg`
- Desktop viewport and pixels: `1552 × 1188`, CSS `1552 × 1188`, density `1`.
- Mobile viewport and pixels: `422 × 1254`, CSS `422 × 1254`, density `1`.
- State: empty form, default focus state, contact anchor aligned to the viewport.

## Evidence

- Full-view source and implementation captures were opened together for desktop and mobile at identical dimensions.
- The native-resolution mobile pair provided the focused review of labels, placeholders, borders, icon, button, logos and copyright.
- Browser checks covered field entry, submit interception without navigation, responsive layout and horizontal overflow. No page-level runtime error surfaced during interaction; `contact-form.js` passed `node --check`.

## Required Fidelity Surfaces

- Fonts and typography: Oswald, Inter and Inter Tight follow the established project roles; sizes, weights, line heights, uppercase treatment and mobile title wrapping match the references.
- Spacing and layout rhythm: desktop section is `1552 × 1188` with a `1392 × 698` form; mobile section is `422 × 1254` with a `389 × 764` form. Footer and control positions match without overflow.
- Colors and visual tokens: dark navy field, white form, pale gray inputs, teal controls and bottom radial light match the supplied captures.
- Image quality and asset fidelity: the supplied attachment SVG is used directly. The footer reuses the canonical ACE logo and caption SVG assets.
- Copy and content: all visible authored text is present in the approved registry and is unchanged.

## Comparison History

### Iteration 1

- P1: mobile heading wrapped after `С`, unlike the source.
- P2: desktop textarea exposed the browser resize marker.
- P2: mobile form width, file gap and footer rhythm differed by `3–11px`.

Fixes: split the approved heading into two responsive spans without changing its text, disabled textarea resizing, aligned the mobile form width and adjusted file/footer spacing.

### Iteration 2

- Post-fix captures match the source title wrapping and section dimensions.
- No actionable P0, P1 or P2 differences remain.

## Residual Test Gap

- The native operating-system file picker cannot be automated through the selected in-app browser surface. The file input is present, keyboard-focusable and wired to replace its label with the selected filename.
- No server endpoint was provided; valid submit is intentionally intercepted without leaving the page or inventing a success message.

final result: passed

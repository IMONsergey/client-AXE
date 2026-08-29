# Homepage Design QA

Дата: 2026-08-29

## Scope

Проверена версия главной страницы `Текущая главная`, опубликованная из ветки `gh-pages`.

Основные референсы:

- `/Users/erdc/Downloads/Ассоциации товарных бирж стран БРИКС (3)/desctop.png`
- `/Users/erdc/Downloads/Ассоциации товарных бирж стран БРИКС (3)/mob.png`

Рабочие скриншоты проверки:

- `/Users/erdc/Documents/ChatGPT/ACE/output/design-compare/impl-desktop-full-final-3.png`
- `/Users/erdc/Documents/ChatGPT/ACE/output/design-compare/impl-mobile-full-final-4.png`
- `/Users/erdc/Documents/ChatGPT/ACE/output/design-compare/impl-tablet-full-final.png`
- `/Users/erdc/Documents/ChatGPT/ACE/output/design-compare/impl-desktop-top-final-2.png`
- `/Users/erdc/Documents/ChatGPT/ACE/output/design-compare/impl-mobile-top-final-5.png`

## Checks

- Desktop header remains in one row.
- Hero desktop and mobile were checked against same-width crops.
- Mobile hero heading uses four-line composition matching the reference rhythm.
- `Bids & Offers` uses exported Figma image assets and readable overlay icons.
- Association mosaic uses real exported commodity assets.
- Mobile card groups are horizontal flex rails instead of broken vertical stacks.
- Page was checked at `390x1090`, `768x1024`, and `1440x1000`.
- Automated browser check passed: no hidden images, no page-level horizontal overflow, no console errors.

## Result

Passed for publication. Remaining differences are non-blocking visual tolerances caused by browser-rendered typography and live canvas/rendered asset behavior versus the static mockup.

# Homepage Design QA

Дата: 2026-08-30

## Scope

Проверены текущий hero и новый промоблок `Bids & Offers`, расположенный сразу после него в ветке `gh-pages`.

Референс:

- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_aNVGuS/Снимок экрана — 2026-08-30 в 13.10.34.png`

Исходные ассеты:

- `/Users/erdc/Downloads/Untitled (8)/Фон для секции Bids & Offers.png`
- `/Users/erdc/Downloads/Untitled (8)/Элемент над фото.png`
- `/Users/erdc/Downloads/Untitled (8)/Фото для секции Bids & Offers.png`

Итоговые кадры:

- `output/playwright/current-home-hero-desktop.png`
- `output/playwright/current-home-bids-promo-desktop.png`
- `output/playwright/current-home-bids-promo-mobile.png`

## Checks

- Hero-кнопка отделена от дескриптора интервалом `56px` на desktop и `42px` на mobile.
- Desktop-секция сохраняет исходную пропорцию `1922:918`, радиус `6px` и обводку `rgba(47, 224, 253, 0.24)`.
- На desktop фотография раскрывается маской слева направо; на tablet/mobile — сверху вниз.
- Прозрачный сетевой ассет расположен поверх фотографии и не подменён CSS-графикой.
- При ширине до `1050px` порядок элементов становится вертикальным: текст, кнопка, фотография.
- Проверены ширины `1440`, `1051`, `1050`, `768` и `390px`.
- Нет горизонтального переполнения, обрезанных элементов, ошибок или предупреждений в консоли.
- Все видимые строки блока дословно совпадают с реестром разрешённого текста.

## Result

final result: passed

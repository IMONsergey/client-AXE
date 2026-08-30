# Homepage Design QA

Дата: 2026-08-30

## Scope

Проверены текущий hero, промоблок `Bids & Offers`, мозаика «Об ассоциации» и блок «Наша цель» в ветке `gh-pages`.

Референс:

- `/var/folders/jh/rw4gjc1n0qxcfyrgk32nd5kh0000gn/T/TemporaryItems/NSIRD_screencaptureui_aNVGuS/Снимок экрана — 2026-08-30 в 13.10.34.png`

Исходные ассеты:

- `/Users/erdc/Downloads/Untitled (8)/Фон для секции Bids & Offers.png`
- `/Users/erdc/Downloads/Untitled (8)/Элемент над фото.png`
- `/Users/erdc/Downloads/Untitled (8)/Фото для секции Bids & Offers.png`
- `/Users/erdc/Downloads/Untitled (9)/1.png` — `/Users/erdc/Downloads/Untitled (9)/7.png`
- `/Users/erdc/Downloads/Untitled (11).zip`

Итоговые кадры:

- `output/playwright/current-home-hero-desktop.png`
- `output/playwright/current-home-bids-promo-desktop.png`
- `output/playwright/current-home-bids-promo-mobile.png`
- `output/playwright/current-home-association-desktop.png`
- `output/playwright/current-home-association-mobile.png`
- `output/playwright/current-home-goal-desktop.png`
- `output/playwright/current-home-goal-mobile.png`

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

## Result

final result: passed

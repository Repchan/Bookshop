# Bookshop - Интернет-магазин книг
Проект Bookshop - это интернет-магазин книг, который использует Google Books API для подгрузки информации о книгах с сервера.

## Установка

1. Клонируйте репозиторий на свой локальный компьютер.
2. Войдите в главную папку проекта и выполните команду `npm install` для установки зависимостей.
3. Затем выполните команду `npm run build` для сборки проекта.
4. Теперь вы можете запустить файл `index.html` в браузере.

## Запуск

1. Откройте файл `index.html` в любом современном браузере.
2. Наслаждайтесь использованием интернет-магазина Bookshop!

## Функциональные требования

1. Шапка сайта:
   - Отображение логотипа, навигации и кнопок.
   - Бейджик с количеством товаров в корзине.
   - Закрепление шапки в верхней части экрана при прокрутке страницы.
![image](https://user-images.githubusercontent.com/96149619/236644377-0185bd16-5e9d-45df-bed7-a7e3e0439086.png)
![image](https://user-images.githubusercontent.com/96149619/236644392-a401f64f-db64-47d4-a48f-288ba1c2ff89.png)
2. Слайдер:
   - Автоматическое пролистывание изображений каждые 5 секунд.
   - Возможность переключения изображений с помощью точек, расположенных под слайдером.
   - Цветные блоки-ссылки справа от слайдера.
![image](https://user-images.githubusercontent.com/96149619/236644399-33bba028-6c5d-48f9-ba86-c1e55f628e3d.png)
3. Список категорий и список книг:
   - Отображение списка категорий.
   - Визуальное выделение активной категории.
   - Подгрузка списка книг из Google Books API в соответствии с выбранной категорией.
   - Ленивая загрузка книг: постепенная подгрузка по 6 книг по клику на кнопку "Load more".
![image](https://user-images.githubusercontent.com/96149619/236644406-840e3618-7188-48bc-8cd0-2e4a8682d874.png)
4. Карточка книги:
   - Отображение обложки книги (с плейсхолдером, если обложка отсутствует).
   - Отображение автора/авторов книги.
   - Отображение заголовка книги.
   - Отображение рейтинга и количества отзывов (если доступно).
   - Отображение описания книги (обрезанного, если больше 3 строк).
   - Отображение цены книги (если доступно).
   - Кнопка "Buy now" для добавления/удаления книги в корзину.
   ![image](https://user-images.githubusercontent.com/96149619/236644445-5682f944-6236-4072-982b-14d74606cfce.png)
5. Корзина:
   - Добавление книг в корзину по клику на кнопку "Buy now".
   - Удаление книг из корзины при повторном клике на кнопку "Buy now".
   - Сохранение информации о книгах, добавленных в корзину, в localStorage.

6. Организация проекта:
   - Модульная структура проекта для лучшей организации кода.
   - Использование Webpack для сборки проекта.
   - Минификация и оптимизация кода для улучшения производительности.

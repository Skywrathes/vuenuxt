# Тестовое задание по Vue.js (Junior Frontend разработчик) 

Этот проект является реализацией простого SPA приложения на Nuxt 3 с использованием REST API, Pinia, и Axios.
Информация берется из API <https://rickandmortyapi.com/>.

Сервис доступен по ссылке: <https://skywrathes.github.io/vuenuxt/>

## Установка и запуск проекта 

Клонируйте репозиторий с помощью команды: 

```sh
git clone https://github.com/Skywrathes/vuenuxt
```

Перейдите в директорию проекта: 

```sh
cd vuenuxt/
```

Установите зависимости: 

```sh
npm install
```

Запустите проект: 

```sh
npx nuxt dev
```

Откройте приложение в браузере по адресу <http://localhost:3000>.

## Функциональность приложения

#### Главная страница (index.vue) 

- Постраничный вывод списка персонажей.

Каждая запись содержит:

- Имя персонажа, кликабельное и ведущее на страницу персонажа.
- Разновидность (Human, Alien или другое значение).
- Картинку персонажа.
- Список эпизодов, в которых персонаж участвовал (первые пять записей), кликабельные.

Имеется поле поиска по имени и фильтр по статусу (живой, мертвый, неизвестно), которые работают вместе.

#### Страница персонажа (character.vue) 

- Отображение карточки с информацией о персонаже. 
- Имя персонажа. 
- Разновидность. 
- Картинка персонажа. 
- Локация персонажа. 

#### Страница эпизода (episode.vue) 

- Отображение карточки с информацией об эпизоде. 
- Название эпизода. 
- Дата премьеры. 
- Картинки всех персонажей, участвующих в эпизоде. 
- Картинки персонажей кликабельны и ведут на страницу персонажа.

### Как играть 
Для игры необходимо зарегистрироваться и затем авторизоваться, после чего станет доступен режим игры
На текущий момент - цель игры как можно врезаться в летящие объекты и набирать баллы


### Как запускать?

>>Для dev мода клиента:

- Собираем и запускаем сервер, БД и GIU
```bash
yarn start:docker_client_dev
```
- Запускаем фронт (находясь в корне проекта)
```bash
yarn dev:client
```

>>Для dev мода сервера:
- Запускаем БД и GIU
```bash
yarn start:docker_server_dev
```
- Запускаем бэк (находясь в корне проекта)
```bash
yarn dev:server
```
Если нужен клиент, то запускаем и клиент
```bash
yarn dev:client
```

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap`
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev:client` 
5. Выполните команду `yarn dev:server`

### Как добавить зависимости?

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)

## Присутствует автодеплой статики на vercel

## Production окружение в докере
Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

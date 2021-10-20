# Telegram Client

Телеграм клиент на React и Asp.Net Core.

# Реализуемые возможности 

1) ~~Регистрация~~
2) ~~Создание чатов~~
3) ~~Отправка собщений~~
4) ~~Показ уведомлений~~
5) Создание ботов
6) Видео/аудио звонки

# Поднять проект локально

## Зависимости

1) Docker
2) .Net Core 3.1

## Шаги

1) Перейти в папку Telegram.Server в консольном приложении
2) Поднять postgresql сервер командой<br/>
   docker-compose --project-name=telegram_server --file=docker-compose.yml up -d
3) Запустить приложение командой<br/>
   dotnet restore && dotnet build && dotnet run
4) Перейти по ссылке <br/>
   https://localhost:5001/start
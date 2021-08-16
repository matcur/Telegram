1) Поднять postgresql сервер
    docker-compose --project-name=telegram_server --file=docker-compose.yml up -d
2) Запустить приложение(нужно выполнить в папке Telegram.Server)
    dotnet run
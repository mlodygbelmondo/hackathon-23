
## Instrukcja

### Wymagania

- .NET 8.0
- Node.js
- Docker

### Uruchamianie projektu

- w roocie projektu `docker-compose up -d`
- w `/app` - `npm install && npm run dev`
- w `/api/Kable/WebAPI` - `dotnet ef database update && dotnet run --watch`

### Obsługa projektu
- pod adresem `localhost:3000/` znajduje się wersja dashboardu elektryka
- pod adresem `localhost:3000/admin` znajduje się wersja dashboardu dystrybutora

### Wersja dashboardu elektryka
- w lewym górnym rogu znajduje się menu z którego możemy stworzyć nowe zgłoszenie o kabel do obecnej lokalizacji - należy wypełnić wszystkie pola formularza
- po prawej stronie mapy znajdują się zapytania elektryków raz z ich statusami

### Wersja dashboardu dystrybutora

- po prawej stronie mapy znajdują się zgłoszenia złożone przez elektryków - dystrybutor może je przyjąć albo odrzucić

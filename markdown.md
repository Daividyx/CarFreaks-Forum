```
carfreaksforum/ # Next.js + TypeScript Forumprojekt
│
├── public/ # Statische Assets (Bilder)
│
├── prisma/ # Datenbank-Layer (Prisma)
│ ├── schema.prisma # Datenbank-Modelle & Relationen
│ ├── seed.ts Skript zum seeden der Datenbank
│ ├── weitere Interne Dateien für Prisma
├── src/
│ ├── app/ # Hauptverzeichnis des Projekts
│ │ ├── layout.tsx # Globales Layout der Anwendung (Navbar/Footer)
│ │ ├── globals.css # Globale Styles
│ │ ├── (start)/ # Startseite der Anwendung
│ │ ├── (auth)/ # Seiten und Funktionen für Authentifizierung (Login, Regitrierung)
│ │ ├── (forum)/ # Seiten und Funktionen für das Forum (Kategorien, Threads, SavedThreads, MyThreads)
│ │ ├── admin/ # Admin Seiten und Funktionen (CRUD Funktionalitäten für Kategorien, Threads und Posts)
│ │ ├── (error)/ # Error Seiten (nicht eingeloggt, kein Admin)
│ │ │── api/ # Interne Dateien für Better Auth
│ │
│ ├── components/ # Wiederverwendbare UI-Komponenten
│ │ ├── layout/ # Layout-Bausteine (Navbar, Footer)
│ │ ├── buttons/ # Buttons
│ │ ├── ui/ # shadCn komponenten
│ │ └── cards/ # Karten (threadCard,PostCard)
│ │
│ ├── lib/ # ServerActions, Hilfsfunktionen
│ │ ├── serverActions/ # Server Actions (Thread erstellen/löschen ...)
│ │ ├── validationShema/ # Benutzereingaben validieren
│ │ └── utils.ts # Helfer (z. B. Formatierungen)
│ │
│ ├── database/ # Prisma instanz
├── docker-compose.yml # Docker Konfigurationsdatei
├── .env Datei (Umgebungsvariablen für Docker, BetterAuth und Prisma)

```

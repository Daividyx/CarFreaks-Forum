```
carfreaksforum/ # Next.js + TypeScript Forumprojekt
│
├── public/ # Statische Assets (Favicons, Bilder)
│
├── prisma/ # Datenbank-Layer (Prisma)
│ ├── schema.prisma # Datenbank-Modelle & Relationen
│ ├── weitere Interne Dateien für Prisma
│
│
│
├── src/
│ ├── app/ # Routing, Seiten & Server Actions (Next.js App Router)
│ │ ├── layout.tsx # Globales Layout der Anwendung (Navbar/Footer)
│ │ ├── page.tsx # Startseite der Anwendung
│ │ ├── globals.css # Globale Styles
│ │ │
│ │ ├── (auth)/ # Seiten und Funktionen für Authentifizierung (Login, Regitrierung)
│ │ ├── (forum)/ # Seiten und Funktionen für das Forum (Kategorien, Threads, SavedThreads)
│ │ ├── admin/ # Admin Seiten und Funktionen (CRUD Funktionalitäten für Kategorien, Threads und Posts)
│ │ │── api/ # Interne Dateien für Better Auth
│ │ ├── notAdmin/ # Fehler Seite wenn User kein Admin ist
│ │ ├── notAuthenticated/ # Fehler Seite wenn User nicht eingeloggt ist
│ │ ├── serverActions/ # Server Actions
│ │ ├── users/ # Temporäre Anzeige aller User zur Entwicklung
│ │ ├── categoryGrid.tsx # Kategorie-Übersicht (Komponentenseite)
│ │ ├── validationShema/ # (Tippfehler im Ordnernamen—Zod-Schemas)
│ │ │──
│ │ └── serverActions/ # Serverseitige Aktionen (Form-Submit, Mutationen)
│ │ ├── createCategory.ts
│ │ ├── deleteCategory.ts
│ │ ├── deletePost.ts
│ │ ├── deleteThread.ts
│ │ ├── deleteUser.ts
│ │ ├── editPost.ts
│ │ ├── promoteUser.ts
│ │ ├── toggleBookmark.ts
│ │ └── toggleLike.ts
│ │
│ ├── components/ # Wiederverwendbare UI-Komponenten
│ │ ├── layout/ # Layout-Bausteine (Navbar, Footer, etc.)
│ │ ├── buttons/ # Button-Varianten/Aktionen
│ │ ├── ui/ # shadcn/ui-Exports & Wrapper
│ │ └── cards/ # Karten für Domain-Objekte
│ │ ├── CategoryCard.tsx
│ │ ├── ThreadCard.tsx
│ │ ├── PostCard.tsx
│ │ └── UserCard.tsx
│ │
│ ├── lib/ # Infrastruktur/Config/Hilfen
│ │ ├── auth.ts # BetterAuth-Serverkonfiguration
│ │ ├── auth-client.ts # BetterAuth-Client
│ │ └── utils.ts # Helfer (z. B. Formatierungen)
│ │
│ ├── database/
│ │ └── prisma.ts # Prisma Client-Instanz
│ │
│ └── generated/ # Generierter Code (z. B. Prisma-Types)
│
├── docker-compose.yml # MySQL (Docker) & lokale Infrastruktur
├── next.config.ts # Next.js Konfiguration
├── postcss.config.mjs # PostCSS
├── tailwind.config.ts # Tailwind CSS Konfiguration
├── eslint.config.mjs # ESLint
├── prettier.config.js # Prettier
├── tsconfig.json # TypeScript-Konfiguration
├── package.json # Abhängigkeiten & Scripts
└── README.md # Projektbeschreibung
```

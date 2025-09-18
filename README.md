# CarFreaks Forum

CarFreaks Forum is a full-stack community platform for car enthusiasts.  
Built with **Next.js, Prisma, MySQL, Tailwind, and ShadCN UI**, it allows users to create threads, write posts, and interact in a modern forum environment.

## ✨ Features

- 🔐 Authentication via **BetterAuth**
- 👥 Roles: `USER` & `ADMIN`
- 🗂️ Categories, Threads & Posts, Likes and Bookmarks
- 🌱 Database seeding with demo data for testing
- 🎨 Modern UI with **Tailwind + ShadCN**

---

## 📋 Prerequisites

Before you start, make sure you have installed:

- [Node.js (>=18)](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended editor)
- [Git](https://git-scm.com/)

Check if Node and npm are installed:

    node -v
    npm -v

---

## Installation

Clone the repository and install dependencies:

    git clone https://github.com/Daividyx/CarFreaks-Forum
    cd carfreaksforum
    npm install

Start MySQL with Docker:

    docker compose up -d

Run migrations:

    npx prisma migrate dev

## Usage

Start the development server:

    npm run dev

Seed the database manually:

    npm run prisma-seed

### Seeder actions

- Clears all tables
- Creates default categories
- Inserts demo users (password: `Testpasswort123.`)
- Promotes `admin@mail.com` to **ADMIN**
- Generates 2 threads per user
- Adds 1 initial post + 4 extra posts per thread

### Test users

- **Admin** → `admin@mail.com` / `Testpasswort123.`
- **Regular users** → e.g. `david@mail.com`, `lisa@mail.com`, .../ `Testpasswort123.`

## License

[MIT](https://choosealicense.com/licenses/mit/)

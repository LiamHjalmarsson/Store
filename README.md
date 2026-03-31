# Tech Stack Backend

Node.js + Express

TypeScript

PostgreSQL

JSON Web Token (JWT)

bcrypt

express-validator

dotenv

# Environment Variables

Create a .env file or use .env.example in the root:

- PORT=3000

- POSTGRES_HOST=localhost
- POSTGRES_PORT=5432
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=yourpassword
- POSTGRES_DB=store

- JWT_SECRET=your-secret JWT_EXPIRES_IN=7d

# Setup

## Install dependencies

- npm run install

## Run database migrations

- npm run setup

- npm run seed

- npm run reset

## start server

- npm run dev

# API Endpoints

### Authentication

| Method | Endpoint        | Access | Description      |
| ------ | --------------- | ------ | ---------------- |
| POST   | `/api/login`    | Public | Login            |
| POST   | `/api/register` | Public | Register         |
| POST   | `/api/logout`   | Public | Logout           |
| GET    | `/api/me`       | Public | Get user profile |

### Achievements

#### Public

| Method | Endpoint                  | Access | Description                       |
| ------ | ------------------------- | ------ | --------------------------------- |
| GET    | `/api/achievements`       | Public | Get all achievements              |
| GET    | `/api/achievements/me`    | Public | Get logged in user's achievements |
| GET    | `/api/achievements/award` | Public | _ongoing_                         |

#### ADMIN

| Method | Endpoint                | Access | Description        |
| ------ | ----------------------- | ------ | ------------------ |
| POST   | `/api/achievements`     | ADMIN  | Create achievement |
| PATCH  | `/api/achievements/:id` | ADMIN  | Update achievement |
| DELETE | `/api/achievements/:id` | ADMIN  | Delete achievement |

### Categories

#### Public

| Method | Endpoint              | Access | Description            |
| ------ | --------------------- | ------ | ---------------------- |
| GET    | `/api/categories`     | Public | Get all categories     |
| GET    | `/api/categories/:id` | Public | Get one category by id |

#### ADMIN

| Method | Endpoint              | Access | Description        |
| ------ | --------------------- | ------ | ------------------ |
| POST   | `/api/categories`     | ADMIN  | Get all categories |
| PATCH  | `/api/categories/:id` | ADMIN  | Update category    |
| DELETE | `/api/categories/:id` | ADMIN  | Delete category    |

### Creators

### Products

### Profile

### Ranks

### Subcategories

### User

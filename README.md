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

#### Authenticated

| Method | Endpoint               | Access        | Description                       |
| ------ | ---------------------- | ------------- | --------------------------------- |
| GET    | `/api/achievements`    | Authenticated | Get all achievements              |
| GET    | `/api/achievements/me` | Authenticated | Get logged in user's achievements |

#### ADMIN

| Method | Endpoint                        | Access | Description                 |
| ------ | ------------------------------- | ------ | --------------------------- |
| POST   | `/api/admin/achievements`       | ADMIN  | Create achievement          |
| PATCH  | `/api/admin/achievements/:id`   | ADMIN  | Update achievement          |
| DELETE | `/api/admin/achievements/:id`   | ADMIN  | Delete achievement          |
| POST   | `/api/admin/achievements/award` | ADMIN  | Award achievement to a user |

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

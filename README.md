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

- npm run dev

## Run database seeds

- npm run seed

## start server

- npm run dev

# API Endpoints

### Authentication

### Profile

### Creators

### Products

| Method | Endpoint                     | Access        | Description           |
| ------ | ---------------------------- | ------------- | --------------------- |
| GET    | `/api/products`              | Public        | Get all products      |
| GET    | `/api/products/:id`          | Public        | Get one product by id |
| PATCH  | `/api/products/:id/download` | Public        | Download              |
| POST   | `/api/products`              | Creator/Admin | Create product        |
| PATCH  | `/api/products/:id`          | Creator/Admin | Update product        |
| DELETE | `/api/products/:id`          | Creator/Admin | Delete product        |
| PATCH  | `/api/products/:id/image`    | Creator/Admin | Update image          |

### Categories

### Subcategories

### Achievements

### Ranks

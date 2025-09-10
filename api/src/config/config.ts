import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";

dotenv.config();

interface Config {
	port: number;
	nodeEnv: string;
	pgHost: string;
	pgUser: string;
	pgPassword: string;
	pgDb: string;
	pgPort: number;
	jwtSecret: string;
	jwtExpiresIn: SignOptions["expiresIn"];
}

const config: Config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
	pgHost: process.env.POSTGRES_HOST || "localhost",
	pgUser: process.env.POSTGRES_USER || "postgres",
	pgPassword: process.env.POSTGRES_PASSWORD || "postgres",
	pgDb: process.env.POSTGRES_DB || "store",
	pgPort: Number(process.env.POSTGRES_PORT) || 5432,
	jwtSecret: process.env.JWT_SECRET || "default_secret",
	jwtExpiresIn: (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "1h",
};

export default config;

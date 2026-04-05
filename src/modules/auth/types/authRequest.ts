import { Request } from "express";
import { NoParams, NoResponseBody } from "../../../shared/types/request.js";
import { LoginPayload, RegisterPayload } from "./auth.js";

export type RegisterRequest = Request<NoParams, NoResponseBody, RegisterPayload>;

export type LoginRequest = Request<NoParams, NoResponseBody, LoginPayload>;

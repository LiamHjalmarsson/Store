import { Request } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { IdParams, NoParams, NoResponseBody } from "../../../shared/types/request.js";
import { CreateCreatorData, UpdateCreatorPayload } from "./creator.js";

export type CreateCreatorRequest = AuthenticatedRequest<NoParams, NoResponseBody, CreateCreatorData>;

export type UpdateMyCreatorRequest = AuthenticatedRequest<NoParams, NoResponseBody, UpdateCreatorPayload>;

export type UpdateCreatorRequest = Request<IdParams, NoResponseBody, UpdateCreatorPayload>;

export type DeleteCreatorRequest = Request<IdParams>;

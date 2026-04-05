import { Request } from "express";
import { IdParams, NoParams, NoResponseBody } from "../../../shared/types/request.js";
import { AwardAchievementPayload, CreateAchievementPayload, UpdateAchievementPayload } from "./achievement.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";

export type CreateAchievementRequest = Request<NoParams, NoResponseBody, CreateAchievementPayload>;

export type UpdateAchievementRequest = Request<IdParams, NoResponseBody, UpdateAchievementPayload>;

export type DeleteAchievementRequest = Request<IdParams>;

export type AwardAchievementRequest = AuthenticatedRequest<NoParams, NoResponseBody, AwardAchievementPayload>;

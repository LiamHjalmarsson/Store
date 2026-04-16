import type { Request } from "express";
import type { IdParams, NoParams, NoResponseBody } from "../../../shared/types/request.js";
import type { AwardAchievementPayload, CreateAchievementPayload, UpdateAchievementPayload } from "./achievement.js";

export type CreateAchievementRequest = Request<NoParams, NoResponseBody, CreateAchievementPayload>;

export type UpdateAchievementRequest = Request<IdParams, NoResponseBody, UpdateAchievementPayload>;

export type DeleteAchievementRequest = Request<IdParams>;

export type AwardAchievementRequest = Request<NoParams, NoResponseBody, AwardAchievementPayload>;

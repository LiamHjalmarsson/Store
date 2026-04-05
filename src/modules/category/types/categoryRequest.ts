import { Request } from "express";
import { IdParams, NoParams, NoResponseBody } from "../../../shared/types/request.js";
import { CreateCategoryPayload, UpdateCategoryPayload } from "./category.js";

export type CreateCategoryRequest = Request<NoParams, NoResponseBody, CreateCategoryPayload>;

export type UpdateCategoryRequest = Request<IdParams, NoResponseBody, UpdateCategoryPayload>;

export type DeleteCategoryRequest = Request<IdParams>;

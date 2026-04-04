import type { ParamsDictionary } from "express-serve-static-core";

export type NoParams = Record<string, never>;

export type NoResponseBody = unknown;

export interface IdParams extends ParamsDictionary {
	id: string;
}


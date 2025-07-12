/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ResendOTP from "../ResendOTP.js";
import type * as ResendOTPPasswordReset from "../ResendOTPPasswordReset.js";
import type * as adminOperations from "../adminOperations.js";
import type * as auditLogs from "../auditLogs.js";
import type * as auth from "../auth.js";
import type * as board from "../board.js";
import type * as boardTemplates from "../boardTemplates.js";
import type * as boards from "../boards.js";
import type * as crons from "../crons.js";
import type * as dataExport from "../dataExport.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as notifications from "../notifications.js";
import type * as organizations from "../organizations.js";
import type * as search from "../search.js";
import type * as sessions from "../sessions.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  ResendOTP: typeof ResendOTP;
  ResendOTPPasswordReset: typeof ResendOTPPasswordReset;
  adminOperations: typeof adminOperations;
  auditLogs: typeof auditLogs;
  auth: typeof auth;
  board: typeof board;
  boardTemplates: typeof boardTemplates;
  boards: typeof boards;
  crons: typeof crons;
  dataExport: typeof dataExport;
  files: typeof files;
  http: typeof http;
  notifications: typeof notifications;
  organizations: typeof organizations;
  search: typeof search;
  sessions: typeof sessions;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

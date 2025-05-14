import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";
import { UserInterface } from "../models/user.model";

export type UserRequest = Request & { user?: UserInterface };
  
export const asyncHandler = (
  fn: (req: UserRequest, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      try {

        const stackTrace = (await import("stack-trace")).default;

        const trace = stackTrace.parse(error);
        const { fileName, lineNumber, columnNumber } = trace[0] || {};

        logger.error(
          `${error.message} at ${fileName}:${lineNumber}:${columnNumber}`,
          { stack: error.stack }
        );
      } catch (traceErr: any) {

        logger.error("Failed to capture stack trace", {
          originalError: error,
          traceError: traceErr,
        });
      }

      next(error);
    }
  };
};

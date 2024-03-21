import { logger } from "./logger";

export function getEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    logger.error(`${key} must be set`);
    process.exit(1);
  }
  return value;
}

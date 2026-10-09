import type { Role } from "../generated/prisma/enums";

export {};

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        role: Role;
      };
    }
  }
}

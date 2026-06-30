import { p as private_env } from './index.js-H2yCcV1v.js';
import { PrismaClient } from '@prisma/client';

//#region src/lib/server/db.ts
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma ?? new PrismaClient({ log: private_env.NODE_ENV === "development" ? ["error", "warn"] : ["error"] });
if (private_env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma as p };
//# sourceMappingURL=db2-CI-JqqkQ.js.map

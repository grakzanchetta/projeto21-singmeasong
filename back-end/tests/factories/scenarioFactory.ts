import { prisma } from "../../src/database";

async function deleteAllData() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

async function disconnectPrisma() {
  await prisma.$disconnect();
}

export { deleteAllData, disconnectPrisma };

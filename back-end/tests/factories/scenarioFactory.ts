import { prisma } from "../../src/database";
import { RecommendationType } from "../../src/types/types";

async function deleteAllData() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

async function disconnectPrisma() {
  await prisma.$disconnect();
}

async function startConflict() {
  await prisma.recommendation.create({
    data: {
      name: "Javascript in 100 seconds",
      youtubeLink:
        "https://www.youtube.com/watch?v=DHjqpvDnNGE&ab_channel=Fireship",
    },
  });
}

export { deleteAllData, disconnectPrisma, startConflict };

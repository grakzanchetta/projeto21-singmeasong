import { prisma } from "../../src/database";
import { correctDataFactory } from "../factories/recommendationFactory";

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

async function postRecommendationForVoting() {
  const post = correctDataFactory();
  await prisma.recommendation.create({
    data: {
      name: post.name,
      youtubeLink: post.youtubeLink,
    },
  });

  const recommendation = await prisma.recommendation.findFirst({});

  const id = Number(recommendation.id);

  return id;
}

export {
  deleteAllData,
  disconnectPrisma,
  startConflict,
  postRecommendationForVoting,
};

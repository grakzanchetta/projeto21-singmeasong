import { prisma } from "../../src/database";
import { correctDataFactory } from "../factories/recommendationFactory";

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

async function findLastRegistry() {
  const lastSong = await prisma.recommendation.findMany({
    orderBy: {
      id: "desc",
    },
    take: 1,
  });
  return lastSong;
}

async function deleteMyDatabase() {
  await prisma.recommendation.deleteMany({});
}

async function recreateDatabase() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: "Frank Zappa - The Little House I Used To Live In",
        youtubeLink:
          "https://www.youtube.com/watch?v=XduaWFznN5s&ab_channel=FrankZappa-Topic",
        score: 13,
      },
      {
        name: "Iron Maiden - The Number of The Beast",
        youtubeLink:
          "https://www.youtube.com/watch?v=fyr79sB6nGg&ab_channel=IronMaiden-Topic",
        score: 15,
      },
      {
        name: "Iron Maiden - Alexander The Great",
        youtubeLink:
          "https://www.youtube.com/watch?v=6BH9HvZx3nI&ab_channel=IronMaiden-Topic",
        score: 11,
      },
      {
        name: "Rhapsody - Emerald Sword",
        youtubeLink:
          "https://www.youtube.com/watch?v=gZmdu4ekAoI&ab_channel=Selbst93",
        score: 10,
      },
      {
        name: "Bee Gees - Night Fever",
        youtubeLink:
          "https://www.youtube.com/watch?v=SkypZuY6ZvA&ab_channel=BeeGeesVEVO",
        score: 25,
      },
      {
        name: "Henrique e Juliano - Colega de Caso",
        youtubeLink:
          "https://www.youtube.com/watch?v=6B5-c0EgvC4&ab_channel=HenriqueeJuliano",
        score: -1,
      },
      {
        name: "Yes - Parallels",
        youtubeLink:
          "https://www.youtube.com/watch?v=Jsq91qrFSIA&ab_channel=IlTrovatore",
        score: 8,
      },
      {
        name: "Magma - Mekanïk Destruktïw Kömmandöh",
        youtubeLink:
          "https://www.youtube.com/watch?v=yB8bktgxcQA&t=318s&ab_channel=Magma-Topic",
        score: 17,
      },
      {
        name: "Magma - Hhäi",
        youtubeLink:
          "https://www.youtube.com/watch?v=MA-g77MUBDM&ab_channel=Jos%C3%A9MLe%C3%B3n",
        score: 6,
      },
      {
        name: "Magma - Hhäi/Zombies (Live)",
        youtubeLink:
          "https://www.youtube.com/watch?v=bYrHNLXwGe0&list=RDMA-g77MUBDM&index=3&ab_channel=antoinegranger",
        score: 9,
      },
      {
        name: "Magma - Stöah",
        youtubeLink:
          "https://www.youtube.com/watch?v=FwszR0ajHRE&list=RDMA-g77MUBDM&index=15&ab_channel=MagmaOfficialTV",
        score: 1,
      },
    ],
  });
}

export {
  deleteMyDatabase,
  recreateDatabase,
  disconnectPrisma,
  startConflict,
  postRecommendationForVoting,
  findLastRegistry,
};

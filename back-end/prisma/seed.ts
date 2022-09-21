import { prisma } from "../src/database.js";

async function main() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: "Iron Maiden - The Number of The Beast",
        youtubeLink:
          "https://www.youtube.com/watch?v=fyr79sB6nGg&ab_channel=IronMaiden-Topic",
        score: 666,
      },
      {
        name: "Iron Maiden - Alexander The Great",
        youtubeLink:
          "https://www.youtube.com/watch?v=6BH9HvZx3nI&ab_channel=IronMaiden-Topic",
        score: 451,
      },
      {
        name: "Rhapsody - Emerald Sword",
        youtubeLink:
          "https://www.youtube.com/watch?v=gZmdu4ekAoI&ab_channel=Selbst93",
        score: 329,
      },
      {
        name: "Bee Gees - Night Fever",
        youtubeLink:
          "https://www.youtube.com/watch?v=SkypZuY6ZvA&ab_channel=BeeGeesVEVO",
        score: 0,
      },
      {
        name: "Henrique e Juliano - Colega de Caso",
        youtubeLink:
          "https://www.youtube.com/watch?v=6B5-c0EgvC4&ab_channel=HenriqueeJuliano",
        score: -1,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

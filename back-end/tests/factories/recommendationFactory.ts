import { RecommendationType } from "../../src/types/types";
import { faker } from "@faker-js/faker";

function fullUserDataFactory() {
  return {
    id: 100,
    name: "Teste",
    youtubeLink:
      "https://www.youtube.com/results?search_query=corinthians+chelsea+2012+melhores+momentos+espn",
    score: 150,
  };
}

function badRecommendationFactory() {
  return {
    id: 125,
    name: "Henrique e Juliano - Colega de Caso",
    youtubeLink:
      "https://www.youtube.com/watch?v=6B5-c0EgvC4&ab_channel=HenriqueeJuliano",
    score: -11,
  };
}

function correctDataFactory(): RecommendationType {
  return {
    name: faker.name.fullName(),
    youtubeLink:
      "https://www.youtube.com/results?search_query=corinthians+chelsea+2012+melhores+momentos+espn",
  };
}

function wrongLinkFactory(): RecommendationType {
  return {
    name: faker.name.fullName(),
    youtubeLink: "https://www.google.com",
  };
}

function missingNameFactory(): RecommendationType {
  return {
    name: "",
    youtubeLink:
      "https://www.youtube.com/results?search_query=corinthians+chelsea+2012+melhores+momentos+espn",
  };
}

function missingLinkFactory(): RecommendationType {
  return {
    name: faker.name.fullName(),
    youtubeLink: "",
  };
}

const emptyDatabase = [];

const recommendationsData = [
  {
    id: 1,
    name: "Frank Zappa - The Little House I Used To Live In",
    youtubeLink:
      "https://www.youtube.com/watch?v=XduaWFznN5s&ab_channel=FrankZappa-Topic",
    score: 13,
  },
  {
    id: 2,
    name: "Iron Maiden - The Number of The Beast",
    youtubeLink:
      "https://www.youtube.com/watch?v=fyr79sB6nGg&ab_channel=IronMaiden-Topic",
    score: 15,
  },
  {
    id: 3,
    name: "Iron Maiden - Alexander The Great",
    youtubeLink:
      "https://www.youtube.com/watch?v=6BH9HvZx3nI&ab_channel=IronMaiden-Topic",
    score: 11,
  },
  {
    id: 4,
    name: "Rhapsody - Emerald Sword",
    youtubeLink:
      "https://www.youtube.com/watch?v=gZmdu4ekAoI&ab_channel=Selbst93",
    score: 10,
  },
  {
    id: 5,
    name: "Bee Gees - Night Fever",
    youtubeLink:
      "https://www.youtube.com/watch?v=SkypZuY6ZvA&ab_channel=BeeGeesVEVO",
    score: 25,
  },
  {
    id: 6,
    name: "Henrique e Juliano - Colega de Caso",
    youtubeLink:
      "https://www.youtube.com/watch?v=6B5-c0EgvC4&ab_channel=HenriqueeJuliano",
    score: -1,
  },
  {
    id: 7,
    name: "Yes - Parallels",
    youtubeLink:
      "https://www.youtube.com/watch?v=Jsq91qrFSIA&ab_channel=IlTrovatore",
    score: 8,
  },
  {
    id: 8,
    name: "Magma - Mekanïk Destruktïw Kömmandöh",
    youtubeLink:
      "https://www.youtube.com/watch?v=yB8bktgxcQA&t=318s&ab_channel=Magma-Topic",
    score: 17,
  },
  {
    id: 9,
    name: "Magma - Hhäi",
    youtubeLink:
      "https://www.youtube.com/watch?v=MA-g77MUBDM&ab_channel=Jos%C3%A9MLe%C3%B3n",
    score: 6,
  },
  {
    id: 10,
    name: "Magma - Hhäi/Zombies (Live)",
    youtubeLink:
      "https://www.youtube.com/watch?v=bYrHNLXwGe0&list=RDMA-g77MUBDM&index=3&ab_channel=antoinegranger",
    score: 1,
  },
];

export {
  badRecommendationFactory,
  correctDataFactory,
  wrongLinkFactory,
  missingLinkFactory,
  missingNameFactory,
  fullUserDataFactory,
  recommendationsData,
  emptyDatabase,
};

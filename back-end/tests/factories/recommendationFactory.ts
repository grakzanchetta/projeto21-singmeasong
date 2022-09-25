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

export {
  badRecommendationFactory,
  correctDataFactory,
  wrongLinkFactory,
  missingLinkFactory,
  missingNameFactory,
  fullUserDataFactory,
};

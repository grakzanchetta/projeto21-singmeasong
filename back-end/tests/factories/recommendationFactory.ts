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
  correctDataFactory,
  wrongLinkFactory,
  missingLinkFactory,
  missingNameFactory,
  fullUserDataFactory,
};

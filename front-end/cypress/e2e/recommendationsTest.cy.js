/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";

const url = "http://localhost:3000/";
const resetDatabaseUrl = "http://localhost:5000/reset";
const recommendation = {
  name: faker.name.fullName(),
  youtubeLink:
    "https://www.youtube.com/watch?v=ZhUwpL2DC9A&ab_channel=EpicMetalKingdom",
};

describe("Route POST /recommendations", () => {
  it("should insert a new recommendation", () => {
    cy.visit(url);
    cy.get("input[id=elementName]").type(recommendation.name);
    cy.get("input[id=elementLink]").type(recommendation.youtubeLink);
    cy.intercept("GET", "/").as("getRecommendations");
    cy.get("button[id=post]").click();
    cy.contains(`${recommendation.name}`).should("be.visible");
  });

  it("should return an alert when a repeated recommendation is posted", () => {
    cy.get("input[id=elementName]").clear();
    cy.get("input[id=elementName]").type(recommendation.name);
    cy.get("input[id=elementLink]").type(recommendation.youtubeLink);
    cy.intercept("GET", "/").as("getRecommendations");
    cy.get("button[id=post]").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });

  it("should return an alert when empty name is posted", () => {
    cy.get("input[id=elementName]").clear();
    cy.get("input[id=elementLink]").type(recommendation.youtubeLink);
    cy.intercept("GET", "/").as("getRecommendations");
    cy.get("button[id=post]").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });

  it("should return an alert when empty link is posted", () => {
    cy.get("input[id=elementLink]").clear();
    cy.get("input[id=elementName]").type("Eu sou um nome");
    cy.intercept("GET", "/").as("getRecommendations");
    cy.get("button[id=post]").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });

  it("should return an alert when wrong link is posted", () => {
    cy.get("input[id=elementName]").clear();
    cy.get("input[id=elementLink]").clear();
    cy.get("input[id=elementName]").type("Eu sou um nome");
    cy.get("input[id=elementLink]").type("www.google.com");
    cy.intercept("GET", "/").as("getRecommendations");
    cy.get("button[id=post]").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });
});

describe("Route POST /recommendations/id/upvote", () => {
  it("should upvote in a recommendation", () => {
    for (let i = 0; i <= 5; i++) {
      cy.get("#upArrow").click();
    }
  });
});

describe("Route POST /recommendations/id/downvote", () => {
  it("should downvote in a recommendation. The minimum score of a recommendation should be -5", () => {
    for (let i = 0; i <= 5; i++) {
      cy.get("#downArrow").click();
    }
  });

  it("The minimum score of a recommendation should be -5. Below that, the recommendation must disappear", () => {
    for (let i = 0; i <= 5; i++) {
      cy.get("#downArrow").click();
    }
  });
});

describe("Route GET /recommendations", () => {
  it("should appear only 10 recommendations in the main page", () => {
    cy.visit(url);
    for (let i = 0; i <= 15; i++) {
      cy.get("input[id=elementName]").type(`Sou a recomendação ${i}`);
      cy.get("input[id=elementLink]").type(recommendation.youtubeLink);
      cy.get("button[id=post]").click();
    }
    cy.get('[data-identifier="vote-menu"]').should("have.length.lt", 11);
  });
});

describe("Route GET /top/", () => {
  it("should show the recommendations ordered by score, maximum of 10", () => {
    cy.visit(`${url}top`);
    cy.get('[data-identifier="vote-menu"]').should("have.length.lte", 10);
  });
});

describe("Route GET /random/", () => {
  it("should show a random recommendation", () => {
    cy.visit(`${url}random`);
  });
});

describe("Reset db", () => {
  it("ends the db", () => {
    cy.request(`${resetDatabaseUrl}`);
    cy.visit(`${url}`);
  });
});

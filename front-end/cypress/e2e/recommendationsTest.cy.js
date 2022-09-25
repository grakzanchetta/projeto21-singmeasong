/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";

const url = "http://localhost:3000/";
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
    cy.visit(url);
    cy.get("input[id=elementName]").type(recommendation.name);
    cy.get("input[id=elementLink]").type(recommendation.youtubeLink);
    cy.intercept("GET", "/").as("getRecommendations");
    cy.get("button[id=post]").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });
});

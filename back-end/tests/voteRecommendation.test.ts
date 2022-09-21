import app from "../src/app";
import supertest from "supertest";
import {
  deleteAllData,
  disconnectPrisma,
} from "../tests/factories/scenarioFactory";
import { prisma } from "../src/database";
import { correctDataFactory } from "../tests/factories/recommendationFactory";

beforeEach(async () => {
  await deleteAllData();
});

const agent = supertest(app);

describe("POST route '/recommendations/id/upvote' tests  ", () => {
  it("Should return 200 when a correct id is informed in the route", async () => {
    const post = correctDataFactory();
    await prisma.recommendation.create({
      data: {
        name: post.name,
        youtubeLink: post.youtubeLink,
      },
    });

    const recommendation = await prisma.recommendation.findFirst({});
    const id = Number(recommendation.id);

    const result = await agent.post(`/recommendations/${id}/upvote`);
    const status = result.status;

    expect(status).toEqual(200);
  });
  it("Should return 404 when a incorrect id is informed in the route", async () => {
    const result = await agent.post(`/recommendations/0/upvote`);
    const status = result.status;

    expect(status).toEqual(404);
  });
});

describe("POST route '/recommendations/id/downvote' tests  ", () => {
  it("Should return 200 when a correct id is informed in the route", async () => {
    const post = correctDataFactory();
    await prisma.recommendation.create({
      data: {
        name: post.name,
        youtubeLink: post.youtubeLink,
      },
    });

    const recommendation = await prisma.recommendation.findFirst({});
    const id = Number(recommendation.id);

    const result = await agent.post(`/recommendations/${id}/downvote`);
    const status = result.status;

    expect(status).toEqual(200);
  });
  it("Should return 404 when a incorrect id is informed in the route", async () => {
    const result = await agent.post(`/recommendations/0/downvote`);
    const status = result.status;

    expect(status).toEqual(404);
  });
});

afterAll(async () => {
  await disconnectPrisma();
});

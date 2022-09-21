import app from "../src/app";
import supertest from "supertest";
import {
  deleteAllData,
  disconnectPrisma,
  postRecommendationForVoting,
} from "../tests/factories/scenarioFactory";

// beforeEach(async () => {
//   await deleteAllData();
// });

const agent = supertest(app);

describe("POST route '/recommendations/id/upvote' tests  ", () => {
  it("Should return 200 when a correct id is informed in the route", async () => {
    const id = await postRecommendationForVoting();
    const result = await agent.post(`/recommendations/${id}/upvote`);
    const status = result.status;

    expect(status).toEqual(200);
  });
  it("Should return 404 when a incorrect id is informed in the route", async () => {
    const id = 0;
    const result = await agent.post(`/recommendations/${id}/upvote`);
    const status = result.status;

    expect(status).toEqual(404);
  });
});

afterAll(async () => {
  await disconnectPrisma();
});

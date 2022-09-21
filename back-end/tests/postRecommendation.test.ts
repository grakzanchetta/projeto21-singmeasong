import app from "../src/app";
import supertest from "supertest";
import {
  deleteAllData,
  disconnectPrisma,
  startConflict,
} from "../tests/factories/scenarioFactory";
import {
  correctDataFactory,
  wrongLinkFactory,
  missingLinkFactory,
  missingNameFactory,
} from "../tests/factories/recommendationFactory";

beforeEach(async () => {
  await deleteAllData();
});

const agent = supertest(app);

describe("POST route '/recommendations' tests  ", () => {
  it("Should return 201 when correct youTube video is posted", async () => {
    const body = correctDataFactory();

    const result = await agent.post("/recommendations").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });

  it("Should return 422 when an incorrect link is posted", async () => {
    const body = wrongLinkFactory();

    const result = await agent.post("/recommendations").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });

  it("Should return 422 when a youtube link isn't posted", async () => {
    const body = missingLinkFactory();

    const result = await agent.post("/recommendations").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });

  it("Should return 422 when a email isn't posted", async () => {
    const body = missingNameFactory();

    const result = await agent.post("/recommendations").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });

  it("Should return 409 when the name of the recommendation isn't unique", async () => {
    startConflict();

    const body = {
      name: "Javascript in 100 seconds",
      youtubeLink:
        "https://www.youtube.com/watch?v=DHjqpvDnNGE&ab_channel=Fireship",
    };

    const result = await agent.post("/recommendations").send(body);
    const status = result.status;

    expect(status).toEqual(409);
  });
});

afterAll(async () => {
  await disconnectPrisma();
});

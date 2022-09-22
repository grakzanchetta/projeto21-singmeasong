import app from "../src/app";
import supertest from "supertest";
import { generateRandomNumber } from "../tests/factories/mathFactory";
import {
  disconnectPrisma,
  findLastRegistry,
  deleteMyDatabase,
  recreateDatabase,
} from "./factories/scenarioFactory";

const agent = supertest(app);

describe("GET route '/recommendations' tests  ", () => {
  it("Should return 200 when a correct requisition is made", async () => {
    const result = await agent.get(`/recommendations`);

    const status = result.status;
    const body = result.body;
    const bodyLength = result.body.length;

    expect(status).toEqual(200);
    expect(body).toBeInstanceOf(Array);
    expect(bodyLength).toBeLessThanOrEqual(10);
  });
});

describe("GET route '/recommendations/:id' tests  ", () => {
  it("Should return 200 when an correct id is informed. ", async () => {
    const id = generateRandomNumber(1, 12);
    const result = await agent.get(`/recommendations/${id}`);
    const status = result.status;

    expect(result.body).toBeInstanceOf(Object);
    expect(status).toEqual(200);
  });
  it("Should return 404 when an incorrect id is informed. ", async () => {
    const id = 0;
    const result = await agent.get(`/recommendations/${id}`);
    const status = result.status;

    expect(status).toEqual(404);
  });
  it("Should return 500 when something that isn't a number is informed. ", async () => {
    const result = await agent.get(`/recommendations/x`);
    const status = result.status;

    expect(status).toEqual(500);
  });
});

describe("GET route '/recommendations/top/:amount' tests  ", () => {
  it("Should return 200 when an correct amount is informed. ", async () => {
    const lastSong = await findLastRegistry();
    const lastSongId = lastSong[0].id;
    const amount = generateRandomNumber(0, lastSongId);

    const result = await agent.get(`/recommendations/top/${amount}`);
    const status = result.status;
    const body = result.body;
    const bodyLength = result.body.length;

    expect(status).toEqual(200);
    expect(body).toBeInstanceOf(Array);
    expect(bodyLength).toBeLessThanOrEqual(amount);
  });
  it("Should return 200 even when the amount is greater than the number of songs", async () => {
    const lastSong = await findLastRegistry();
    const lastSongId = lastSong[0].id;
    const amount = generateRandomNumber(lastSongId, lastSongId * 2);

    const result = await agent.get(`/recommendations/top/${amount}`);
    const status = result.status;
    const body = result.body;
    const bodyLength = result.body.length;

    expect(status).toEqual(200);
    expect(body).toBeInstanceOf(Array);
    expect(bodyLength).toBeLessThanOrEqual(amount);
  });
  it("Should return 500 when something that isn't a number is informed. ", async () => {
    const result = await agent.get(`/recommendations/top/x`);
    const status = result.status;

    expect(status).toEqual(500);
  });
});

describe("GET route '/recommendations/random' tests  ", () => {
  it("Should return 200 when the database isn't empty", async () => {
    const result = await agent.get(`/recommendations/random`);

    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toEqual(200);
  });
  it("Should return 404 when the database is empty", async () => {
    await deleteMyDatabase();
    const result = await agent.get(`/recommendations/random`);
    expect(result.status).toEqual(404);
    await recreateDatabase();
  });
});

afterAll(async () => {
  await disconnectPrisma();
});

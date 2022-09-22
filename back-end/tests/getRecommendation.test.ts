import app from "../src/app";
import supertest from "supertest";
import { generateRandomNumber } from "../tests/factories/mathFactory";

const agent = supertest(app);

describe("GET route '/recommendations' tests  ", () => {
  it("Should return 200 when a correct requisition is made", async () => {
    const result = await agent.get(`/recommendations`);

    const status = result.status;
    const body = result.body;
    const bodyLength = result.body.length;
    console.log(body);

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

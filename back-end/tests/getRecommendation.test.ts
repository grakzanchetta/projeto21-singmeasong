import app from "../src/app";
import supertest from "supertest";

const agent = supertest(app);

describe("GET route '/recommendations' tests  ", () => {
  it("Should return 200 when a correct requisition is made", async () => {
    const result = await agent.get(`/recommendations`);
    const status = result.status;
    console.log(result.body);

    expect(result.body).toBeInstanceOf(Object);
    expect(status).toEqual(200);
  });
  it("Lalalala", async () => {});
});

import app from "../src/app";
import supertest from "supertest";
import { prisma } from "../src/database";
import {
  deleteAllData,
  disconnectPrisma,
} from "../tests/factories/scenarioFactory";

beforeEach(async () => {
  await deleteAllData();
});

const agent = supertest(app);

describe("arquivo testado", () => {
  it("returns true for valid params", () => {
    // Aqui vai o código desse teste
  });

  it("returns false for invalid params", () => {
    // Aqui vai o código desse teste
  });
});

afterAll(async () => {
  await disconnectPrisma();
});

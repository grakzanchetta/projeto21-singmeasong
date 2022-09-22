import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import {
  correctDataFactory,
  fullUserDataFactory,
} from "../factories/recommendationFactory";
import * as errors from "../../src/utils/errorUtils";

const rightRecommendation = correctDataFactory();
const fullUserData = fullUserDataFactory();

test("in the insert recommendation service, the video should be inserted if correct data is posted", async () => {
  jest
    .spyOn(recommendationRepository, "findByName")
    .mockResolvedValueOnce(null);

  jest.spyOn(recommendationRepository, "create");

  await recommendationService.insert(rightRecommendation);
  expect(recommendationRepository.create).toBeCalledTimes(1);
});

test("in the insert recommendation service, the video should not be inserted if the name is repeated", async () => {
  jest
    .spyOn(recommendationRepository, "findByName")
    .mockResolvedValueOnce(fullUserData);
  const query = recommendationService.insert(rightRecommendation);

  expect(query).rejects.toEqual(
    errors.conflictError("Recommendations names must be unique")
  );
});

test("in the upvote recommendation service, a song with a valid id can be upvoted", async () => {
  jest
    .spyOn(recommendationRepository, "find")
    .mockResolvedValueOnce(fullUserData);

  jest
    .spyOn(recommendationRepository, "updateScore")
    .mockResolvedValueOnce({ ...fullUserData, score: fullUserData.score + 1 });

  await recommendationService.upvote(fullUserData.id);
  expect(recommendationRepository.updateScore).toBeCalledTimes(1);
});

test("in the upvote recommendation service, a song with an invalid id cannot be upvoted", async () => {
  jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

  const query = recommendationService.upvote(1);
  expect(query).rejects.toEqual(errors.notFoundError(""));
});

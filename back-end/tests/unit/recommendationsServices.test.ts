import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import {
  badRecommendationFactory,
  correctDataFactory,
  fullUserDataFactory,
} from "../factories/recommendationFactory";
import * as errors from "../../src/utils/errorUtils";

const rightRecommendation = correctDataFactory();
const fullUserData = fullUserDataFactory();
const badUserData = badRecommendationFactory();

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Recommendation Service Unity Tests", () => {
  it("Should insert a recommendation", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(rightRecommendation);

    expect(recommendationRepository.findByName).toBeCalledTimes(1);
    expect(recommendationRepository.create).toBeCalledTimes(1);
  });
  it("Shouldn't insert a repeated recommendation name", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return {
          rightRecommendation,
        };
      });

    const query = recommendationService.insert(rightRecommendation);

    expect(query).rejects.toEqual(
      errors.conflictError("Recommendations names must be unique")
    );
  });
  it("Should upvote a recommendation", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          fullUserData,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {};
      });

    await recommendationService.upvote(fullUserData.id);

    expect(recommendationRepository.updateScore).toBeCalledTimes(1);
    expect(recommendationRepository.find).toBeCalledTimes(1);
  });

  it("Shouldn't upvote a recommendation that doesn't exist", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    const query = recommendationService.upvote(fullUserData.id);

    expect(query).rejects.toEqual(errors.notFoundError(""));
  });

  it("Should downvote a recommendation", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          fullUserData,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {};
      });

    await recommendationService.downvote(fullUserData.id);

    expect(recommendationRepository.updateScore).toBeCalledTimes(1);
    expect(recommendationRepository.find).toBeCalledTimes(1);
  });

  it("Shouldn't downvote a recommendation that doesn't exist", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    const query = recommendationService.downvote(fullUserData.id);

    expect(query).rejects.toEqual(errors.notFoundError(""));
  });
});

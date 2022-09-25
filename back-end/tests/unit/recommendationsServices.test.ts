import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import {
  badRecommendationFactory,
  correctDataFactory,
  fullUserDataFactory,
  recommendationsData,
} from "../factories/recommendationFactory";
import * as errors from "../../src/utils/errorUtils";
import { generateRandomNumber } from "../factories/mathFactory";

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

  it("Should remove a recommendation with a score of -6 or less", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(badUserData);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...badUserData, score: -325 });

    jest.spyOn(recommendationRepository, "remove").mockResolvedValueOnce();

    await recommendationService.downvote(badUserData.id);

    expect(recommendationRepository.updateScore).toBeCalledTimes(1);
    expect(recommendationRepository.find).toBeCalledTimes(1);
    expect(recommendationRepository.remove).toBeCalledTimes(1);
  });

  it("should get the 10 latest recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {});

    await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalledTimes(1);
  });

  it("should get recommendation by id", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          fullUserData,
        };
      });

    await recommendationService.getById(fullUserData.id);

    expect(recommendationRepository.find).toBeCalledTimes(1);
  });

  it("should throw an error if the id doesn't exist", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    const query = recommendationService.getById(fullUserData.id);

    expect(query).rejects.toEqual(errors.notFoundError(""));
  });
  it("should get a random recommendation", async () => {
    jest.spyOn(Math, "random").mockReturnValueOnce(0.6);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(recommendationsData);

    const query = await recommendationService.getRandom();
    console.log(query);
    const id = query.id;

    expect(query.score).toEqual(recommendationsData[id - 1].score);
  });

  it("should throw an error if the data doesn't exist", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);
    try {
      await recommendationService.getRandom();
    } catch (error) {
      expect(error.type).toBe("not_found");
    }
  });

  it("should get the recommendations by an amount", async () => {
    const amount = generateRandomNumber(1, 10);

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.getTop(amount);

    expect(recommendationRepository.getAmountByScore).toBeCalledTimes(1);
  });
});

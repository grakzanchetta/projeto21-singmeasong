import * as models from "@prisma/client";

type RecommendationType = Omit<models.Recommendation, "id" | "score">;

export { RecommendationType };

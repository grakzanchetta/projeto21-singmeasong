import { Router } from "express";
import { reset } from "../controllers/testController.js";

const testRouter = Router();

testRouter.get("/reset", reset);

export default testRouter;

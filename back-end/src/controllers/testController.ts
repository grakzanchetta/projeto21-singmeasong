import { Request, Response } from "express";
import { deleteData } from "../services/testService.js";

async function reset(req: Request, res: Response) {
  await deleteData();

  res.sendStatus(200);
}

export { reset };

import { Request, Response } from "express";
import { recommendationService } from "../services/recommendationsService.js";

async function reset(req: Request, res: Response) {
  await recommendationService.truncate();

  res.sendStatus(200);
}

async function seed(req: Request, res: Response) {
  await recommendationService.seed();

  res.sendStatus(200);
}

export default {
  reset,
  seed,
}
import { Request, Response } from "express";
import { e2eTestsService } from "../services/e2eTestsService.js";

async function reset(req: Request, res: Response) {
  await e2eTestsService.truncate();

  res.sendStatus(200);
}

async function seed(req: Request, res: Response) {
  await e2eTestsService.seed();

  res.sendStatus(200);
}

export default {
  reset,
  seed,
}
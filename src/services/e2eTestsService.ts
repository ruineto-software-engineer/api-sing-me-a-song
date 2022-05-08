import { e2eTestsRepository } from "../repositories/e2eTestsRepository.js";

async function truncate() {
  await e2eTestsRepository.truncate();
}

async function seed() {
  await e2eTestsRepository.seed();
}

export const e2eTestsService = {
  truncate,
  seed,
};

import { Prisma } from "@prisma/client";
import { prisma } from "../database.js";
import { CreateRecommendationData } from "../services/recommendationsService.js";

async function create(createRecommendationData: CreateRecommendationData) {
  await prisma.recommendation.create({
    data: createRecommendationData,
  });
}

interface FindAllWhere {
  score: number;
  scoreFilter: "lte" | "gt";
}

function findAll(findAllWhere?: FindAllWhere) {
  const filter = getFindAllFilter(findAllWhere);

  return prisma.recommendation.findMany({
    where: filter,
    orderBy: { id: "desc" }
  });
}

function getAmountByScore(take: number) {
  return prisma.recommendation.findMany({
    orderBy: { score: "desc" },
    take,
  });
}

function getFindAllFilter(
  findAllWhere?: FindAllWhere
): Prisma.RecommendationWhereInput {
  if (!findAllWhere) return {};

  const { score, scoreFilter } = findAllWhere;

  return {
    score: { [scoreFilter]: score },
  };
}

function find(id: number) {
  return prisma.recommendation.findUnique({
    where: { id },
  });
}

async function updateScore(id: number, operation: "increment" | "decrement") {
  await prisma.recommendation.update({
    where: { id },
    data: {
      score: { [operation]: 1 },
    },
  });
}

async function remove(id: number) {
  await prisma.recommendation.delete({
    where: { id },
  });
}

async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

async function seed() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: 'Falamansa - Xote dos Milagres',
        youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y'
      },
      {
        name: "Chitãozinho E Xororó - Evidências",
        youtubeLink: "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
        score: 245
      },
      {
        name: "STARSET - UNVEILING THE ARCHITECTURE",
        youtubeLink: "https://www.youtube.com/watch?v=qr4HxlCx4hA&list=PLFd7LxIsegi0E-QtSUV-INVojiEtPV8iI",
        score: 112
      }
    ]
  });
}

export const recommendationRepository = {
  create,
  findAll,
  find,
  updateScore,
  getAmountByScore,
  remove,
  truncate,
  seed,
};

import { prisma } from "../database.js";

async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

async function seed() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: "Falamansa - Xote dos Milagres",
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
      },
      {
        name: "Chitãozinho E Xororó - Evidências",
        youtubeLink:
          "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
        score: 245,
      },
      {
        name: "STARSET - UNVEILING THE ARCHITECTURE",
        youtubeLink:
          "https://www.youtube.com/watch?v=qr4HxlCx4hA&list=PLFd7LxIsegi0E-QtSUV-INVojiEtPV8iI",
        score: 112,
      },
    ],
  });
}

export const e2eTestsRepository = {
  truncate,
  seed,
};

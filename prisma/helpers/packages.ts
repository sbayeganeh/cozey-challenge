import prisma from "../../lib/prisma";

export const fetchPackages = async () => {
  return await prisma.packages.findMany({
    include: { products: true },
  });
};

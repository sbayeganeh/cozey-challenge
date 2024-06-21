import prisma from "../../lib/prisma";

export const fetchOrders = async () => {
  return await prisma.orders.findMany({
    include: { orderPackages: true },
  });
};

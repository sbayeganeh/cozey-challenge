import { PrismaClient } from "@prisma/client";
import { packagesData, productsData } from "~/data/packages"
import { orders } from "~/data/orders"


async function seed() {
  const prisma = new PrismaClient();

  try {

    await prisma.packages.deleteMany()
    await prisma.products.deleteMany()
    await prisma.orders.deleteMany()
    await prisma.orderPackages.deleteMany()


    // Insert packages and products into the database tables "Packages" and "Products" respectively
    for (const package_name in packagesData) {
      const pack = packagesData[package_name];
      const packageDbEntry = await prisma.packages.create({
        data: {
          name: package_name
        }
      })

      for (let product in pack) {
        const prod = pack[product]
        const id = prod.product_id;
        const quantity = prod.quantity;
        const productName = productsData[Object.keys(productsData).find(index => index == id) as any].product_name;

        await prisma.products.create({
          data: {
            id,
            product_name: productName,
            package_id: packageDbEntry.id,
            quantity // Ignore the typescript error on this line. quantity in fact exists on this model
          }
        })
      }
    }

    // Insert orders into the database
    for (const order of orders) {
      const orderDbEntry = await prisma.orders.create({
        data: {
          id: order.id,
          total: order.total,
          date: order.date,
          address: order.address,
          customer_name: order.customer_name,
          customer_email: order.customer_email,
        }
      })

      for (const orderPackage of order.line_items) {
        await prisma.orderPackages.create({
          data: {
            id: orderPackage.id,
            order_id: order.id,
            package_id: orderPackage.product_id,
            price: orderPackage.price,
          }
        })
      }
    }

    console.log("Seed data has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }

}

seed();

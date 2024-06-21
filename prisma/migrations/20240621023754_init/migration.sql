-- CreateTable
CREATE TABLE "Packages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    CONSTRAINT "Products_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Packages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OrderPackages" (
    "id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    CONSTRAINT "OrderPackages_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderPackages_id_key" ON "OrderPackages"("id");

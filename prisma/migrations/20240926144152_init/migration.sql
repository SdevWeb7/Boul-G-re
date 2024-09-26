-- CreateTable
CREATE TABLE "Bakery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownedByUserId" TEXT NOT NULL,
    CONSTRAINT "Bakery_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recette" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "instructions" TEXT NOT NULL,
    "image" TEXT,
    "bakeryId" TEXT NOT NULL,
    CONSTRAINT "Recette_bakeryId_fkey" FOREIGN KEY ("bakeryId") REFERENCES "Bakery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecetteOnProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ingredientId" TEXT NOT NULL,
    "recetteId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "RecetteOnProduct_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RecetteOnProduct_recetteId_fkey" FOREIGN KEY ("recetteId") REFERENCES "Recette" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductOnInventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    CONSTRAINT "ProductOnInventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductOnInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bakeryId" TEXT NOT NULL,
    CONSTRAINT "Inventory_bakeryId_fkey" FOREIGN KEY ("bakeryId") REFERENCES "Bakery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StaffMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "bakeryId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StaffMember_bakeryId_fkey" FOREIGN KEY ("bakeryId") REFERENCES "Bakery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DaysAtWork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" DATETIME NOT NULL,
    "ofStaffMemberId" TEXT NOT NULL,
    CONSTRAINT "DaysAtWork_ofStaffMemberId_fkey" FOREIGN KEY ("ofStaffMemberId") REFERENCES "StaffMember" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bakery_ownedByUserId_key" ON "Bakery"("ownedByUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_bakeryId_key" ON "Inventory"("bakeryId");

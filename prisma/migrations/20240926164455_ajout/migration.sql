/*
  Warnings:

  - Added the required column `name` to the `Bakery` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bakery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownedByUserId" TEXT NOT NULL,
    CONSTRAINT "Bakery_ownedByUserId_fkey" FOREIGN KEY ("ownedByUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bakery" ("id", "ownedByUserId") SELECT "id", "ownedByUserId" FROM "Bakery";
DROP TABLE "Bakery";
ALTER TABLE "new_Bakery" RENAME TO "Bakery";
CREATE UNIQUE INDEX "Bakery_ownedByUserId_key" ON "Bakery"("ownedByUserId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

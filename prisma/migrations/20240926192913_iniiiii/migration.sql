-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bakery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownedByUserId" TEXT NOT NULL
);
INSERT INTO "new_Bakery" ("id", "name", "ownedByUserId") SELECT "id", "name", "ownedByUserId" FROM "Bakery";
DROP TABLE "Bakery";
ALTER TABLE "new_Bakery" RENAME TO "Bakery";
CREATE UNIQUE INDEX "Bakery_ownedByUserId_key" ON "Bakery"("ownedByUserId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "avatarImgSrc" TEXT,
    "hasAccess" BOOLEAN NOT NULL DEFAULT true,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "resetPasswordToken" TEXT,
    "resetPasswordTokenExpiry" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bakeryId" TEXT,
    CONSTRAINT "User_bakeryId_fkey" FOREIGN KEY ("bakeryId") REFERENCES "Bakery" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarImgSrc", "createdAt", "email", "firstname", "hasAccess", "hashedPassword", "id", "isAdmin", "lastname", "resetPasswordToken", "resetPasswordTokenExpiry") SELECT "avatarImgSrc", "createdAt", "email", "firstname", "hasAccess", "hashedPassword", "id", "isAdmin", "lastname", "resetPasswordToken", "resetPasswordTokenExpiry" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_resetPasswordToken_key" ON "User"("resetPasswordToken");
CREATE UNIQUE INDEX "User_bakeryId_key" ON "User"("bakeryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

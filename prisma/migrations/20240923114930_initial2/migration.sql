/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("avatarImgSrc", "email", "firstname", "hasAccess", "hashedPassword", "id", "isAdmin", "lastname", "resetPasswordToken", "resetPasswordTokenExpiry") SELECT "avatarImgSrc", "email", "firstname", "hasAccess", "hashedPassword", "id", "isAdmin", "lastname", "resetPasswordToken", "resetPasswordTokenExpiry" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_resetPasswordToken_key" ON "User"("resetPasswordToken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

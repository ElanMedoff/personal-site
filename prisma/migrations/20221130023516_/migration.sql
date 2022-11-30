/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `Session` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("expiresAt", "id", "userId") SELECT "expiresAt", "id", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - You are about to drop the column `balance` on the `PlannerSettings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlannerSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "monthlyIncome" DECIMAL NOT NULL DEFAULT 1600,
    "recurring" DECIMAL NOT NULL DEFAULT 650,
    "extraSavings" DECIMAL NOT NULL DEFAULT 0,
    "days" INTEGER NOT NULL DEFAULT 30,
    "mode" TEXT NOT NULL DEFAULT 'soft',
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PlannerSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PlannerSettings" ("days", "id", "mode", "recurring", "updatedAt", "userId") SELECT "days", "id", "mode", "recurring", "updatedAt", "userId" FROM "PlannerSettings";
DROP TABLE "PlannerSettings";
ALTER TABLE "new_PlannerSettings" RENAME TO "PlannerSettings";
CREATE UNIQUE INDEX "PlannerSettings_userId_key" ON "PlannerSettings"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

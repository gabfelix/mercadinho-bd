/*
  Warnings:

  - You are about to alter the column `suggestedPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `name` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amountInStock" INTEGER NOT NULL,
    "suggestedPrice" REAL NOT NULL,
    "providerId" INTEGER NOT NULL,
    CONSTRAINT "Product_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("amountInStock", "id", "name", "providerId", "suggestedPrice") SELECT "amountInStock", "id", "name", "providerId", "suggestedPrice" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Provider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contactId" INTEGER NOT NULL,
    CONSTRAINT "Provider_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Provider" ("cnpj", "contactId", "id") SELECT "cnpj", "contactId", "id" FROM "Provider";
DROP TABLE "Provider";
ALTER TABLE "new_Provider" RENAME TO "Provider";
CREATE UNIQUE INDEX "Provider_cnpj_key" ON "Provider"("cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

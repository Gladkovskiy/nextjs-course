/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ingredient" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

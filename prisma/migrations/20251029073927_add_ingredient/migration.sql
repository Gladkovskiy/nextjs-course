-- CreateEnum
CREATE TYPE "Category" AS ENUM ('VEGETABLES', 'FRUITS', 'MEAT', 'DAIRY', 'SPICES', 'OTHER');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('GRAMS', 'KILOGRAMS', 'LITERS', 'MILILITERS', 'PIECES');

-- CreateTable
CREATE TABLE "ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "unit" "Unit" NOT NULL,
    "pricePerUnit" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - Added the required column `logo` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "logo" TEXT NOT NULL;

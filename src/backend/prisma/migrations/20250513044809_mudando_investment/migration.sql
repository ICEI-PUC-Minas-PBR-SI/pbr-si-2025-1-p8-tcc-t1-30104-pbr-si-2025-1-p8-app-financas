/*
  Warnings:

  - You are about to drop the column `rate_value` on the `investment` table. All the data in the column will be lost.
  - Added the required column `rateValue` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investment` DROP COLUMN `rate_value`,
    ADD COLUMN `rateValue` DOUBLE NOT NULL;

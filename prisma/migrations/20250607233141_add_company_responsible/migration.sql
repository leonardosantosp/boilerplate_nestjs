/*
  Warnings:

  - Added the required column `responsibleId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `responsibleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

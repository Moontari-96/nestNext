/*
  Warnings:

  - You are about to drop the column `userName` on the `board` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `board` DROP FOREIGN KEY `Board_userName_fkey`;

-- DropIndex
DROP INDEX `Board_userName_fkey` ON `board`;

-- AlterTable
ALTER TABLE `board` DROP COLUMN `userName`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

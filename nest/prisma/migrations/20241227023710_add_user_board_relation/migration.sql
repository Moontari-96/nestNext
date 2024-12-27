-- CreateTable
CREATE TABLE `Board` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

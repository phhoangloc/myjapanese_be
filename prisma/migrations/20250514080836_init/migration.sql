-- CreateTable
CREATE TABLE `Exercire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archive` VARCHAR(191) NOT NULL DEFAULT 'exercireOne',
    `question` TEXT NOT NULL,
    `choose` TEXT NOT NULL,
    `script` TEXT NULL,
    `explain` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/*
  Warnings:

  - You are about to drop the `Exercire` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Exercire`;

-- CreateTable
CREATE TABLE `Exercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archive` VARCHAR(191) NOT NULL DEFAULT 'exercire',
    `part` ENUM('chisiki', 'dockai', 'chokai') NOT NULL DEFAULT 'chisiki',
    `mondai` VARCHAR(191) NOT NULL DEFAULT 'ichi',
    `question` TEXT NOT NULL,
    `choose` TEXT NOT NULL,
    `script` TEXT NULL,
    `explain` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

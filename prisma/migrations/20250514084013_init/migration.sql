-- AlterTable
ALTER TABLE `Exercire` ADD COLUMN `mondai` VARCHAR(191) NOT NULL DEFAULT 'ichi',
    ADD COLUMN `part` ENUM('chisiki', 'dockai', 'chokai') NOT NULL DEFAULT 'chisiki',
    MODIFY `archive` VARCHAR(191) NOT NULL DEFAULT 'exercire';

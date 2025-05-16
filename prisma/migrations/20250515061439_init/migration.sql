/*
  Warnings:

  - The values [dockai] on the enum `Exercise_part` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Exercise` MODIFY `part` ENUM('chisiki', 'dokkai', 'chokai') NOT NULL DEFAULT 'chisiki';

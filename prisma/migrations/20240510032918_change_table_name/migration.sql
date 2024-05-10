/*
  Warnings:

  - You are about to drop the `map_r_content_r_taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `map_t_content_t_taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `r_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `r_field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `r_taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_taxonomy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `map_r_content_r_taxonomy` DROP FOREIGN KEY `map_r_content_r_taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `map_r_content_r_taxonomy` DROP FOREIGN KEY `map_r_content_r_taxonomy_ibfk_2`;

-- DropForeignKey
ALTER TABLE `map_t_content_t_taxonomy` DROP FOREIGN KEY `map_t_content_t_taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `map_t_content_t_taxonomy` DROP FOREIGN KEY `map_t_content_t_taxonomy_ibfk_2`;

-- DropForeignKey
ALTER TABLE `r_content` DROP FOREIGN KEY `r_content_ibfk_1`;

-- DropForeignKey
ALTER TABLE `r_field` DROP FOREIGN KEY `r_field_ibfk_1`;

-- DropForeignKey
ALTER TABLE `r_taxonomy` DROP FOREIGN KEY `r_taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `t_field` DROP FOREIGN KEY `t_field_ibfk_1`;

-- DropTable
DROP TABLE `map_r_content_r_taxonomy`;

-- DropTable
DROP TABLE `map_t_content_t_taxonomy`;

-- DropTable
DROP TABLE `r_content`;

-- DropTable
DROP TABLE `r_field`;

-- DropTable
DROP TABLE `r_taxonomy`;

-- DropTable
DROP TABLE `t_content`;

-- DropTable
DROP TABLE `t_field`;

-- DropTable
DROP TABLE `t_taxonomy`;

-- CreateTable
CREATE TABLE `map_Content_Taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Content_id` INTEGER NOT NULL,
    `Taxonomy_id` INTEGER NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `content_id`(`Content_id`),
    INDEX `taxonomy_id`(`Taxonomy_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `map_ContentType_TaxonomyType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TaxonomyType_id` INTEGER NOT NULL,
    `ContentType_id` INTEGER NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`TaxonomyType_id`),
    INDEX `type_id`(`ContentType_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `body` TEXT NULL,
    `ContentType_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `type_id`(`ContentType_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `name` VARCHAR(255) NULL,
    `value` TEXT NULL,
    `Content_id` INTEGER NULL,

    INDEX `content_id`(`Content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TaxonomyType_id` INTEGER NULL,
    `name` VARCHAR(200) NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`TaxonomyType_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FieldType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `ContentType_id` INTEGER NULL,
    `data_type` VARCHAR(20) NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `type_id`(`ContentType_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaxonomyType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `map_Content_Taxonomy` ADD CONSTRAINT `map_Content_Taxonomy_ibfk_1` FOREIGN KEY (`Content_id`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_Content_Taxonomy` ADD CONSTRAINT `map_Content_Taxonomy_ibfk_2` FOREIGN KEY (`Taxonomy_id`) REFERENCES `Taxonomy`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_ContentType_TaxonomyType` ADD CONSTRAINT `map_ContentType_TaxonomyType_ibfk_1` FOREIGN KEY (`TaxonomyType_id`) REFERENCES `TaxonomyType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_ContentType_TaxonomyType` ADD CONSTRAINT `map_ContentType_TaxonomyType_ibfk_2` FOREIGN KEY (`ContentType_id`) REFERENCES `ContentType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_ibfk_1` FOREIGN KEY (`ContentType_id`) REFERENCES `ContentType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_ibfk_1` FOREIGN KEY (`Content_id`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Taxonomy` ADD CONSTRAINT `Taxonomy_ibfk_1` FOREIGN KEY (`TaxonomyType_id`) REFERENCES `TaxonomyType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `FieldType` ADD CONSTRAINT `FieldType_ibfk_1` FOREIGN KEY (`ContentType_id`) REFERENCES `ContentType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

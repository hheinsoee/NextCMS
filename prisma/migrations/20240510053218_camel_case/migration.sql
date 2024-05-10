/*
  Warnings:

  - You are about to drop the column `ContentType_id` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `create_time` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `create_time` on the `contenttype` table. All the data in the column will be lost.
  - You are about to drop the column `Content_id` on the `field` table. All the data in the column will be lost.
  - You are about to drop the column `create_time` on the `field` table. All the data in the column will be lost.
  - You are about to drop the column `ContentType_id` on the `fieldtype` table. All the data in the column will be lost.
  - You are about to drop the column `create_time` on the `fieldtype` table. All the data in the column will be lost.
  - You are about to drop the column `data_type` on the `fieldtype` table. All the data in the column will be lost.
  - You are about to drop the column `TaxonomyType_id` on the `taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `create_time` on the `taxonomy` table. All the data in the column will be lost.
  - You are about to drop the column `create_time` on the `taxonomytype` table. All the data in the column will be lost.
  - You are about to drop the `map_content_taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `map_contenttype_taxonomytype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_ibfk_1`;

-- DropForeignKey
ALTER TABLE `field` DROP FOREIGN KEY `Field_ibfk_1`;

-- DropForeignKey
ALTER TABLE `fieldtype` DROP FOREIGN KEY `FieldType_ibfk_1`;

-- DropForeignKey
ALTER TABLE `map_content_taxonomy` DROP FOREIGN KEY `map_Content_Taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `map_content_taxonomy` DROP FOREIGN KEY `map_Content_Taxonomy_ibfk_2`;

-- DropForeignKey
ALTER TABLE `map_contenttype_taxonomytype` DROP FOREIGN KEY `map_ContentType_TaxonomyType_ibfk_1`;

-- DropForeignKey
ALTER TABLE `map_contenttype_taxonomytype` DROP FOREIGN KEY `map_ContentType_TaxonomyType_ibfk_2`;

-- DropForeignKey
ALTER TABLE `taxonomy` DROP FOREIGN KEY `Taxonomy_ibfk_1`;

-- AlterTable
ALTER TABLE `content` DROP COLUMN `ContentType_id`,
    DROP COLUMN `create_time`,
    ADD COLUMN `contentTypeId` INTEGER NULL,
    ADD COLUMN `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `contenttype` DROP COLUMN `create_time`,
    ADD COLUMN `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `field` DROP COLUMN `Content_id`,
    DROP COLUMN `create_time`,
    ADD COLUMN `contentId` INTEGER NULL,
    ADD COLUMN `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `fieldtype` DROP COLUMN `ContentType_id`,
    DROP COLUMN `create_time`,
    DROP COLUMN `data_type`,
    ADD COLUMN `contentTypeId` INTEGER NULL,
    ADD COLUMN `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `dataType` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `taxonomy` DROP COLUMN `TaxonomyType_id`,
    DROP COLUMN `create_time`,
    ADD COLUMN `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `taxonomyTypeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `taxonomytype` DROP COLUMN `create_time`,
    ADD COLUMN `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- DropTable
DROP TABLE `map_content_taxonomy`;

-- DropTable
DROP TABLE `map_contenttype_taxonomytype`;

-- CreateTable
CREATE TABLE `mapContentTaxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contentId` INTEGER NOT NULL,
    `taxonomyId` INTEGER NOT NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `contentId`(`contentId`),
    INDEX `taxonomy_id`(`taxonomyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapContentTypeTaxonomytype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taxonomyTypeId` INTEGER NOT NULL,
    `contentTypeId` INTEGER NOT NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`taxonomyTypeId`),
    INDEX `type_id`(`contentTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `type_id` ON `content`(`contentTypeId`);

-- CreateIndex
CREATE INDEX `contentId` ON `field`(`contentId`);

-- CreateIndex
CREATE INDEX `type_id` ON `fieldtype`(`contentTypeId`);

-- CreateIndex
CREATE INDEX `taxonomy_id` ON `taxonomy`(`taxonomyTypeId`);

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `Content_ibfk_1` FOREIGN KEY (`contentTypeId`) REFERENCES `contentType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `field` ADD CONSTRAINT `Field_ibfk_1` FOREIGN KEY (`contentId`) REFERENCES `content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fieldtype` ADD CONSTRAINT `FieldType_ibfk_1` FOREIGN KEY (`contentTypeId`) REFERENCES `contentType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mapContentTaxonomy` ADD CONSTRAINT `map_Content_Taxonomy_ibfk_1` FOREIGN KEY (`contentId`) REFERENCES `content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mapContentTaxonomy` ADD CONSTRAINT `map_Content_Taxonomy_ibfk_2` FOREIGN KEY (`taxonomyId`) REFERENCES `taxonomy`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mapContentTypeTaxonomytype` ADD CONSTRAINT `map_ContentType_TaxonomyType_ibfk_1` FOREIGN KEY (`taxonomyTypeId`) REFERENCES `taxonomytype`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mapContentTypeTaxonomytype` ADD CONSTRAINT `map_ContentType_TaxonomyType_ibfk_2` FOREIGN KEY (`contentTypeId`) REFERENCES `contentType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `taxonomy` ADD CONSTRAINT `Taxonomy_ibfk_1` FOREIGN KEY (`taxonomyTypeId`) REFERENCES `taxonomytype`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

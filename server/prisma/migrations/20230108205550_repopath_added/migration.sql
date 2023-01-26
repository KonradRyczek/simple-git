/*
  Warnings:

  - A unique constraint covering the columns `[repopath]` on the table `repos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `repopath` to the `repos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repos" ADD COLUMN     "repopath" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "repos_repopath_key" ON "repos"("repopath");

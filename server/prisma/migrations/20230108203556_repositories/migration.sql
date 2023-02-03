-- CreateTable
CREATE TABLE "repos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reponame" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "repos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "repos" ADD CONSTRAINT "repos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

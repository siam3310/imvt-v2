-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "watchListType" AS ENUM ('watching', 'on_hold', 'plan_to_watch', 'dropped', 'completed');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'Unknown',
    "email" TEXT NOT NULL,
    "profile_photo" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlistItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "mediaType" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "watchListType" "watchListType" NOT NULL DEFAULT 'plan_to_watch',
    "userId" UUID NOT NULL,

    CONSTRAINT "watchlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "watchlistItem" ADD CONSTRAINT "watchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "watchlistItem" DROP CONSTRAINT "watchlistItem_userId_fkey";

-- AddForeignKey
ALTER TABLE "watchlistItem" ADD CONSTRAINT "watchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "verificationToken" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

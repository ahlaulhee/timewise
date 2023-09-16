-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TODO', 'INPROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "ToDo" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'TODO',
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "timeSpent" SET DEFAULT '0:0:0';

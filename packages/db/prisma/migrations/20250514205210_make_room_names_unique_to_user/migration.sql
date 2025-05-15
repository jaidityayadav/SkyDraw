/*
  Warnings:

  - A unique constraint covering the columns `[name,adminId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_name_adminId_key" ON "Room"("name", "adminId");

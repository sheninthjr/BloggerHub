/*
  Warnings:

  - A unique constraint covering the columns `[friends]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sendFriendReq]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_friends_key" ON "User"("friends");

-- CreateIndex
CREATE UNIQUE INDEX "User_sendFriendReq_key" ON "User"("sendFriendReq");

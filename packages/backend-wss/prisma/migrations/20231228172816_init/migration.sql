-- CreateTable
CREATE TABLE "ChatUser" (
    "id" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "messages" TEXT NOT NULL,

    CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("id")
);

import { auth } from "@clerk/nextjs";

import db from "@/lib/db";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async () => {
  const { userId: userID } = auth();

  if (!userID) {
    return;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userID,
    },
  });

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: { userID },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await db.userApiLimit.create({
      data: { userID, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId: userID } = auth();

  if (!userID) {
    return false;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userID,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId: userID } = auth();

  if (!userID) {
    return 0;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userID,
    },
  });

  return userApiLimit ? userApiLimit.count : 0;
};

import { auth } from "@clerk/nextjs";

import db from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId: userID } = auth();

  if (!userID) {
    return false;
  }

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userID,
    },
    select: {
      stripeSubscriptionID: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerID: true,
      stripePriceID: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceID &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};

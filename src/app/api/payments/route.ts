import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import Stripe from "stripe";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId: userID } = auth();
    const user = await currentUser();

    if (!userID || !user) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userID,
      },
    });

    let stripeSession:
      | Stripe.BillingPortal.Session
      | Stripe.Checkout.Session
      | null = null;
    if (userSubscription && userSubscription.stripeCustomerID) {
      stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerID,
        return_url: settingsUrl,
      });
    } else {
      stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "GBP",
              product_data: {
                name: "Exult AI Pro",
                description: "Unlimited AI Generations",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userID,
        },
      });
    }

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error: any) {
    console.log("[PAYMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

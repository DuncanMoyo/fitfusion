"use client";

import { IFitnessEvent } from "@/mongodb/models/fitnessEvent.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import Order from "./Order";

const OrderButton = ({ event }: { event: IFitnessEvent }) => {
  
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  console.log("🚀 ~ OrderButton ~ userId:", userId)

  const completedEvent = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex gap-3 items-center">
      {completedEvent ? (
        <p className="text-red-400 p-2">
          We're bummed this event is sold out! Check back for new events soon
        </p>
      ) : (
        <>
          <SignedOut>
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/sign-in">Purchase Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Order event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default OrderButton;

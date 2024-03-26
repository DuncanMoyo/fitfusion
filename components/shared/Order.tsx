import { IFitnessEvent } from "@/mongodb/models/fitnessEvent.model";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { orderCheckout } from "@/lib/actions/checkout.actions";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Order = ({ event, userId }: { event: IFitnessEvent; userId: string }) => {
  const onOrder = async () => {
    const checkout = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await orderCheckout(checkout);
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form action={onOrder} method="post">
      <Button
        size="lg"
        role="link"
        className="sm:w-fit rounded-full"
        type="submit"
      >
        {event.isFree ? "Get Ticket" : "Purchase Ticket"}
      </Button>
    </form>
  );
};

export default Order;

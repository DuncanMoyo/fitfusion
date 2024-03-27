import { EventList } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { getOrdersByUser } from "@/lib/actions/checkout.actions";
import { getEventsByOrganiser } from "@/lib/actions/event.actions";
import { IFitnessOrder } from "@/mongodb/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const MyProfile = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const eventsOrganised = await getEventsByOrganiser({
    userId,
    page: eventsPage,
  });
  // console.log("🚀 ~ MyProfile ~ eventsOrganised:", eventsOrganised);

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents =
    orders?.data.map((order: IFitnessOrder) => order.event) || [];
  // console.log("🚀 ~ MyProfile ~ orderedEventss:", orderedEvents)

  return (
    <>
      <section className="py-5 md:py-10">
        <div className="flex justify-center items-center sm:justify-between max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          <h3 className="text-center sm:text-left font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px]">
            My Event Passes
          </h3>
          <Button className="hidden sm:flex rounded-full" asChild>
            <Link href="/#events">Discover More Events</Link>
          </Button>
        </div>
      </section>

      <section className="my-8 max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
        <EventList
          data={orderedEvents}
          emptyTitle="No Tickets at the moment"
          emptySubtitle="Keep Calm - Exhilarating events await!"
          eventType="My_Tickets"
          limit={3}
          currentPage={ordersPage}
          totalPages={orders?.totalPages}
          urlParam="ordersPage"
        />
      </section>

      <section className="py-5 md:py-10">
        <div className="flex justify-center items-center sm:justify-between max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          <h3 className="text-center sm:text-left font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px]">
            Events I created
          </h3>
          <Button className="hidden sm:flex rounded-full" asChild>
            <Link href="/events/create">Create a New Event</Link>
          </Button>
        </div>
      </section>

      <section className="my-8 max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
        <EventList
          data={eventsOrganised?.data}
          emptyTitle="No current events"
          emptySubtitle="Get Funky - Create one now"
          eventType="Events_Organised"
          limit={6}
          currentPage={eventsPage}
          urlParam="eventsPage"
          totalPages={eventsOrganised?.totalPages}
        />
      </section>
    </>
  );
};

export default MyProfile;

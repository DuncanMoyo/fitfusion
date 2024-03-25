import { FitnessEventForm } from "@/components/shared";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const eventToUpdate = await getEventById(id);
  return (
    <>
      <section>
        <h3 className="text-center sm:text-left font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          Update Event
        </h3>
      </section>

      <div className="my-8 max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
        <FitnessEventForm
          userId={userId}
          eventId={eventToUpdate._id}
          event={eventToUpdate}
          type="Update"
        />
      </div>
    </>
  );
};

export default UpdateEvent;

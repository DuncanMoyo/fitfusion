import { FitnessEventForm } from "@/components/shared";
import { auth } from "@clerk/nextjs";

const UpdateEvent = () => {
  const {sessionClaims} = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section>
        <h3 className="text-center sm:text-left font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          Update Event
        </h3>
      </section>

      <div className="my-8 max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
        <FitnessEventForm userId={userId} type='Update'/>
      </div>
    </>
  );
};

export default UpdateEvent;

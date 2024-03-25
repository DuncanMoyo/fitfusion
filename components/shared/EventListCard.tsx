import { dateTimeFormat } from "@/lib/utils";
import { IFitnessEvent } from "@/mongodb/models/fitnessEvent.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import Icon from "../ui/Icon";
import DeleteEvent from "./DeleteEvent";

type EventListCardProps = {
  event: IFitnessEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const EventListCard = ({
  event,
  hasOrderLink,
  hidePrice,
}: EventListCardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventOrganiser = userId === event.organiser._id.toString();
  return (
    <div className="relative flex min-h-[380px] w-full max-w-[400px] flex-col rounded-xl bg-white overflow-hidden transition-all shadow-md hover:shadow-lg md:min-h-[440px]">
      <Link
        className="flex justify-center items-center flex-grow bg-gray-50 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        href={`/events/${event._id}`}
      />
      {/* WHEN EVENT ORGANISER */}
      {isEventOrganiser && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Icon name="edit" />
          </Link>
          <DeleteEvent eventId={event._id} />
        </div>
      )}
      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="w-min rounded-full text-green-800 bg-green-200 px-3 py-1 ">
              {event.isFree ? "FREE" : `R${event.price}`}
            </span>
            <p className="w-min rounded-full px-3 py-1 text-gray-600 bg-gray-300 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="font-medium text-gray-500">
          {dateTimeFormat(event.startDateTime).dateTime}
        </p>
        <p className="flex-1 line-clamp-2 text-black text-[16px] font-medium leading-[24px] md:text-[18px] md:font-medium md:leading-[28px]">
          {event.title}
        </p>
        <div className="w-full flex justify-between items-center">
          <p className="text-gray-600 text-[14px] font-medium leading-[20px] md:text-[16px] md:font-medium md:leading-[24px]">
            {event.organiser.firstName} {event.organiser.lastName}
          </p>
          {hasOrderLink && (
            <Link className="flex gap-2 items-center" href={`/orders?eventId=${event._id}`}>
              <p>Order Details</p>
              <Icon name="externalLink"/>
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default EventListCard;

import Icon from "@/components/ui/Icon";
import { getEventById } from "@/lib/actions/event.actions";
import { dateTimeFormat } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);
  // console.log("🚀 ~ EventDetails ~ event:", event);
  return (
    <section className="flex justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl: max-w-7xl">
        <Image
          className="min-h-[300px] h-full w-full object-cover object-center"
          src={event.imageUrl}
          alt="Uploaded Image"
          width={500}
          height={500}
        />

        <div className="flex flex-col w-full p-5 md:p-10 gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold">{event.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="font-bold bg-green-200 rounded-full text-green-800 px-3 py-1">
                  {event.isFree ? "FREE" : `R${event.price}`}
                </p>
                <p className="rounded-full bg-gray-300 px-3 py-1 text-gray-600">
                  {event.category.name}
                </p>
              </div>
              <p className="ml-2 mt-2 sm:mt-0">
                by{" "}
                <span>
                  {event.organiser.firstName} {event.organiser.lastName}
                </span>
              </p>
            </div>
          </div>
          {/* PURCHASE BUTTON */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Icon name="calendar" />
              <div className="flex flex-wrap items-center">
                <p>
                  {dateTimeFormat(event.startDateTime).dateOnly} -{" "}
                  {dateTimeFormat(event.startDateTime).timeOnly}
                </p>
                <p>
                  {dateTimeFormat(event.endDateTime).dateOnly} -{" "}
                  {dateTimeFormat(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="location" />
              <p>{event.venue}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-gray-600">What is it about?</p>
            <p className="font-medium">{event.description}</p>
            <p className="font-medium truncate underline">{event.url}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

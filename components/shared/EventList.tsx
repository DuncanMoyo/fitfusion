import { IFitnessEvent } from "@/mongodb/models/fitnessEvent.model";
import React from "react";

type EventListProps = {
  data: IFitnessEvent[];
  emptyTitle: string;
  emptySubtitle: string;
  eventType?: "All_Events" | "My_Tickets" | "Events_Organised";
  limit: number;
  currentPage: number | string;
  totalPages?: number;
  urlParam?: string;
};

const EventList = ({
  data,
  emptyTitle,
  emptySubtitle,
  eventType,
  limit,
  currentPage,
  totalPages,
  urlParam,
}: EventListProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {
              data.map((event, i) =>{
                const hasOrderLink = eventType === 'Events_Organised';
                const hidePrice = eventType === 'My_Tickets'

                return (
                  <li key={i} className="flex justify-center">
                    
                  </li>
                )
              })
            }
          </ul>
        </div>
      ) : (
        <div className="min-h-[200px] w-full flex justify-center items-center max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 gap-3 flex-col py-28 text-center rounded-2xl bg-gray-50 ">
          <h3 className="font-bold text-[20px] leading-[30px] tracking-[2%] md:font-bold md:text-[28px] md:leading-[36px]">{emptyTitle}</h3>
          <p className="text-[14px] font-normal leading-[20px]">{emptySubtitle}</p>
        </div>
      )}
    </>
  );
};

export default EventList;

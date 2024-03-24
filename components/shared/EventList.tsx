import { IFitnessEvent } from "@/mongodb/models/fitnessEvent.model";
import React from "react";

type EventListProps = {
  data: IFitnessEvent[]
  title: string
  subtitle: string
  eventType?: 'All_Events' | 'My_Tickets' | 'Events_Organised'
  limit: number
  currentPage: number | string
  totalPages?: number
  urlParam?: string
}

const EventList = ({
  data,
  title,
  subtitle,
  eventType,
  limit,
  currentPage,
  totalPages,
  urlParam
}: EventListProps) => {
  return <div>EventList</div>;
};

export default EventList;

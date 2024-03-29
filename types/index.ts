// USER PARAMETERS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// FITNESS EVENT PARAMETERS
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type GetAllEventParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type EventDeleteParams = {
  eventId: string;
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type GetSimilarEventsParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type GetEventsByOrganiserParams = {
  userId: string;
  limit?: number;
  page: number;
};

// CATEGORY PARAMETERS
export type CreateCategoryParams = {
  categoryName: string;
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// CHECKOUT PARAMS
export type OrderCheckoutParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type OrderCreateParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};

export type UrlSearchParams = {
  params: string;
  key: string;
  value: string | null;
};

export type CleanUpUrlParams = {
  params: string;
  keysToRemove: string[];
};

export type FitnessPaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamTitle?: string;
};

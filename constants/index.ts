export const headerLinks = [
  {
    displayName: "Home",
    path: "/",
  },
  {
    displayName: "Create Event",
    path: "/events/create",
  },
  {
    displayName: "My Profile",
    path: "/profile",
  },
];


export const defaultFormValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}
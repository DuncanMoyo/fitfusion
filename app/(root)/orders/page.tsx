import { EventSearch } from "@/components/shared";
import { getOrdersByEvent } from "@/lib/actions/checkout.actions";
import { dateTimeFormat, formattedPrice } from "@/lib/utils";
import { IFitnessOrderItem } from "@/mongodb/models/order.model";
import { SearchParamProps } from "@/types";

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  //  console.log("🚀 ~ Orders ~ eventId:", eventId)
  const searchText = (searchParams?.query as string) || "";
  //  console.log("🚀 ~ Orders ~ searchText:", searchText)

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });
   console.log("🚀 ~ Orders ~ orders:", orders);

  return (
    <>
      <section className=" py-5 md:py-10">
        <h3 className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] text-center sm:text-left ">
          Orders
        </h3>
      </section>

      <section className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full mt-8">
        <EventSearch />
      </section>

      <section className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="font-medium text-[24px] leading-[36px] border-b text-gray-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Event Title
              </th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IFitnessOrderItem) => (
                    <tr
                      key={row._id}
                      className="text-[14px] font-normal leading-[20px] lg:text-[16px] lg:font-normal lg:leading-[24px] border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-cyan-300">{row._id}</td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.eventTitle}
                      </td>
                      <td className="min-w-[150px] py-4">{row.buyer}</td>
                      <td className="min-w-[100px] py-4">
                        {dateTimeFormat(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 text-right">
                        {formattedPrice(row.totalAmount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;

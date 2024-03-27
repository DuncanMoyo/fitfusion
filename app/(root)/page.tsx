import { EventList, EventSearch, FilterCategory } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchPhrase = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchPhrase,
    category,
    page,
    limit: 6,
  });
  // console.log("🚀 ~ Home ~ events:", events)


  return (
    <>
      <section className="py-5 md:py-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px]">
              Sweat, Bond, Transform: Your Health Goals, Our Mission
            </h1>
            <p className="text-[20px] font-normal leading-[30px] tracking-[2%] md:font-normal md:text-[24px] md:leading-[36px]">
              Schedule and absorb beneficial advice from fitness gurus in
              leading health companies with our worldwide community.
            </p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-fit rounded-full h-[54px] p-regular-16 text-[16px] font-normal leading-[24px]"
            >
              <Link href="#events">Start Exploring</Link>
            </Button>
          </div>

          <Image
            className="rounded-xl origin-center object-contain max-h-[70vh] 2xl:max-h-[50vh] "
            src="/assets/hero.png"
            alt="hero"
            width={1000}
            height={1000}
          />
        </div>
      </section>
      <section
        id="events"
        className="my-8 flex flex-col gap-8 max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full md:gap-12"
      >
        <h2 className="font-medium text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
          Trusted by <br /> Hundreds of Fitness Gurus
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <EventSearch />
          <FilterCategory />
        </div>
        <EventList
          data={events?.data}
          emptyTitle="No Events Found"
          emptySubtitle="Come back later"
          eventType="All_Events"
          limit={6}
          currentPage={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}

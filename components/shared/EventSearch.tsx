"use client";

import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import { Input } from "../ui/input";
import { cleanUpUrl, formUrlSearch } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const EventSearch = ({
  placeholder = "Search event...",
}: {
  placeholder?: string;
}) => {
  const [search, setSearch] = useState("");
  const queryParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if (search) {
        newUrl = formUrlSearch({
          params: queryParams.toString(),
          key: "search",
          value: search,
        });
      } else {
        newUrl = cleanUpUrl({
          params: queryParams.toString(),
          keysToRemove: ["search"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, queryParams, router]);

  return (
    <div className="min-h-[55px] w-full rounded-full px-4 bg-gray-50 overflow-hidden flex justify-center items-center">
      <Icon name="search" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className="ml-2 bg-gray-50"
      />
    </div>
  );
};

export default EventSearch;

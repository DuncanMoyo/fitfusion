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
  const [query, setQuery] = useState("");
  const queryParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if (query) {
        newUrl = formUrlSearch({
          params: queryParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = cleanUpUrl({
          params: queryParams.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, queryParams, router]);

  return (
    <div className="min-h-[55px] w-full rounded-full px-4 bg-gray-50 overflow-hidden flex justify-center items-center">
      <Icon name="search" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="ml-2 bg-gray-50"
      />
    </div>
  );
};

export default EventSearch;

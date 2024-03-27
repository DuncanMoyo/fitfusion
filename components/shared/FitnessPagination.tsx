"use client";

import { FitnessPaginationProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlSearch } from "@/lib/utils";

const FitnessPagination = ({
  page,
  totalPages,
  urlParamTitle,
}: FitnessPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickHandler = (btnType: string) => {
    const pageNumber = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlSearch({
      params: searchParams.toString(),
      key: urlParamTitle || "page",
      value: pageNumber.toString(),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2 ">
      <Button
        variant="outline"
        disabled={Number(page) <= 1}
        className="w-28"
        size="lg"
        onClick={() => onClickHandler("prev")}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        disabled={Number(page) >= totalPages}
        className="w-28"
        size="lg"
        onClick={() => onClickHandler("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default FitnessPagination;

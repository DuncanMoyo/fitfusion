"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { cleanUpUrl, formUrlSearch } from "@/lib/utils";
import { ICategory } from "@/mongodb/models/category.model";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const queryParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     let newUrl = "";
  //     if (categories) {
  //       newUrl = formUrlSearch({
  //         params: queryParams.toString(),
  //         key: "query",
  //         value: categories,
  //       });
  //     } else {
  //       newUrl = cleanUpUrl({
  //         params: queryParams.toString(),
  //         keysToRemove: ["query"],
  //       });
  //     }
  //     router.push(newUrl, { scroll: false });
  //   }, 300);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [categories, queryParams, router]);

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlSearch({
        params: queryParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = cleanUpUrl({
        params: queryParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <Select onValueChange={(value) => onSelectCategory(value)}>
      <SelectTrigger className=" w-full bg-gray-50 h-[54px] rounded-full text-[16px] font-normal leading-[24px] px-5 py-3">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className="text-[14px] font-normal leading-[20px] py-3 cursor-pointer"
          value="All"
        >
          All Categories
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            className="text-[14px] font-normal leading-[20px] py-3 cursor-pointer"
            value={category.name}
            key={category._id}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterCategory;

"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="flex md:flex-between w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map(({ displayName, path }, index) => {
        const isActive = pathname === path;
        return (
          <li
            key={index}
            className={`${
              isActive && "text-blue-500"
            } whitespace-nowrap flex justify-center items-center text-[16px] font-medium leading-[24px]`}
          >
            <Link href={path}>{displayName}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderLinks;

"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icon from "../ui/Icon";
import Image from "next/image";
import { Separator } from "../ui/separator";
import HeaderLinks from "./HeaderLinks";

const MobileMenu = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Icon name="menu" pointer />
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image
            src="/assets/fitfusion.svg"
            alt="logo"
            width={50}
            height={50}
          />
          <Separator className="border border-gray-50" />
          <HeaderLinks />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileMenu;

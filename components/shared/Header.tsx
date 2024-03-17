import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HeaderLinks from "./HeaderLinks";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/fitfusion.svg"
            width={50}
            height={50}
            alt="logo"
          />
        </Link>

        <SignedIn>
          <nav className="w-full max-w-xs md:flex md:flex-between hidden ">
            <HeaderLinks />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
          <UserButton afterSignOutUrl="/" />
            <MobileMenu />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;

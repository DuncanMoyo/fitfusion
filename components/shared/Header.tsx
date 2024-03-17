import { SignedOut } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between">
        <Link href='/' className="w-36">
          <Image src='/assets/fitfusion.svg' width={50} height={50} alt="logo"/>
        </Link>
        <div className="flex w-32 justify-end gap-3">
           <SignedOut>
             <Button asChild className="rounded-full" size='lg'>
              <Link href='sign-in'>Login</Link>
             </Button>
           </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex flex-col gap-4 text-center sm:flex-row justify-between items-center max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0">
        <Link href="/">
          <Image
            src="/assets/fitfusion.svg"
            width={50}
            height={50}
            alt="logo"
          />
        </Link>
        <p>2024 FitFusion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

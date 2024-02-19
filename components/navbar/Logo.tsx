"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <div className="text-3x1 md:text-5x1 text-neutral-900">
          Airbnb Manager
        </div>
      </div>
    </Link>
  );
};

export default Logo;

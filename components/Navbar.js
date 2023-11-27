import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearchLocation, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-3 bg-[url('/badal.jpg')]  bg-cover text-white italic text-lg sticky top-0 z-[100]">
      <Link href={"/"}>
        <Image
          width={"35"}
          height={"35"}
          src={"/sun.gif"}
          alt="sun"
          className="animate-bounce transition duration-500 ease-in-out   transform hover:translate-x-10 hover:scale-150 ..."
        />
      </Link>
      <Link
        href={"/"}
        className="flex items-center hover:text-green-400 gap-1
        transition duration-500 ease-in-out focus:text-yellow-400 ">
        <FaSearchLocation className="focus:animate-bounce"/>
        By Location
      </Link>
      <Link
        href={"/byplace"}
        className="flex items-center hover:text-green-400 gap-1 focus:text-yellow-400 transition duration-500 ease-in-out ">
        <FaSearch className="focus:animate-pulse" />
        By Place
      </Link>
    </nav>
  );
};

export default Navbar;

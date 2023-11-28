"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState,useContext } from "react";
import { FaSearchLocation, FaSearch } from "react-icons/fa";
import {Lang_data} from "@/context/context"





const Navbar = () => {
  const {Language,setLang}=useContext(Lang_data)


  return (<>
    <nav className="flex justify-between p-3 bg-[url('/badal.jpg')]  bg-cover text-white 
     text-lg sticky top-0 z-[100]">
      <Link href={"/"}>
        <Image
          width={"35"}
          height={"35"}
          src={"/sun.gif"}
          alt="sun"
          className="animate-bounce transition duration-500 ease-in-out   transform hover:translate-x-10 hover:scale-150 ..."
        />
      </Link>
      <span className="flex gap-1 flex-wrap items-center justify-center">
     <button className="">
     <Link
        href={"/"}
        className="  mt-2 border border-blue-300  text-sm rounded-lg 
        block w-[100px] p-1 text-center    focus:bg-red-500 transition duration-500 ease-in-out  ">
       
        By Location
      </Link>
     </button>
     
      <button>
      <Link
        href={"/byplace"}
        className=" mt-2 border border-blue-300  text-sm rounded-lg 
        block w-[80px] p-1 text-center    focus:bg-red-500 transition duration-500 ease-in-out ">
       
        By Place
      </Link>
      </button>
      <select  onChange={(e)=>{setLang(e.target.value)}}
       className="bg-opacity-5 mt-2 border border-blue-300  text-sm rounded-lg text-black 
        block w-[80px] p-1 text-center ">
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>

        </select>
      </span>

    </nav>
    </>
  );
};

export default Navbar;

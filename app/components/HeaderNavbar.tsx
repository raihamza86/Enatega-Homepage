"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { UserLocationContext } from "../context/UserLocationContext";

const HeaderNavBar: React.FC = () => {
  const { userLocation } = useContext(UserLocationContext);
  // Combine latitude and longitude into a single string
  const location = userLocation ? `${userLocation.lat}, ${userLocation.lng}` : "";

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex gap-7 items-center">
        <Image src="/logo.jpg" alt="not found" width={50} height={50} />
        <h2>Home</h2>
        <h2>Favourite</h2>
      </div>
      <div className="hidden md:flex bg-gray-100 p-[6px] rounded-md w-[40%] gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          value={location}
          placeholder="search"
          className="bg-transparent outline-none w-full"
        />
      </div>
    </div>
  );
};

export default HeaderNavBar;

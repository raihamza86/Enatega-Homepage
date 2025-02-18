"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { UserLocationContext } from "@/app/context/UserLocationContext";

interface Business {
  name: string;
  formatted_address: string;
  rating: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: { photo_reference: string }[];
}

interface BusinessItemProps {
  business: Business;
  showDir?: boolean;
}

const BusinessItem: React.FC<BusinessItemProps> = ({ business, showDir = false }) => {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const photoRef = business.photos ? business.photos[0]?.photo_reference : "";
  const { userLocation } = useContext(UserLocationContext);
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    if (userLocation) {
      calculateDistance(
        business.geometry.location.lat,
        business.geometry.location.lng,
        userLocation.lat,
        userLocation.lng
      );
    }
  }, [userLocation, business.geometry.location.lat, business.geometry.location.lng]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const earthRadius = 6371;

    const degToRad = (deg: number) => deg * (Math.PI / 180);

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    setDistance(distance.toFixed(2));
  };

  const onDirectionClick = () => {
    if (userLocation) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${business.geometry.location.lat},${business.geometry.location.lng}&travelmode=driving`
      );
    }
  };

  return (
    <div className="w-[180px] flex-shrink-0 p-2 rounded-lg bg-white">
      <Image
        className="rounded-lg object-cover h-[90px]"
        src={`https://maps.googleapis.com/maps/api/place/photo?maxWidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`}
        alt="not found"
        width={180}
        height={80}
      />
      <h2 className="text-[13px] font-bold mt-1">{business.name}</h2>
      <h2 className="text-[10px] text-gray-400 line-clamp-2">{business.formatted_address}</h2>
      <div className="flex gap-1 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-500">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1"></path>
        </svg>
        <h2 className="text-[10px] font-bold">{business.rating}</h2>
      </div>
      {showDir && (
        <div className="border-t-[1px] p-1 mt-1">
          <h2 className="text-[#0075ff] flex justify-between items-center">
            Dist: {distance} Mile{" "}
            <span
              className="border-[1px] p-1 rounded-full border-blue-500 hover:text-white hover:bg-blue-500 cursor-pointer"
              onClick={onDirectionClick}
            >
              Get Direction
            </span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default BusinessItem;

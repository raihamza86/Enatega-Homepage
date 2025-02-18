"use client";

import React, { useContext, useRef } from "react";
import BusinessItem from "./BusinessItem";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { SelectedBusinessContext } from "@/app/context/SelectedBusinessContext";

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

interface BusinessListProps {
  businessList: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businessList }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { setSelectedBusiness } = useContext(SelectedBusinessContext);

  const slideRight = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += 500;
    }
  };

  const slideLeft = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= 500;
    }
  };

  return (
    <div className="relative">
      <GrFormPrevious
        className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={slideLeft}
      />
      <div
        ref={elementRef}
        className="flex overflow-scroll overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
      >
        {businessList.map((item, index) => (
          <div key={index} onClick={() => setSelectedBusiness(item)}>
            <BusinessItem business={item} />
          </div>
        ))}
      </div>
      <GrFormNext
        className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={slideRight}
      />
    </div>
  );
};

export default BusinessList;

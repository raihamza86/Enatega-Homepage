"use client";

import React, { useContext } from "react";
import { MarkerF, OverlayView } from "@react-google-maps/api";
import { SelectedBusinessContext } from "@/app/context/SelectedBusinessContext";
import BusinessItem from "./BusinessItem";

interface Business {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  reference: string;
}

interface MarkersProps {
  business: Business;
}

const Markers: React.FC<MarkersProps> = ({ business }) => {
  const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);

  return (
    <div>
      <MarkerF position={business.geometry.location} onClick={() => setSelectedBusiness(business)}>
        {selectedBusiness?.reference === business.reference ? (
          <OverlayView
            position={business.geometry.location}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="ml-[-90px] mt-[-200px]">
              <BusinessItem business={business} showDir={true} />
            </div>
          </OverlayView>
        ) : null}
      </MarkerF>
    </div>
  );
};

export default Markers;

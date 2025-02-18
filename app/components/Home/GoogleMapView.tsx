"use client";

import { useContext } from "react";
import { UserLocationContext } from "@/app/context/UserLocationContext";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import Markers from "./Markers";

interface Business {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface GoogleMapViewProps {
  businessList: Business[];
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({ businessList }) => {
  const { userLocation } = useContext(UserLocationContext);

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "70vh",
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}>
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={10}>
          <MarkerF position={userLocation} />
          {businessList.slice(0, 8).map((item, index) => (
            <Markers business={item} key={index} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapView;

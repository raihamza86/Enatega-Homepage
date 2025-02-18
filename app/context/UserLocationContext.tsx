"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface UserLocation {
  lat: number;
  lng: number;
}

interface UserLocationContextType {
  userLocation: UserLocation | null;
  setUserLocation: React.Dispatch<React.SetStateAction<UserLocation | null>>;
}

export const UserLocationContext = createContext<UserLocationContextType | null>(null);

interface UserLocationProviderProps {
  children: ReactNode;
}

export function UserLocationProvider({ children }: UserLocationProviderProps) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(location);
      },
      (err) => console.error("Error getting location:", err)
    );
  };

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
}

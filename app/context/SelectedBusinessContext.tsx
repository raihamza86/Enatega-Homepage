"use client";

import React, { createContext, useState, ReactNode } from "react";

interface SelectedBusinessContextType {
  selectedBusiness: any[]; // You can replace `any[]` with a more specific type if you know the business structure
  setSelectedBusiness: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SelectedBusinessContext = createContext<SelectedBusinessContextType | null>(null);

interface SelectedBusinessProviderProps {
  children: ReactNode;
}

export function SelectedBusinessProvider({ children }: SelectedBusinessProviderProps) {
  const [selectedBusiness, setSelectedBusiness] = useState<any[]>([]);

  return (
    <SelectedBusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
      {children}
    </SelectedBusinessContext.Provider>
  );
}

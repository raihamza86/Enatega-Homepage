"use client";
import { useContext, useEffect, useState } from "react";
import CategoryList from "./components/Home/CategoryList";
import RangeSelect from "./components/Home/RangeSelect";
import GoogleMapView from "./components/Home/GoogleMapView";
import GooglePlaceAPI from "./shared/GlobalApi";
import { UserLocationContext } from "./context/UserLocationContext";
import BusinessList from "./components/Home/BusinessList";
import SkeltingLoading from "./components/SkeltingLoading";

// Define types for the business list and the selected category
interface Business {
  id: string;
  name: string;
  address: string;
  rating: number;
}

interface HomeProps {}

export default function Home() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [radius, setRadius] = useState<number>(2500);
  const [businessList, setBusinessList] = useState<Business[]>([]);
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userLocation?.lat && userLocation?.lng) {
      getGooglePlace();
    }
  }, [category, radius, userLocation]);

  const getGooglePlace = () => {
    setLoading(true);
    GooglePlaceAPI.getGooglePlace(category, radius, userLocation!.lat, userLocation!.lng)
      .then((resp) => {
        setBusinessList(resp.data.product.results);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching places:", error));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
      <div className="p-3">
        <CategoryList onCategoryChange={(value: string) => setCategory(value)} />
        <RangeSelect onRadiusChange={(value: number) => setRadius(value)} />
      </div>
      <div className="col-span-3">
        <GoogleMapView businessList={businessList} />
        <div className="md:absolute w-[90%] md:w-[71%] ml-6 md:ml-10 bottom-36 relative md:bottom-3">
          {!loading ? (
            <BusinessList businessList={businessList} />
          ) : (
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <SkeltingLoading key={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

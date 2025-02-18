import axios from "axios";

const getGooglePlace = async (
  category: string,
  radius: number,
  lat: number,
  lng: number
) => {
  return axios.get(
    `/api/google-place?category=${category}&radius=${radius}&lat=${lat}&lng=${lng}`
  );
};

const GooglePlaceAPI = {
  getGooglePlace,
};

export default GooglePlaceAPI;

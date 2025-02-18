import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

interface SearchParams {
  category: string | null;
  radius: string | null;
  lat: string | null;
  lng: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: SearchParams = {
    category: searchParams.get("category"),
    radius: searchParams.get("radius"),
    lat: searchParams.get("lat"),
    lng: searchParams.get("lng"),
  };

  const { category, radius, lat, lng } = params;

  if (!category || !radius || !lat || !lng) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${BASE_URL}/textsearch/json?query=${category}&location=${lat},${lng}&radius=${radius}&key=${GOOGLE_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const product = await res.json();
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from Google API" },
      { status: 500 }
    );
  }
}

import { SearchParams } from "@/typings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchTerm, pages, ...params } = await request.json();
  const searchParams: SearchParams = params;


  if (!searchTerm) {
    return NextResponse.json(
      { message: "Missing search term" },
      { status: 400 }
    );
  }

  const filters: string[] = [];


  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (key === "maxPrice" && value === "1000+") return; 
      if (key === 'sortBy') {
        filters.push(`sort=${value}`);
      } else {
        filters.push(`${key}=${Number(value)}`);
      }
    }
  });

  let url = 'https://fakestoreapi.com/products';

  if (searchTerm) {
    url += `?q=${searchTerm}`;
  }

  if (filters.length > 0) {
    url += `&${filters.join('&')}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: response.status }
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
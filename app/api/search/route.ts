import { PageResult, SearchParams } from "@/typings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchTerm, pages, ...params } = await request.json();
  const searchParams: SearchParams = params;

  if (!searchTerm) {
    return NextResponse.next(
      new Response("Missing search term", {
        status: 400,
      })
    );
  }

  const filters: any = [];

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (key === "max_price") {
        if (value === "1000+") return;
      }

      filters.push({
        key,
        value: key === 'sort_by' ? value : Number(value),
      });
    }
  });

  let url = 'https://fakestoreapi.com/products';

  if (searchTerm) {
    url += `?q=${searchTerm}`;
  }

  filters.forEach((filter: any) => {
    if (filter.key === 'category') {
      url += `&category=${filter.value}`;
    } else if (filter.key === 'sort_by') {
      url += `&sort=${filter.value}`;
    }
  });

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await response.json();

  const pageResults: PageResult[] = data;

  return NextResponse.json(pageResults);
}
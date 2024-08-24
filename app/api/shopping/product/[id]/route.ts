import { ProductData } from "@/typings";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(request: Request, { params: { id } }: Params) {
  if (!id) {
    return NextResponse.next(
      new Response("Missing product ID", {
        status: 400,
      })
    );
  }

  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await response.json();

  if (!data) {
    return NextResponse.next(
      new Response("Product not found", {
        status: 404,
      })
    );
  }

  const productData: ProductData = data;

  return NextResponse.json(productData);
}
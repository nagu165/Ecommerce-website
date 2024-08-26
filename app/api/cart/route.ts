import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { NEXT_AUTH } from "@/app/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  
  const session = await getServerSession(NEXT_AUTH);

  
  if (!session || !session.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }


    const cartItems = await prisma.cart.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  
  const session = await getServerSession(NEXT_AUTH);

  
  if (!session || !session.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { product, quantity } = await request.json();

  try {
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    
    await prisma.cart.create({
      data: {
        userId: user.id,
        product,
        quantity,
      },
    });

    return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  
  const session = await getServerSession(NEXT_AUTH);

  
  if (!session || !session.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await request.json(); 

  try {
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    
    await prisma.cart.delete({
      where: {
        id_userId: {
          id,
          userId: user.id,
        },
      },
    });

    return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { message: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
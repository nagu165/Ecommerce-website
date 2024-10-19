"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "./loading";
import { Button } from "@/components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';

export const revalidate = 300;

type Props = {
  params: {
    id: string;
  };
};

async function fetchProduct(id: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return await response.json();
}

const ProductPage = ({ params: { id } }: Props) => {
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const { addProductToCart } = useCart();
  
  // Cart state
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!session || !session.user?.email) {
      console.error('User is not authenticated');
      return;
    }

    try {
      console.log('Adding product to cart:', productData);
      addProductToCart(productData);
      console.log('Product added to cart');
      router.push('/cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (!productData) {
    notFound();
  }

  return (
    <div className="p-12">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Image
            className="h-80 w-80 p-5 border rounded-md object-contain shadow-lg"
            src={productData.image}
            alt={productData.title}
            width={400}
            height={400}
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-bold mb-4">{productData.title}</h1>
          <p className="text-gray-700 mb-4">{productData.description}</p>
          <p className="text-lg font-medium mb-6">${productData.price.toFixed(2)}</p>
          <Button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
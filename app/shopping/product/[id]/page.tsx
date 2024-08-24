import { ProductData } from "@/typings";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 300;

type Props = {
  params: {
    id: string;
  };
};

async function ProductPage({ params: { id } }: Props) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const productData = await response.json();

  if (!productData) {
    notFound();
  }

  return (
    <div className="p-12 pt-0">
      <h1 className="text-2xl">{productData.title}</h1>

      <section className="flex flex-col lg:flex-row mt-5 md:mt-0">
        <div className="md:p-10 md:pl-0 mx-auto">
          <Image
            className="h-80 w-80 p-5 border rounded-md object-contain"
            src={productData.image}
            alt={productData.title}
            width={400}
            height={400}
          />
        </div>
        <div className="pt-10 flex-1">
          <div>
            <h3 className="font-bold text-2xl">Product Details</h3>

            <p className="text-lg">{productData.price}</p>

            <p>{productData.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
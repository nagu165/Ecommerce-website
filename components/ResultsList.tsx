import { PageResult } from "@/typings";
import Link from "next/link";

type Props = {
  results: PageResult[];
  term: string;
};

function ResultsList({ results, term }: Props) {
  return (
    <div className="flex md:px-5">
      <div className="w-36 md:w-64">
        <div className="border rounded-lg p-5">
          <p className="font-bold">Categories</p>
          <div className="flex flex-col">
            <Link href="/search/electronics">Electronics</Link>
            <Link href="/search/jewelery">Jewelery</Link>
            <Link href="/search/men's clothing">Men's Clothing</Link>
            <Link href="/search/women's clothing">Women's Clothing</Link>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="px-5 md:p-10 md:pt-0 space-y-5 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 py-5">
            <div className="flex space-x-2 items-center divide-x-2">
              <h1 className="text-lg font-bold">Shop On FakeStoreAPI</h1>
              <h2 className="text-xl font-semibold pl-2">
                Search results for: {decodeURIComponent(term)}
              </h2>
            </div>
          </div>

          {results.length > 0 ? (
            results.map((item) => (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                prefetch={false}
                className="border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out"
              >
                <div className="border-b p-5 flex-1">
                  <img src={item.image} alt={item.title} className="object-contain h-40" />
                  <p className="text-[#1B66D2]">{item.title}</p>
                </div>

                <div className="px-5 py-2">
                  <p className="font-light">
                    ${item.price}
                  </p>
                  <p className="text-[#1B66D2] font-semibold">
                    {item.category}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-5">
              <p className="text-gray-500">No results found for "{decodeURIComponent(term)}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsList;
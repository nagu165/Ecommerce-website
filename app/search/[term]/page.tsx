"use client";

import ResultsList from "@/components/ResultsList";
import { SearchParams } from "@/typings";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import LoadingPage from "../loading";

export const revalidate = 300;

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};

const SearchPage = ({ searchParams, params: { term } }: Props) => {
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (term) {
      const fetchResults = async () => {
        try {
          let url = `https://fakestoreapi.com/products?q=${term}`;

          // Add search parameters to the URL
          if (searchParams.sortBy) {
            url += `&sort_by=${searchParams.sortBy}`;
          }
          if (searchParams.minPrice) {
            url += `&min_price=${searchParams.minPrice}`;
          }
          if (searchParams.maxPrice) {
            url += `&max_price=${searchParams.maxPrice}`;
          }

          const response = await fetch(url, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          });

          if (!response.ok) {
            redirect('/');
          }

          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching results:', error);
          redirect('/');
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [term, searchParams]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
};

export default SearchPage;
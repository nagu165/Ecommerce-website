import ResultsList from "@/components/ResultsList";
import { PageResult, SearchParams } from "@/typings";
import { redirect } from "next/navigation";

export const revalidate = 300;

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};

const SearchPage = async ({ searchParams, params: { term } }: Props) => {
  if (!term) {
    redirect('/');
  }

  // fetch URL for the FakeStoreAPI
  let url = `https://fakestoreapi.com/products`;

  // Add search term to the URL
  if (term) {
    url += `?q=${term}`;
  }

  // Fetch results from the FakeStoreAPI
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });


  if (!response.ok) {
    return redirect('/');
  }

  const results = await response.json() as PageResult[];

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
};

export default SearchPage;
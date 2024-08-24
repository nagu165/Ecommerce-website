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

  // Construct the fetch URL for the FakeStoreAPI
  let url = `https://fakestoreapi.com/products`;

  // Add search term to the URL if provided
  if (term) {
    url += `?q=${term}`; // Note: FakeStoreAPI does not support query parameters like this; adjust based on actual API capabilities
  }

  // Fetch results from the FakeStoreAPI
  const response = await fetch(url, {
    method: "GET", // Use GET method
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  // Check for a successful response
  if (!response.ok) {
    return redirect('/'); // Redirect if there's an error
  }

  const results = await response.json() as PageResult[];

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
};

export default SearchPage;
// app/search/layout.tsx (Search Results Layout)
import Footer from "@/components/Footer";
import { Providers } from '@/app/providers';
import HeaderWithFilters from '@/components/HeaderWithFilters';

export const metadata = {
  title: 'Search Results',
  description: 'Results for your search',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Providers>
        <HeaderWithFilters />
        <main>{children}</main>
        <Footer />
      </Providers>
    </>
  );
}
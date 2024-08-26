"use client";

import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import Avatar from "react-avatar";
import SearchButton from "./SearchButton";
import {
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./Button";

const SORT_BY_MAP = {
  r: "Default",
  rv: "By Review",
  p: "By Price (low to high)",
  pd: "By Price (high to low)",
};

const HeaderWithFilters = () => {
  const [pages, setPages] = useState("");
  const [sortBy, setSortBy] = useState("r");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (e.currentTarget.elements.namedItem("searchTerm") as HTMLInputElement).value;
    if (!searchTerm) return;
    const params = new URLSearchParams();

    if (pages) params.set("pages", pages.toString());
    if (sortBy) params.set("sort_by", sortBy.toString());
    if (minPrice) params.set("min_price", minPrice.toString());
    if (maxPrice) params.set("max_price", maxPrice.toString());

    router.push(`/search/${searchTerm}?${params.toString()}`);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-32">
          <Link href="/" className="flex-shrink-0">   
            <Image
              src="/MyStore.jpeg"
              alt="MyStore logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </Link>

          <div className="hidden md:block flex-grow max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex items-center space-x-2 bg-white shadow-xl rounded-full border-0 px-6 py-3 flex-1">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="searchTerm"
                    placeholder="What are you looking for?"
                    className="outline-none flex-1 text-gray-700 placeholder-gray-400"
                  />
                </div>
                <SearchButton />
              </div>
            </form>

            <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-4 max-w-lg md:max-w-none mx-auto items-center mt-4">
              <SearchSelect
                onValueChange={value => setPages(value)}
                className="min-w-4 bg-white shadow-md rounded-md" placeholder="# of pages">
                {[...Array(100)].map((_, i) => (
                  <SearchSelectItem key={i} value={(i + 1).toString()}>
                    {(i + 1).toString()} pages
                  </SearchSelectItem>
                ))}
              </SearchSelect>

              <Select
                onValueChange={value => setSortBy(value)}
                className="min-w-4 bg-white shadow-md rounded-md" placeholder="Sort">
                {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </Select>

              <SearchSelect
                onValueChange={value => setMinPrice(value)}
                className="min-w-4 bg-white shadow-md rounded-md" placeholder="Min Price...">
                {["", "100", "250", "500", "750", "900", "1000"].map((_, i) => (
                  <SearchSelectItem key={i} value={_.toString()}>
                    {i === 0 ? "No Minimum" : `$${_.toString()}`}
                  </SearchSelectItem>
                ))}
              </SearchSelect>

              <SearchSelect
                onValueChange={value => setMaxPrice(value)}
                className="min-w-4 bg-white shadow-md rounded-md" placeholder="Max Price...">
                {["", "100", "250", "500", "750", "900", "1000+"].map((_, i) => (
                  <SearchSelectItem key={i} value={_.toString()}>
                    {i === 0 ? "No Maximum" : `$${_.toString()}`}
                  </SearchSelectItem>
                ))}
              </SearchSelect>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            {session ? (
              <div className="hidden md:flex items-center space-x-2">
                <Avatar name={session?.user?.name} round size="40" className="shadow-md flex-shrink-0" />
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full text-sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/signup" className="hidden md:block">
                <Avatar name="User" round size="40" className="flex-shrink-0" />
              </Link>
            )}
            <Button variant="secondary" size="small" type="button" onClick={toggleMenu} className="md:hidden">
              <Bars3Icon className="h-6 w-6 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="flex flex-col h-full bg-white w-64 float-right p-4">
            <Button
              className="self-end text-gray-700 hover:text-gray-900 mb-4"
              onClick={() => setShowMenu(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </Button>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center space-x-2 bg-white shadow-xl rounded-full border-0 px-4 py-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="searchTerm"
                  placeholder="Search..."
                  className="outline-none flex-1 text-gray-700 placeholder-gray-400"
                />
              </div>
            </form>
            <div className="space-y-2 mb-4">
              <SearchSelect
                onValueChange={value => setPages(value)}
                className="w-full bg-white shadow-md rounded-md" placeholder="# of pages">
                {[...Array(100)].map((_, i) => (
                  <SearchSelectItem key={i} value={(i + 1).toString()}>
                    {(i + 1).toString()} pages
                  </SearchSelectItem>
                ))}
              </SearchSelect>
              <Select
                onValueChange={value => setSortBy(value)}
                className="w-full bg-white shadow-md rounded-md" placeholder="Sort">
                {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </Select>
              <SearchSelect
                onValueChange={value => setMinPrice(value)}
                className="w-full bg-white shadow-md rounded-md" placeholder="Min Price...">
                {["", "100", "250", "500", "750", "900", "1000"].map((_, i) => (
                  <SearchSelectItem key={i} value={_.toString()}>
                    {i === 0 ? "No Minimum" : `$${_.toString()}`}
                  </SearchSelectItem>
                ))}
              </SearchSelect>
              <SearchSelect
                onValueChange={value => setMaxPrice(value)}
                className="w-full bg-white shadow-md rounded-md" placeholder="Max Price...">
                {["", "100", "250", "500", "750", "900", "1000+"].map((_, i) => (
                  <SearchSelectItem key={i} value={_.toString()}>
                    {i === 0 ? "No Maximum" : `$${_.toString()}`}
                  </SearchSelectItem>
                ))}
              </SearchSelect>
            </div>
            <Link href="/cart" className="block text-gray-700 hover:text-gray-900 py-2">
              Cart
            </Link>
            {session ? (
              <>
                <p className="text-gray-700 py-2">{session?.user?.email}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full mt-2"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/signup" className="block text-gray-700 hover:text-gray-900 py-2">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderWithFilters;
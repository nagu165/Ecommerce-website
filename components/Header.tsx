
"use client";

import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import Avatar from "react-avatar";
import SearchButton from "./SearchButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./Button";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (e.currentTarget.elements.namedItem("searchTerm") as HTMLInputElement).value;
    if (!searchTerm) return;
    router.push(`/search/${searchTerm}`);
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
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            {session ? (
              <div className="hidden md:flex items-center space-x-2">
                <Avatar name={session?.user?.name || 'User'} round size="40" className="shadow-md flex-shrink-0" />
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

export default Header;
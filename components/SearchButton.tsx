'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useFormStatus } from "react-dom"

const SearchButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={pending}
        >
            {pending ? (
                <span className="text-sm">Searching...</span>
            ) : (
                <MagnifyingGlassIcon className="h-5 w-5" />
            )}
        </button>
    )
}

export default SearchButton
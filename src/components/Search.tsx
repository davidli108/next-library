"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import { usePathname, useRouter } from "next/navigation";

export default function Search() {
  const { setSearch } = useContext(SearchContext);
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && (
        <div className="flex h-fit w-full max-w-md gap-x-4 rounded-md border-taupe border-opacity-60 bg-white px-4 py-2 text-text shadow-search">
          <MagnifyingGlassIcon className="inline h-6 w-6" />
          <input
            type="search"
            placeholder="Search for a book"
            className="flex-1 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
import React, { useEffect, useState } from "react";
import Icons from "../icons";

function SearchBar({ handleSearch, clearSearch }) {
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <div className="flex gap-4 items-center">
      <Icons.Search />
      <input
        onChange={(e) => {
          setDebouncedSearch(e.target.value);
        }}
        value={debouncedSearch}
        placeholder="Search painting"
        className=" bg-transparent text-xl border-b-white border-t-0 border-x-0 outline-none text-white"
      />
    </div>
  );
}

export default SearchBar;

import Link from "next/link";
import React from "react";
import Icons from "../icons";
import SearchBar from "./SearchBar";

function Navbar({ paintings, setPaintings, paintingsCopy }) {
  const onHandleSearch = (value) => {
    const filteredPaintings = paintings.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredPaintings.length) {
      setPaintings(filteredPaintings);
    } else {
      setPaintings(paintingsCopy);
    }
  };

  const onClearSearch = () => {
    if (paintings.length && paintingsCopy.length) {
      setPaintings(paintingsCopy);
    }
  };

  return (
    <div className="w-full p-8 flex justify-around">
      <Link href="/">
        <h1 className="text-white text-3xl font-semibold">Art Gallery</h1>
      </Link>
      <Link href="/liked">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4">
            <Icons.Heart />
          </div>
          <p className="text-white font-semibold text-2xl translate-y-[2px]">
            Liked
          </p>
        </div>
      </Link>
      <SearchBar handleSearch={onHandleSearch} clearSearch={onClearSearch} />
    </div>
  );
}

export default Navbar;

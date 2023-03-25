import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ArtContext } from "../context/ArtContext";
import Icons from "../icons";
import { camelCase } from "../utils";

function ImageBackground({ index, data }) {
  const [updateLiked, setUpdateLiked] = useState(false);

  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const imgRef = useRef(null);

  const likeImage = (e) => {
    setUpdateLiked(true);
    let liked = JSON.parse(sessionStorage.getItem("likedPaintings"));

    if (liked && liked.length > 0) {
      if (alreadyLiked) {
        const newLikedPosts = liked.filter((obj) => obj.name !== data.name);
        sessionStorage.setItem("likedPaintings", JSON.stringify(newLikedPosts));
      } else {
        sessionStorage.setItem(
          "likedPaintings",
          JSON.stringify([...liked, data])
        );
      }
    } else {
      sessionStorage.setItem("likedPaintings", JSON.stringify([data]));
    }
  };

  useEffect(() => {
    if (!updateLiked) return;
    setUpdateLiked(false);
  }, [updateLiked]);

  useEffect(() => {
    let liked = JSON.parse(sessionStorage.getItem("likedPaintings"));
    if (liked) {
      const hasLiked = liked.some((obj) => obj.name === data.name);
      setAlreadyLiked(hasLiked);
    }
  }, [updateLiked]);

  return (
    <div className="image-wrapper group relative">
      <p className="z-50 text-xl w-full absolute top-[30%] font-semibold  left-[-20%] -translate-x-8 group-hover:-translate-x-4 text-white opacity-0 -rotate-90 group-hover:opacity-100 transition-all duration-300 ease-in-out ">
        {camelCase(data.name)}
      </p>
      <div
        onClick={likeImage}
        className="z-50 text-2xl absolute top-0 right-0 group-hover:-translate-x-5 group-hover:translate-y-5 opacity-0  group-hover:opacity-100 -rotate-180 group-hover:rotate-0 transition-all duration-300 ease-in-out"
      >
        <Icons.Heart alreadyLiked={alreadyLiked} />
      </div>
      <div className="flex flex-col z-50 text-xl absolute bottom-0 font-semibold left-[20%] -translate-y-8 cursor-pointer group-hover:-translate-y-[50px] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out ">
        <Link href={{ pathname: "/origin", query: data }}>
          <div className="flex justify-center gap-2 bg-white items-center">
            <p className=" cursor-pointer text-black">Origin</p>
            <Icons.GoTo />
          </div>
        </Link>
        <p className="">{data.location}</p>
      </div>

      <img
        ref={imgRef}
        key={index}
        src={data.img}
        alt=""
        className={`image z-50 transition-all duration-700 hover:opacity-25`}
        draggable="false"
      />
    </div>
  );
}

export default ImageBackground;

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ImageBackground from "./components/ImageBackground";
import Navbar from "./components/Navbar";
import { camelCase } from "./utils";

function Origin() {
  const [paintings, setPaintings] = useState([]);
  const [paintingsCopy, setPaintingsCopy] = useState([]);

  useEffect(() => {
    setPaintings(JSON.parse(sessionStorage.getItem("likedPaintings")));
    setPaintingsCopy(JSON.parse(sessionStorage.getItem("likedPaintings")));
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [paintingDetails, setPaintingDetails] = useState([]);

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setPaintingDetails(router.query);
    setIsLoading(false);
  }, [router.isReady]);

  return (
    <div className="relative flex flex-col h-screen w-screen">
      <Navbar
        paintings={paintings}
        setPaintings={setPaintings}
        paintingsCopy={paintingsCopy}
      />
      <div className="px-[60px] flex w-full justify-around py-[60px] flex-wrap">
        <div className="text-white flex flex-col items-start justify-start gap-3">
          <h1 className=" text-[72px] font-semibold ">{paintingDetails.name}</h1>
          <p>{paintingDetails.painter}</p>
          <p>{paintingDetails.location}</p>
          <iframe src={paintingDetails.map} width="600" height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        {!isLoading && (
          <div className="w-1/4 h-full object-contain">
            <img
              src={paintingDetails.img}
              alt=""
              className={`w-full h-full image z-50 transition-all duration-700`}
              draggable="false"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Origin;

import React, { useEffect, useRef, useState } from "react";
import ImageTracker from "../components/ImageTracker";
import Navbar from "../components/Navbar";

function Liked() {

    const [paintings, setPaintings] = useState([]);
    const [paintingsCopy, setPaintingsCopy] = useState([]);
  
    
    
    useEffect(() => {
        setPaintings(JSON.parse(sessionStorage.getItem("likedPaintings")))
        setPaintingsCopy(JSON.parse(sessionStorage.getItem("likedPaintings")))
    }, [])
    
    const headingRef = useRef(null);
  return (
    <div className="relative flex flex-col h-screen w-screen">
      <Navbar
        paintings={paintings}
        setPaintings={setPaintings}
        paintingsCopy={paintingsCopy}
      />
      <div ref={headingRef} className="px-[60px] flex">
        <h1 className="text-white text-[72px] font-semibold ">
          Paintings <br></br> that defines your taste.
        </h1>
      </div>

      <ImageTracker headingRef={headingRef} paintings={paintings} />
    </div>
  );
}

export default Liked;

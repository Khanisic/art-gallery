
import { useRef, useState } from "react";
import images from "../data/data.json";
import ImageTracker from "./components/ImageTracker";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {

  const [paintings, setPaintings] = useState(images);
  const [paintingsCopy, setPaintingsCopy] = useState(images);

  const headingRef = useRef(null);


  return (
    <div className="relative flex flex-col h-screen w-screen">
      <Navbar paintings={paintings} setPaintings={setPaintings} paintingsCopy={paintingsCopy}/>
      <div ref={headingRef} className="px-[60px] flex">
        <h1 className="text-white text-[72px] font-semibold ">
          Art <br></br> Around the World
        </h1>
      </div>

      <ImageTracker  headingRef={headingRef} paintings={paintings}/>
    </div>
  );
}

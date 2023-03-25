import React, { useEffect, useRef, useState } from "react";
import ImageBackground from "./ImageBackground";

function ImageTracker({paintings, headingRef}) {
  const trackRef = useRef(null);

  const [mouseDownAt, setMouseDownAt] = useState(0);

  const [prevPercentage, setPrevPercentage] = useState(0);
  const handleOnDown = (e) => setMouseDownAt(e.clientX);
  const handleOnUp = (e) => {
    setMouseDownAt(0);
    setPrevPercentage(trackRef.current.dataset.percentage);
  };

  const handleOnMove = (e) => {
    if (mouseDownAt == 0) return;
    const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth;
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(prevPercentage) + percentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -100
    );
    trackRef.current.dataset.percentage = nextPercentage;

    trackRef.current.animate(
      { transform: `translate(${nextPercentage}%, -50%)` },
      { duration: 1200, fill: "forwards" }
    );

    for (const image of trackRef.current.getElementsByClassName("image")) {
      image.animate(
        { objectPosition: `${nextPercentage + 100}% center` },
        { duration: 1200, fill: "forwards" }
      );
    }

    headingRef.current.style.opacity = `${
      (nextPercentage * 2 + 100).toFixed(0) * 0.01
    }`;
    headingRef.current.animate(
      { transform: `translateY(${nextPercentage * 2 + 100}%)` },
      { duration: 1200, fill: "forwards" }
    );
  };

  useEffect(() => {
    window.onmousedown = (e) => handleOnDown(e);
    window.onmousemove = (e) => handleOnMove(e);
    window.onmouseup = (e) => handleOnUp(e);
  }, [mouseDownAt, prevPercentage, trackRef]);

  return (
    <div className="" ref={trackRef} id="image-track">
      {paintings.map((image, index) => {
        return (
          <ImageBackground
            key={index}
            alt=""
            className="image cursor-pointer z-50"
            draggable="false"
            data={image}
          />
        );
      })}
    </div>
  );
}

export default ImageTracker;

import React, { useEffect, useState } from "react";

export const ArtContext = React.createContext();

export const ArtProvider = ({ children }) => {
  const [liked, setLiked] = useState([]);
  const [updateLiked, setUpdateLiked] = useState(false);

  useEffect(() => {
    if (!updateLiked) return;

    if (updateLiked) {
      const liked = JSON.parse(sessionStorage.getItem("likedPaintings"));
      if (liked) {
        setLiked(liked);
        setUpdateLiked(false)
      } else {
        setLiked([]);
      }
    }
  }, [updateLiked]);

  return (
    <ArtContext.Provider
      value={{
        liked,
        setUpdateLiked
      }}
    >
      {children}
    </ArtContext.Provider>
  );
};

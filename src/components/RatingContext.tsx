import React, { createContext, useContext, useState } from "react";

interface RatingsContextProps {
  ratings: Record<string, number>;
  rateMovie: (movieId: string, rating: number) => void;
}

const RatingsContext = createContext<RatingsContextProps | undefined>(undefined);

export const RatingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const rateMovie = (movieId: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [movieId]: rating,
    }));
  };

  return (
    <RatingsContext.Provider value={{ ratings, rateMovie }}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = () => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error("useRatings must be used within a RatingsProvider");
  }
  return context;
};
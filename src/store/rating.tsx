import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Типы для состояния
interface RatingsContextType {
  ratings: { [movieId: string]: number }; // ID фильма -> оценка
  rateMovie: (movieId: string, rating: number) => void;
}

const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

// Провайдер контекста
export const RatingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ratings, setRatings] = useState<{ [movieId: string]: number }>(() => {
    // Загружаем оценки из sessionStorage при инициализации
    const storedRatings = sessionStorage.getItem("ratings");
    return storedRatings ? JSON.parse(storedRatings) : {};
  });

  const rateMovie = (movieId: string, rating: number) => {
    setRatings((prev) => {
      const updatedRatings = { ...prev, [movieId]: rating };
      sessionStorage.setItem("ratings", JSON.stringify(updatedRatings)); // Сохраняем в sessionStorage
      return updatedRatings;
    });
  };

  return (
    <RatingsContext.Provider value={{ ratings, rateMovie }}>
      {children}
    </RatingsContext.Provider>
  );
};

// Хук для использования контекста
export const useRatings = (): RatingsContextType => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error("useRatings must be used within a RatingsProvider");
  }
  return context;
};

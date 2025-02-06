import React, { useState } from "react";
import { useRatings } from "../components/RatingContext";
import "./RatingComponent.css";

interface RatingComponentProps {
  movieId: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ movieId }) => {
  const { ratings, rateMovie } = useRatings();
  const currentRating = ratings[movieId] || 0;
  const [hoverRating, setHoverRating] = useState(0); // Состояние для наведения

  const handleRating = (rating: number) => {
    if (!movieId) {
      console.error("Invalid movieId provided to RatingComponent");
      return;
    }
    rateMovie(movieId, rating);
  };

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating); // Устанавливаем текущее значение наведения
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // Сбрасываем значение наведения
  };

  if (!movieId) {
    console.warn("RatingComponent rendered without a valid movieId.");
    return <p>Error: Movie ID is missing</p>;
  }

  return (
    <div className="rating-component">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className={`star-button ${
            hoverRating >= star || currentRating >= star ? "active" : ""
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingComponent;

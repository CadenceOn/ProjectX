import React from "react";
import { useRatings } from "../store/rating";

interface RatingComponentProps {
  movieId: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ movieId }) => {
  const { ratings, rateMovie } = useRatings();
  const currentRating = ratings[movieId] || 0;

  const handleRating = (rating: number) => {
    rateMovie(movieId, rating);
  };

  return (
    <div>
      <h4>Rate this movie:</h4>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          style={{
            color: currentRating >= star ? "gold" : "gray",
            fontSize: "20px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingComponent;

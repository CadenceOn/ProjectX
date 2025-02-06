import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import RatingComponent from './RatingComponent';

const MovieCard = ({
    movie,
}: {
  movie: {
    nameRu: string;
    description: string;
    year: string;
    posterUrl: string;
    kinopoiskId: string;
    genres: { genre: string }[];
    countries: { country: string }[];
  };
}) => {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.nameRu} />
      <h3>{movie.nameRu}</h3>
      <p>{movie.description}</p>
      <p>{movie.year}</p>
      <p>
        <strong>Жанр:</strong>{' '}
        {movie.genres.map((genre, index) => (
          <span key={index}>
            {genre.genre}
            {index < movie.genres.length - 1 && ', '}
          </span>
        ))}
      </p>
      <p>
        <strong>Страна:</strong>{' '}
        {movie.countries.map((country, index) => (
          <span key={index}>
            {country.country}
            {index < movie.countries.length - 1 && ', '}
          </span>
        ))}
      </p>

      {/* Компонент оценки */}
      <RatingComponent movieId={movie.kinopoiskId} />

      <Link to={`/project_x/movies/${movie.kinopoiskId}`} className="details-button">
        Посмотреть детали
      </Link>
    </div>
  );
};

export default MovieCard;

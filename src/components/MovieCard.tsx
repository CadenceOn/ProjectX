import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }: { movie: { Title: string; Year: string; Poster: string; imdbID: string } }) => (
    <div className="movie-card">
        <img src={movie.Poster} alt={movie.Title} />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <Link to={`/movies/${movie.imdbID}`} className="details-button">Посмотреть детали</Link>
    </div>
);

export default MovieCard;

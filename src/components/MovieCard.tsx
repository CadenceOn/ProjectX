import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({
    movie,
}: {
    movie: { nameRu: string; year: string; posterUrl: string; kinopoiskId: string };
}) => {
    console.log(movie);
    return (
        <div className="movie-card">
            <img src={movie.posterUrl} alt={movie.nameRu} />
            <h3>{movie.nameRu}</h3>
            <p>{movie.year}</p>
            <Link
                to={`/project_x/movies/${movie.kinopoiskId}`}
                className="details-button"
            >
                Посмотреть детали
            </Link>
        </div>
    );
};

export default MovieCard;

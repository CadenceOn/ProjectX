// src/details/MovieDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './MovieDetails.css'

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movieToken, setMovieToken] = useState("");

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(
                `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
                {
                    headers: {
                        "X-API-KEY": "fc454c1a-dfc3-4581-80b1-5c95115a9bd6",
                    },
                }
            );
            const tokerFilm = await fetch(
                `https://api.apbugall.org/?token=45e20a5f584becf7a64dffb7174ddf&kp=${id}`
            );

            const tokerFilmJson = await tokerFilm.json();
            console.log("tokerFilm", tokerFilmJson);
            setMovieToken(tokerFilmJson.data.token_movie);
            const data = await response.json();

            if (data) {
                setMovie(data);
                setError(null);
            } else {
                setError("Error");
            }
        } catch (err) {
            setError("Failed to fetch movie details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("dsdsdss");
        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!movie) return <p>No movie found.</p>;

    return (
        <div>
            <h1>{movie.nameRu}</h1>
            <img src={movie.posterUrl} alt={movie.nameRu} />
            <p>
                <strong>Year:</strong> {movie.year}
            </p>
            <p>
                <strong>Rating Kinopoisk:</strong> {movie.ratingKinopoisk}
            </p>
            <p>
                <strong>Rating Imdb:</strong> {movie.ratingImdb}
            </p>
            <a href={`https://flicksbar.mom/film/${id}`}>Смотреть</a>
            <a href={`https://flicksbar.mom/film/${id}`}>Смотреть</a>
            <iframe
                className="moviePlayer"
                src={`https://thesaurus.allohalive.com/?token_movie=${movieToken}&amp;token=45e20a5f584becf7a64dffb7174ddf&amp;null=`}
            ></iframe>
        </div>
    );
};

export default MovieDetails;

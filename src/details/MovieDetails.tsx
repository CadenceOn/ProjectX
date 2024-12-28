// src/details/MovieDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c65201f0`);
            const data = await response.json();

            if (data.Response === 'True') {
                setMovie(data);
                setError(null);
            } else {
                setError(data.Error);
            }
        } catch (err) {
            setError('Failed to fetch movie details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!movie) return <p>No movie found.</p>;

    return (
        <div>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt={movie.Title} />
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
    );
};

export default MovieDetails;

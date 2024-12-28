// src/home/HomePage.tsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import './HomePage.css';
import { useLocation } from 'react-router-dom';



const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('Avengers');
    const [loading, setLoading] = useState(true);

    const fetchMovies = async () => {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=c65201f0`);
        const data = await response.json();
        if (data.Search) {
            setMovies(data.Search);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies();
    }, [searchQuery]);

    return (
        <div className="home-page">
            <SearchBar onSearch={setSearchQuery} />
            {loading ? (
                <Loader />
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;

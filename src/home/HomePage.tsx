// src/home/HomePage.tsx
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import "./HomePage.css";
import { ContainerGrid } from "../components/ContainerGrid";
import { Context } from "../store/context";
import { GridPoster } from "../components/GridPoster/components/GridPoster";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("Avengers");
    const [loading, setLoading] = useState(true);
    const { store } = useContext(Context);

    const fetchMovies = async () => {
        setLoading(true);
        store.list
            .getFilmsFilter({ keyword: searchQuery })
            .then((response) => {
                setMovies(response.data.items);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMovies();
        console.log('dsds', movies)
    }, [searchQuery]);

    return (
        <div className="home-page">
            <SearchBar onSearch={setSearchQuery} />
            {loading ? (
                <Loader />
            ) : (
                <ContainerGrid>
                    {movies.map((movie) => (
                        <GridPoster
                            id={movie.kinopoiskId}
                            name={movie.nameRu ? movie.nameRu : movie.nameEn}
                            creator={movie.rating}
                            image={movie.posterUrl}
                            key={movie.kinopoiskId}
                        />
                    ))}
                </ContainerGrid>
            )}
        </div>
    );
};

export default HomePage;

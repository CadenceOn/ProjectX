import React from 'react';

const FavoritesPage = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    return (
        <div>
            <h1>Your Favorites</h1>
    {favorites.length > 0 ? (
        favorites.map((movie: { imdbID: string; Title: string; Year: string }) => (
            <div key={movie.imdbID}>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                </div>
        ))
    ) : (
        <p>No favorites yet.</p>
    )}
    </div>
);
};

export default FavoritesPage;

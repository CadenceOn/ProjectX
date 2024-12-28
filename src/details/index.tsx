import React from 'react';
import ReactDOM from 'react-dom/client';
import MovieDetails from './MovieDetails';
import '../styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <MovieDetails />
    </React.StrictMode>
);

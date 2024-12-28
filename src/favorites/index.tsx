// src/components/favorites.index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import FavoritesPage from './FavoritesPage';
import '../styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <FavoritesPage />
    </React.StrictMode>
);

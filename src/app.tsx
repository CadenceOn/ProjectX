import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const FavoritesPage = lazy(() => import('./favorites/FavoritesPage'));
const MovieDetails = lazy(() => import('./details/MovieDetails'));
const HomePage = lazy(() => import('./home/HomePage'));
const AboutPage = lazy(() => import('./about/AboutPage')); // Импорт страницы "О нас"

const App = () => (
    <Router>
        <Header onSearch={(query) => console.log(query)} />

        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/project_x/" element={<HomePage />} /> {/* Главная страница */}
                    <Route path="/project_x/movies/:id" element={<MovieDetails />} /> {/* Детали фильма */}
                    <Route path="/project_x/favorites" element={<FavoritesPage />} /> {/* Избранное */}
                    <Route path="/project_x/about" element={<AboutPage />} /> {/* Страница "О нас" */}
                </Routes>
            </Suspense>
        </main>
        <Footer />
    </Router>
);

export default App;

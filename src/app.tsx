import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const FavoritesPage = lazy(() => import('./favorites/FavoritesPage'));
const MovieDetails = lazy(() => import('./details/MovieDetails'));
const HomePage = lazy(() => import('./home/HomePage'));

const App = () => (
    <Router>
        <Header onSearch={(query) => console.log(query)} />

        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/sber" element={<HomePage />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
            </Suspense>
        </main>
        <Footer />
    </Router>
);

export default App;

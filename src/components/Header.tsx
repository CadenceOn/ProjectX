import React, { useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Context } from "../store/context"; // Импортируем контекст
import { observer } from "mobx-react-lite"; // Импортируем observer
import "./Header.css";
import logo from './logo.png'; // Импорт логотипа

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Проверяем, находимся ли мы на главной странице
    const isHomePage = location.pathname === '/project_x';
    const isAboutPage = location.pathname === '/project_x/about';
    const isFavoritesPage = location.pathname === '/project_x/favorites';

    return (
        <header className="header">

            <div className="logo-container" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" className="logo" />
                <h1>Kinopoisk Clone</h1>
            </div>


            {/* Навигационная панель */}
            <nav>
                <a
                    className={isAboutPage ? 'nav-link active' : 'nav-link'}
                    onClick={() => navigate('/project_x/about')}
                >
                    О нас
                </a>
                <a
                    className={isFavoritesPage ? 'nav-link active' : 'nav-link'}
                    onClick={() => navigate('/project_x/favorites')}
                >
                    Избранное
                </a>
            </nav>
            {!isHomePage && !isAboutPage && !isFavoritesPage && <SearchBar onSearch={onSearch} />}
        </header>
    );
};


export default observer(Header);

import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Header.css';
import logo from './logo.png'; // Импорт логотипа

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const location = useLocation();

    // Проверяем, находимся ли мы на главной странице
    const isHomePage = location.pathname === '/project_x';

    return (
        <header className="header">
            {/* Добавляем логотип */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Kinopoisk Clone</h1>
            </div>
            {!isHomePage && <SearchBar onSearch={onSearch} />}
        </header>
    );
};

export default Header;

import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Header.css';

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const location = useLocation();

    // Проверяем, находимся ли мы на главной странице
    const isHomePage = location.pathname === '/sber';

    return (
        <header className="header">
            <h1>Kinopoisk Clone</h1>
            {!isHomePage && <SearchBar onSearch={onSearch} />}
        </header>
    );
};

export default Header;
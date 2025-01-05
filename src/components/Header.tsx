import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Header.css';
import logo from './logo.png'; // Импорт логотипа

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Проверяем, находимся ли мы на главной странице
    const isHomePage = location.pathname === '/project_x';

    // Обработчик клика по логотипу
    const handleLogoClick = () => {
        navigate('/project_x'); // Переход на главную страницу
    };

    return (
        <header className="header">
            {/* Логотип с обработчиком клика */}
            <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                <img src={logo} alt="Logo" className="logo" />
                <h1>Kinopoisk Clone</h1>
            </div>
            {!isHomePage && <SearchBar onSearch={onSearch} />}
        </header>
    );
};

export default Header;

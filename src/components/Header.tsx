import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Header.css';
import logo from './logo.png'; // Импорт логотипа

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Проверяем, находимся ли мы на определенных страницах
    const isHomePage = location.pathname === '/project_x';
    const isAboutPage = location.pathname === '/project_x/about';
    const isFavoritesPage = location.pathname === '/project_x/favorites';

    // Обработчик клика по логотипу
    const handleLogoClick = () => {
        navigate('/project_x'); // Переход на главную страницу
    };

    return (
        <header className="header">
            {/* Логотип с обработчиком клика */}
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

            {/* Панель поиска — отображается только на страницах, где это нужно */}
            {!isHomePage && !isAboutPage && !isFavoritesPage && <SearchBar onSearch={onSearch} />}
        </header>
    );
};

export default Header;

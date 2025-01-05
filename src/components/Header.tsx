import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Context } from "../store/context"; // Импортируем контекст
import { observer } from "mobx-react-lite"; // Импортируем observer
import "./Header.css";

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const location = useLocation();
    const { store } = useContext(Context); // Подключаем MobX Store

    // Проверяем, находимся ли мы на главной странице
    const isHomePage = location.pathname === "/project_x";

    return (
        <header>
            <h1>Kinopoisk Clone</h1>
            <nav>
                {/* Добавляем счётчик количества закладок */}
                <Link to="project_x/favorites">Закладки ({store.bookmarks.length})</Link>
                {!isHomePage && <SearchBar onSearch={onSearch} />}
            </nav>
        </header>
    );
};

// Оборачиваем компонент в observer для автоматического обновления
export default observer(Header);

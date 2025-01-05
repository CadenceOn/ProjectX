import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../store/context";

import "./Header.css";
import logo from "./logo.png";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === "/project_x";
    const isAboutPage = location.pathname === "/project_x/about";
    const isFavoritesPage = location.pathname === "/project_x/favorites";

    const handleLogoClick = () => navigate("/project_x");

    const handleFavoritesClick = () => {
        navigate("/project_x/favorites");
    };

    return (
        <header className="header">
            <div className="logo-container" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" className="logo" />
                <h1>Kinopoisk Clone</h1>
            </div>

            <nav>
                <a
                    className={isAboutPage ? "nav-link active" : "nav-link"}
                    onClick={() => navigate("/project_x/about")}
                >
                    О нас
                </a>
                <div
                    className="favorites-container"
                    onClick={handleFavoritesClick}
                >
                    <a
                        className={isFavoritesPage ? "nav-link active" : "nav-link"}
                    >
                        Избранное
                    </a>
                    {store.bookmarks.length > 0 && (
                        <span className="favorites-badge">
                            {store.bookmarks.length}
                        </span>
                    )}
                </div>
            </nav>

            {!isHomePage && !isAboutPage && !isFavoritesPage && (
                <SearchBar onSearch={onSearch} />
            )}
        </header>
    );
};

export default observer(Header);

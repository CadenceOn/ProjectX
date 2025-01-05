import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            <h1>О нас</h1>
            <p>
                Добро пожаловать на Kinopoisk Clone! Мы стремимся предоставить вам
                лучшую информацию о фильмах, сериалах и многом другом. Здесь вы
                найдете рейтинги, обзоры, избранное и массу другой полезной информации.
            </p>
            <h2>Наша миссия</h2>
            <p>
                Наша цель — создать удобную платформу для поиска и хранения информации о
                ваших любимых фильмах.
            </p>
            <h2>Свяжитесь с нами</h2>
            <p>Email: support@kinopoisk-clone.com</p>
            <p>Телефон: +7 (123) 456-7890</p>
        </div>
    );
};

export default AboutPage;

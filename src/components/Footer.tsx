import React from 'react';
import './Footer.css';

// Импорт SVG через require
const FacebookIcon = require('../assets/facebook-svgrepo-com (2).svg').default;
const TwitterIcon = require('../assets/twitter-round-svgrepo-com.svg').default;
const InstagramIcon = require('../assets/instagram-round-svgrepo-com.svg').default;

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Kinopoisk Clone</h3>
          <p>
            Ваш лучший источник для поиска фильмов, сериалов и другой информации о кино.
            Наслаждайтесь просмотром!
          </p>
        </div>

        <div className="footer-section links">
          <h3>Полезные ссылки</h3>
          <ul>
            <li>
              <a href="project_x/about">Контакты</a>
            </li>
            <li>
              <a href="/privacy">Политика конфиденциальности</a>
            </li>
            <li>
              <a href="/terms">Условия использования</a>
            </li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Следите за нами</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={FacebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src={TwitterIcon} alt="Twitter" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={InstagramIcon} alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Kinopoisk Clone. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;

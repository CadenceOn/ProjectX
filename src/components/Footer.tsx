import React, { useState } from "react";
import "./Footer.css";
import FacebookIcon from "../assets/facebook-svgrepo-com.svg";
import TwitterIcon from "../assets/twitter-round-svgrepo-com.svg";
import InstagramIcon from "../assets/instagram-round-svgrepo-com.svg";

const Footer = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const modalData = {
        Контакты: (
            <>
                <h2>Контакты</h2>
                <p>Свяжитесь с нами:</p>
                <ul>
                    <li>
                        <strong>Email:</strong> support@kinopoisk-clone.com
                    </li>
                    <li>
                        <strong>Телефон:</strong> +7 (495) 123-45-67
                    </li>
                    <li>
                        <strong>Адрес:</strong> Казань, ул. Спартаковская, д. 2
                    </li>
                </ul>
            </>
        ),
        "Политика конфиденциальности": (
            <>
                <h2>Политика конфиденциальности</h2>
                <p>
                    Мы ценим вашу конфиденциальность и заботимся о защите ваших
                    данных. Вот основные положения нашей политики:
                </p>
                <ol>
                    <li>
                        <strong>Сбор данных:</strong> Мы собираем только те
                        данные, которые необходимы для предоставления
                        качественного сервиса, включая информацию о вашем
                        взаимодействии с нашим сайтом.
                    </li>
                    <li>
                        <strong>Использование данных:</strong> Ваши данные
                        используются исключительно для улучшения
                        пользовательского опыта, персонализации контента и
                        анализа работы нашего сервиса.
                    </li>
                    <li>
                        <strong>Передача данных:</strong> Мы не передаем ваши
                        личные данные третьим лицам без вашего предварительного
                        согласия, за исключением случаев, предусмотренных
                        законом.
                    </li>
                    <li>
                        <strong>Безопасность:</strong> Мы применяем современные
                        меры для защиты ваших данных от несанкционированного
                        доступа.
                    </li>
                </ol>
                <p>
                    Если у вас есть вопросы или замечания относительно нашей
                    политики конфиденциальности, пожалуйста, свяжитесь с нами по
                    адресу:
                    <a href="mailto:privacy@kinopoisk-clone.com">
                        privacy@kinopoisk-clone.com
                    </a>
                    .
                </p>
            </>
        ),
        "Условия использования": (
            <>
                <h2>Условия использования</h2>
                <ol>
                    <li>
                        <strong>Фильмы для всех и бесплатно:</strong> Вы
                        смотрите — мы радуемся. Никаких платных подписок,
                        VIP-доступов и прочей ерунды. Все фильмы доступны
                        абсолютно бесплатно, потому что мы верим в добро и
                        фильмы!
                    </li>
                    <li>
                        <strong>Контент как он есть:</strong> Мы делаем всё,
                        чтобы вы наслаждались лучшими фильмами, но если вдруг
                        главный герой не спас мир, вините режиссёра, а не нас.
                    </li>
                    <li>
                        <strong>Правила просты:</strong> Смотрите фильмы,
                        получайте удовольствие, не забывайте о попкорне. Если вы
                        думаете использовать сайт для чего-то нелегального,
                        лучше просто пересмотрите &quot;Побег из Шоушенка&quot;.
                    </li>
                    <li>
                        <strong>Без рекламы (но не совсем):</strong> У нас нет
                        рекламы, которая перебивает фильм каждые 5 минут, но
                        котики и мемы на главной странице считаются.
                    </li>
                    <li>
                        <strong>Серьёзно о шуточном:</strong> Мы не несём
                        ответственности, если вы заснёте на середине фильма,
                        забудете важные дела или станете киноманом. Это всё на
                        ваш страх и риск.
                    </li>
                </ol>
            </>
        ),
    };

    const handleOpenModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent("");
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>Kinopoisk Clone</h3>
                    <p>
                        Ваш лучший источник для поиска фильмов, сериалов и
                        другой информации о кино. Наслаждайтесь просмотром!
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Полезные ссылки</h3>
                    <ul>
                        <li>
                            <button
                                className="link-button"
                                onClick={() => handleOpenModal("Контакты")}
                            >
                                Контакты
                            </button>
                        </li>
                        <li>
                            <button
                                className="link-button"
                                onClick={() =>
                                    handleOpenModal(
                                        "Политика конфиденциальности"
                                    )
                                }
                            >
                                Политика конфиденциальности
                            </button>
                        </li>
                        <li>
                            <button
                                className="link-button"
                                onClick={() =>
                                    handleOpenModal("Условия использования")
                                }
                            >
                                Условия использования
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h3>Следите за нами</h3>
                    <div className="social-icons">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={FacebookIcon}
                                alt="Facebook"
                                className="social-icon"
                            />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={TwitterIcon}
                                alt="Twitter"
                                className="social-icon"
                            />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={InstagramIcon}
                                alt="Instagram"
                                className="social-icon"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Kinopoisk Clone. Все права защищены.</p>
            </div>

            {/* Модальное окно */}
            {isModalOpen && (
                <div className="modall-backdrop" onClick={handleCloseModal}>
                    <div
                        className="modall-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modall-close"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <div className="modall-text">
                            {modalData[modalContent]}
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;

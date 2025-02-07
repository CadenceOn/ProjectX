import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../api/services";
import "./SimilarMovies.css";
import { Similars } from "api/types";

interface SimilarMovie {
    id: number;
    name: string;
    description: string;
    genres: string[];
    year: string;
}

const SimilarMovies: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSimilarMovies = async () => {
            try {
                const numericId = Number(id);
                if (isNaN(numericId)) {
                    throw new Error("ID фильма недействителен");
                }

                // Лог перед запросом к API
                console.log("Fetching similar movies for ID:", numericId);

                // Запрос к API
                const response: { data: Similars } = await Movie.getSimilars({
                    id: numericId,
                });

                // Лог ответа от API
                console.log("API Response:", response.data);

                if (
                    !response.data ||
                    !response.data.items ||
                    response.data.items.length === 0
                ) {
                    throw new Error("Нет данных о похожих фильмах");
                }

                // Преобразование данных
                const transformedMovies = response.data.items.map((item) => ({
                    id: item.filmId,
                    name: item.nameRu || item.nameOriginal || "Без названия",
                    description: "Описание недоступно",
                    genres: ["Неизвестно"],
                    year: "Неизвестно",
                }));

                // Лог преобразованных фильмов
                console.log("Transformed Movies:", transformedMovies);

                setSimilarMovies(transformedMovies);
                setError(null);
            } catch (err) {
                console.error("Ошибка загрузки похожих фильмов:", err);
                setError("Ошибка загрузки похожих фильмов");
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarMovies();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутка вверх при смене фильма
    }, [id]);

    if (loading) return <p className="loading-message">Загрузка...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="similar-movies-section">
            <h2 className="similar-movies-title">Похожие фильмы</h2>
            {similarMovies.length === 0 ? (
                <p className="no-similar-movies">Нет похожих фильмов.</p>
            ) : (
                <div className="similar-movies-grid">
                    {similarMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="movie-card"
                            onClick={() =>
                                navigate(`/project_x/movies/${movie.id}`)
                            }
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    navigate(`/project_x/movies/${movie.id}`);
                                }
                            }}
                        >
                            <div className="movie-content">
                                <h3 className="movie-name">{movie.name}</h3>
                                <p className="movie-year">
                                    <strong>Год:</strong> {movie.year}
                                </p>
                                <p className="movie-genres">
                                    <strong>Жанры:</strong>{" "}
                                    {movie.genres.join(", ")}
                                </p>
                                <p className="movie-description">
                                    <strong>Описание:</strong>{" "}
                                    {movie.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SimilarMovies;

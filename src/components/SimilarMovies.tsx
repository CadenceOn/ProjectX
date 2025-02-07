import React, { useEffect, useState } from "react";
import { Movie } from "../api/services";
import { useParams, useNavigate } from "react-router-dom";

interface SimilarMovie {
  id: number;
  name: string;
  posterUrl: string;
  year: number;
}

const SimilarMovies: React.FC = () => {
  const { id } = useParams(); // Получение ID текущего фильма
  const navigate = useNavigate(); // Для навигации при клике
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const numericId = Number(id); // Преобразуем строку в число
        if (isNaN(numericId)) {
          console.error("ID не является числом:", id);
          return;
        }

        const response = await Movie.getSimilars({ id: numericId });
        const transformedMovies = response.data.items.map((item: any) => ({
          id: item.id,
          name: item.nameRu || "Без названия",
          posterUrl: item.posterUrl || "",
          year: item.year || 0,
        }));
        setSimilarMovies(transformedMovies);
      } catch (error) {
        console.error("Ошибка при загрузке похожих фильмов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

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
              onClick={() => navigate(`/movies/${movie.id}`)} // Открытие фильма при клике
            >
              <img
                src={movie.posterUrl}
                alt={movie.name}
                className="movie-poster"
              />
              <h3 className="movie-name">{movie.name}</h3>
              <p className="movie-year">{movie.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarMovies;

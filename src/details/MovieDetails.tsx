import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";
import { Context } from "../store/context";
import RatingComponent from "../components/RatingComponent";
import ScreenshotCarousel from "../components/ScreenshotCarousel";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [awards, setAwards] = useState([]);
  const [boxOffice, setBoxOffice] = useState([]);
  const [showAllAwards, setShowAllAwards] = useState(false);
  const [playerUrls, setPlayerUrls] = useState<string[]>([]);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieImages, setMovieImages] = useState<string[]>([]);
  const { store } = useContext(Context);

  const fetchMovieDetails = async () => {
    try {
      store.movie
        .getMovie({ id: Number(id) })
        .then((response) => {
          setMovie(response.data);
          setError(null);
        })
        .catch(() => {
          setError('Error');
        });
        // Получение наград
    store.movie.getAwards({ id: Number(id) }).then((response) => {
      setAwards(response.data.items || []);
    });

    // Получение кассовых сборов
    store.movie.getBoxOffice({ id: Number(id) }).then((response) => {
      setBoxOffice(response.data.items || []);
    });
      
      
      const numericId = Number(id);

      if (!id || isNaN(numericId)) {
        console.error("Invalid movie ID:", id);
        throw new Error("Invalid movie ID");
      }

      console.log("Fetching movie details for ID:", numericId);

      // Получение деталей фильма
      const movieResponse = await store.movie.getMovie({ id: numericId });
      if (!movieResponse?.data) {
        throw new Error("Movie not found");
      }
      console.log("Movie Details Response:", movieResponse.data);
      setMovie(movieResponse.data);

      // Получение похожих фильмов
      const similarResponse = await store.movie.getSimilars({ id: numericId });
      if (similarResponse?.data?.items) {
        console.log("Similar Movies Response:", similarResponse.data.items);
        setSimilarMovies(similarResponse.data.items || []);
      }

      // Получение плееров
      const playerResponse = await store.watchMovie.getPlayerInfo({ id: numericId });
      const playerData = playerResponse?.data?.data || [];
      setPlayerUrls(playerData.map((item) => item.iframeUrl).filter(Boolean));

      // Получение скриншотов
      const responseImages = await store.movie.getImages(
        { id: numericId },
        { type: "SCREENSHOT", page: 1 }
      );
      if (responseImages?.data?.items) {
        const screenshots = responseImages.data.items
          .slice(0, 10)
          .map((img) => img.imageUrl);
        setMovieImages(screenshots);
      }

      setError(null);


    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
      setError("Не удалось загрузить данные фильма");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Movie ID from URL:", id);
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="anime-loading">Загрузка<span>.</span><span>.</span><span>.</span></div>;
  if (error) return <p className="error-message">{error}</p>;
  if (!movie) return <p>Фильм не найден.</p>;

  return (
    <div className="anime-container">
      <div className="anime-decoration top-left"></div>
      <div className="anime-decoration top-right"></div>
      <div className="anime-decoration bottom-left"></div>
      <div className="anime-decoration bottom-right"></div>
      
      <div className="movie-details-container">
        <div className="movie-poster-container">
          <div className="movie-poster-frame">
            <img
              src={movie.posterUrl}
              alt={movie.nameRu || "Постер"}
              className="movie-poster"
            />
            <div className="poster-shine"></div>
          </div>
          <div className="poster-badge">{movie.ratingKinopoisk || "?"}</div>
        </div>
        <div className="movie-info">
          <h1>{movie.nameRu || "Без названия"}</h1>
          <p>
            <strong>Описание:</strong> {movie.description || "Описание недоступно"}
          </p>
          <p>
            <strong>Жанр:</strong>{" "}
            {movie.genres?.map((genre, index: number) => (
              <span key={index} className="genre-tag">
                {genre.genre}
                {index < movie.genres.length - 1 && ", "}
              </span>
            )) || "Неизвестно"}
          </p>
          <p>
            <strong>Страна:</strong>{" "}
            {movie.countries?.map((country, index: number) => (
              <span key={index}>
                {country.country}
                {index < movie.countries.length - 1 && ", "}
              </span>
            )) || "Неизвестно"}
          </p>
          <p>
            <strong>Год:</strong> {movie.year || "Неизвестно"}
          </p>
          <p>
            <strong>Рейтинг Kinopoisk:</strong> <span className="rating-highlight">{movie.ratingKinopoisk || "N/A"}</span>
          </p>
          <p>
            <strong>Рейтинг IMDb:</strong> <span className="rating-highlight">{movie.ratingImdb || "N/A"}</span>
          </p>
          <div className="user-rating">
            <h4>Ваш рейтинг:</h4>
            <RatingComponent movieId={id} />
          </div>
          <div className="movie-extras">
        <div className="awards-section">
          <h2>Награды</h2>
          {awards && awards.length > 0 ? (
          <>
          <ul className={`awards-list ${showAllAwards ? 'expanded' : 'collapsed'}`}>
            {awards.slice(0, showAllAwards ? awards.length : 3).map((award, index) => (
              <li key={index}>
                {award.nominationName} ({award.year}) - {award.win ? 'Победа' : 'Номинация'}
              </li>
            ))}
          </ul>
          {awards.length > 3 && (
            <button onClick={() => setShowAllAwards(!showAllAwards)}>
              {showAllAwards ? 'Свернуть' : 'Развернуть'}
            </button>
          )}
          </>
          ): (<p>Данные о наградах недоступны</p>)}
        </div>

        <div className="box-office-section">
          <h2>Кассовые сборы</h2>
          {boxOffice && boxOffice.length > 0 ? (
          <ul>{boxOffice.map((entry, index) => (
              <li key={index}>
              {entry.name ? `${entry.name}: ` : ''} {/* Страна */}
              {entry.amount} {entry.currencyCode} {entry.symbol} {/* Сумма и валюта */}
              {entry.type ? ` (${entry.type})` : ''} {/* Тип сборов */}
            </li>
            ))}
          </ul>
          ): (<p>Данные о кассовых сборах недоступны</p>)}
        </div>
      </div>
        </div>
      </div>

      {movieImages.length > 0 && <ScreenshotCarousel images={movieImages} />}

      <div className="playerControlPanel">
        <h1>Выберите плеер <span className="anime-accent">ᓚᘏᗢ</span></h1>
        <div className="playerButtonContainer">
          {playerUrls.map((url, i) => (
            <div key={`player-${i}`} className="buttonPlayer" onClick={() => setPlayerNumber(i)}>
              <span className="player-label">Плеер</span>
              <span className="player-number">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <iframe className="moviePlayer" src={playerUrls[playerNumber]} allowFullScreen />

      <div className="similar-movies-section">
        <h2>Похожие фильмы <span className="anime-accent">ʕ•ᴥ•ʔ</span></h2>
        {similarMovies.length > 0 ? (
          <div className="similar-movies-grid">
            {similarMovies.map((similarMovie) => (
              <div
                key={similarMovie.filmId}
                className="similar-movie-card"
                onClick={() => {
                  if (similarMovie.filmId) {
                    navigate(`/project_x/movies/${similarMovie.filmId}`);
                  } else {
                    console.error("Missing film ID for similar movie:", similarMovie);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && similarMovie.filmId) {
                    navigate(`/project_x/movies/${similarMovie.filmId}`);
                  }
                }}
              >
                <div className="similar-movie-inner">
                  <img
                    src={similarMovie.posterUrl || "https://via.placeholder.com/200x300"}
                    alt={similarMovie.nameRu || "Постер"}
                    className="similar-movie-poster"
                  />
                  <p className="similar-movie-title">{similarMovie.nameRu || "Без названия"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Похожие фильмы не найдены.</p>
        )}
      </div>
      
      <div className="anime-watch-btn">
        <a href={`https://flicksbar.mom/film/${id}`}>
          <span className="btn-effect"></span>
          <span className="btn-text">Смотреть на Flicksbar</span>
        </a>
      </div>
    </div>
  );
};

export default MovieDetails;
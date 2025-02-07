import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import { Context } from '../store/context';
import RatingComponent from '../components/RatingComponent';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerUrls, setPlayerUrls] = useState<string[]>([]);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [similarMovies, setSimilarMovies] = useState([]); // State для похожих фильмов
  const { store } = useContext(Context);

  const fetchMovieDetails = async () => {
    try {
      // Получение деталей фильма
      const movieResponse = await store.movie.getMovie({ id: Number(id) });
      setMovie(movieResponse.data);

      // Получение списка похожих фильмов
      const similarResponse = await store.movie.getSimilars({ id: Number(id) });
      setSimilarMovies(similarResponse.data.items || []); // Сохраняем список похожих фильмов

      // Получение плееров
      const playerResponse = await store.watchMovie.getPlayerInfo({ id: Number(id) });
      if (playerResponse.data.data && Array.isArray(playerResponse.data.data)) {
        setPlayerUrls(
          playerResponse.data.data
            .map((item) => item.iframeUrl)
            .filter((url) => url !== undefined),
        );
      }

      setError(null);
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>No movie found.</p>;

  return (
    <div>
      <div className="movie-details-container">
        <img src={movie.posterUrl} alt={movie.nameRu} className="movie-poster" />
        <div className="movie-info">
          <h1>{movie.nameRu}</h1>
          <p>
            <strong>Описание:</strong> {movie.description}
          </p>
          <p>
            <strong>Жанр:</strong>{' '}
            {movie.genres.map((genre, index) => (
              <span key={index}>
                {genre.genre}
                {index < movie.genres.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p>
            <strong>Страна:</strong>{' '}
            {movie.countries.map((country, index) => (
              <span key={index}>
                {country.country}
                {index < movie.countries.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p>
            <strong>Год:</strong> {movie.year}
          </p>
          <p>
            <strong>Рейтинг Kinopoisk:</strong> {movie.ratingKinopoisk}
          </p>
          <p>
            <strong>Рейтинг IMDb:</strong> {movie.ratingImdb}
          </p>
          <div className="user-rating">
            <h4>Ваш рейтинг:</h4>
            <RatingComponent movieId={id} />
          </div>
        </div>
      </div>

      <a href={`https://flicksbar.mom/film/${id}`}>Смотреть на Flicksbar</a>
      <div className="playerControlPanel">
        <h1>Выберите плеер.</h1>
        <div className="playerButtonContainer">
          {playerUrls.map((item, i) => {
            return (
              <div
                key={i}
                className="buttonPlayer"
                onClick={() => {
                  setPlayerNumber(i);
                }}>
                Плеер {i + 1}
              </div>
            );
          })}
        </div>
      </div>
      <iframe
        className="moviePlayer"
        src={playerUrls[playerNumber]}
        allowFullScreen>
      </iframe>

      {/* Секция для похожих фильмов */}
      <div className="similar-movies-section">
        <h2>Похожие фильмы</h2>
        {similarMovies.length > 0 ? (
          <div className="similar-movies-grid">
            {similarMovies.map((movie) => (
              <div key={movie.id} className="similar-movie-card">
                <img
                  src={movie.posterUrl}
                  alt={movie.name}
                  className="similar-movie-poster"
                />
                <p className="similar-movie-title">{movie.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Похожие фильмы не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;

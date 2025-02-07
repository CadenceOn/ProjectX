import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import { Context } from '../store/context';
import RatingComponent from '../components/RatingComponent';

const MovieDetails = () => {
  const { id } = useParams();
  const { store } = useContext(Context);

  // Стейт для деталей фильма
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Стейт для URL плееров
  const [playerUrls, setPlayerUrls] = useState<string[]>([]);
  const [playerNumber, setPlayerNumber] = useState(0);

  // Стейт для изображений
  const [movieImages, setMovieImages] = useState<string[]>([]);

  // Функция загрузки информации о фильме + плеер
  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      // Запрос основных данных о фильме
      const movieResponse = await store.movie.getMovie({ id: Number(id) });
      setMovie(movieResponse.data);

      // Параллельно (или последовательно) запрос плеера
      const playerInfoResponse = await store.watchMovie.getPlayerInfo({ id: Number(id) });
      if (playerInfoResponse.data.data && Array.isArray(playerInfoResponse.data.data)) {
        const urls = playerInfoResponse.data.data
          .map((item) => item?.iframeUrl)
          .filter((url: string | undefined) => url !== undefined) as string[];
        setPlayerUrls(urls);
      }

      // Запрос скриншотов (type: 'SCREENSHOT')
      const imagesResponse = await store.movie.getImages(
        { id: Number(id) },
        { type: 'SCREENSHOT', page: 1 }
      );

      // Вытаскиваем первые 10 картинок (можно больше/меньше)
      const images = imagesResponse.data.items.slice(0, 10).map((img) => img.imageUrl);
      setMovieImages(images);

      setError(null);
    } catch{
      setError('Ошибка при загрузке информации о фильме');
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
    <div className="movie-details-page">
      {/* Основной блок с описанием */}
      <div className="movie-details-container">
        <img src={movie.posterUrl} alt={movie.nameRu} className="movie-poster" />
        <div className="movie-info">
          <h1>{movie.nameRu}</h1>
          <p>
            <strong>Описание:</strong> {movie.description}
          </p>
          <p>
            <strong>Жанр:</strong>{' '}
            {movie.genres.map((genre, index: number) => (
              <span key={index}>
                {genre.genre}
                {index < movie.genres.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p>
            <strong>Страна:</strong>{' '}
            {movie.countries.map((country, index: number) => (
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

      {/* Блок с картинками (скриншотами) до плеера */}
      <div className="movie-images-container">
        <h2>Скриншоты</h2>
        <div className="movie-images-grid">
          {movieImages.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`Screenshot ${idx + 1}`}
              className="movie-screenshot"
            />
          ))}
        </div>
      </div>

      {/* Доступ к стороннему сайту - если нужно */}
      <a href={`https://flicksbar.mom/film/${id}`}>Смотреть на Flicksbar</a>

      {/* Блок выбора плеера */}
      <div className="playerControlPanel">
        <h1>Выберите плеер.</h1>
        <div className="playerButtonContainer">
          {playerUrls.map((_, i) => (
            <div
              key={i}
              className="buttonPlayer"
              onClick={() => {
                setPlayerNumber(i);
              }}
            >
              Плеер {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Сам iframe */}
      {playerUrls.length > 0 && (
        <iframe
          className="moviePlayer"
          src={playerUrls[playerNumber]}
          allowFullScreen
          title="Movie Player"
        />
      )}
    </div>
  );
};

export default MovieDetails;

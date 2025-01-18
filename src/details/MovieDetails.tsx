// src/details/MovieDetails.tsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import { Context } from '../store/context';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerUrls, setPlayerUrls] = useState<string[]>([]);
  const [playerNumber, setPlayerNumber] = useState(0);
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
      store.watchMovie.getPlayerInfo({ id: Number(id) }).then((response) => {
        console.log('response', response);
        if (response.data.data && Array.isArray(response.data.data)) {
          setPlayerUrls(
            response.data.data
              .map((item) => {
                if (item.iframeUrl) {
                  return item.iframeUrl;
                }
              })
              .filter((element) => element !== undefined),
          );
        }
      });
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
      <h1>{movie.nameRu}</h1>
      <img src={movie.posterUrl} alt={movie.nameRu} />
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
        <strong>Рейтинг Imdb:</strong> {movie.ratingImdb}
      </p>
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
                {i}
              </div>
            );
          })}
        </div>
      </div>
      <iframe className="moviePlayer" src={playerUrls[playerNumber]}></iframe>
    </div>
  );
};

export default MovieDetails;

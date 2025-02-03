import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import './HomePage.css';
import { ContainerGrid } from '../components/ContainerGrid';
import { Context } from '../store/context';
import { GridPoster } from '../components/GridPoster/components/GridPoster';
import FilterModal from '../components/FilterModal/FilterModal';

const HomePage = () => {
  const [movies, setMovies] = useState([]); // Полный список фильмов
  const [filteredMovies, setFilteredMovies] = useState([]); // Фильтрованные фильмы
  const [genres, setGenres] = useState([]); // Список жанров из API
  const [countries, setCountries] = useState([]); // Список стран из API
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false); // Состояние для открытия модального окна
  const { store } = useContext(Context);

  // Получение фильмов и жанров из API
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await store.list.getFilmsFilter({ keyword: searchQuery });
      const moviesData = response.data.items;

      // Извлекаем жанры и страны из фильмов
      const allGenres = new Set();
      const allCountries = new Set();
      moviesData.forEach((movie) => {
        movie.genres.forEach((genre) => allGenres.add(genre.genre));
        movie.countries.forEach((country) => allCountries.add(country.country));
      });

      setMovies(moviesData);
      setFilteredMovies(moviesData);
      setGenres(Array.from(allGenres)); // Сохраняем уникальные жанры
      setCountries(Array.from(allCountries)); // Сохраняем уникальные страны
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация фильмов по жанрам и странам
  const handleFilter = (selectedFilters: { genres: string[]; countries: string[] }) => {
    const { genres: selectedGenres, countries: selectedCountries } = selectedFilters;

    let filtered = movies;

    // Фильтруем по жанрам
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genres.some((genre) => selectedGenres.includes(genre.genre)),
      );
    }

    // Фильтруем по странам
    if (selectedCountries.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.countries.some((country) => selectedCountries.includes(country.country)),
      );
    }

    setFilteredMovies(filtered);
    setModalOpen(false); // Закрываем модальное окно
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="home-page">
      <div className="search-filter-container">
        <SearchBar onSearch={setSearchQuery} />
        <button onClick={() => setModalOpen(true)} className="filter-button">
          <img src={require('../assets/filter.png')} alt="Filter" className="filter-icon" />
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ContainerGrid>
          {filteredMovies.map((movie) => (
            <GridPoster
              id={movie.kinopoiskId}
              name={movie.nameRu ? movie.nameRu : movie.nameEn}
              creator={movie.rating}
              image={movie.posterUrl}
              key={movie.kinopoiskId}
            />
          ))}
        </ContainerGrid>
      )}
      {/* Модальное окно фильтрации */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        genres={genres} // Передаем список жанров в модальное окно
        countries={countries} // Передаем список стран в модальное окно
        onApply={handleFilter}
      />
    </div>
  );
};

export default HomePage;

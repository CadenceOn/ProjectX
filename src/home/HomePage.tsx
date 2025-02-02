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
  const [currentPage, setCurrentPage] = useState(1); // Номер текущей страницы
  const [hasMore, setHasMore] = useState(true); // Флаг наличия следующих страниц
  const { store } = useContext(Context);

  // Фильтрация нежелательных фильмов
  const filterSafeMovies = (movies) => {
    const bannedGenres = ['Erotic', 'Порнопародия', 'Эротика', 'для взрослых']; // Запрещенные жанры
    const bannedKeywords = ['для взрослых', 'эротика', 'порнопародия', '18+']; // Запрещенные слова

    return movies.filter((movie) => {
      const hasBannedGenre = movie.genres?.some((genre) =>
        bannedGenres.includes(genre.genre)
      );
      const hasBannedKeyword = bannedKeywords.some(
        (keyword) =>
          movie.nameRu?.toLowerCase().includes(keyword) ||
          movie.nameEn?.toLowerCase().includes(keyword) ||
          movie.description?.toLowerCase().includes(keyword)
      );
      return !hasBannedGenre && !hasBannedKeyword;
    });
  };

  // Получение фильмов из API
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await store.list.getFilmsFilter({
        keyword: searchQuery,
        page: currentPage, // Указываем текущую страницу
      });
      const moviesData = filterSafeMovies(response.data.items || []);

      // Если больше фильмов нет
      if (moviesData.length === 0) {
        setHasMore(false);
      }

      // Обновляем список фильмов
      setMovies((prev) => [...prev, ...moviesData]);
      setFilteredMovies((prev) => [...prev, ...moviesData]);

      // Извлекаем жанры и страны из фильмов
      const allGenres = new Set(genres);
      const allCountries = new Set(countries);
      moviesData.forEach((movie) => {
        if (movie.genres) {
          movie.genres.forEach((genre) => allGenres.add(genre.genre));
        }
        if (movie.countries) {
          movie.countries.forEach((country) =>
            allCountries.add(country.country)
          );
        }
      });

      setGenres(Array.from(allGenres));
      setCountries(Array.from(allCountries));
    } catch (error) {
      console.error('Ошибка загрузки фильмов:', error);
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация фильмов по жанрам и странам
  const handleFilter = (selectedFilters) => {
    const { genres: selectedGenres, countries: selectedCountries } =
      selectedFilters;

    let filtered = movies;

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genres.some((genre) => selectedGenres.includes(genre.genre))
      );
    }

    if (selectedCountries.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.countries.some((country) =>
          selectedCountries.includes(country.country)
        )
      );
    }

    setFilteredMovies(filtered);
    setModalOpen(false); // Закрываем модальное окно
  };

  // Загрузка следующей страницы
  const loadMoreMovies = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery]);

  return (
    <div className="home-page">
      <div className="search-filter-container">
        <SearchBar
          onSearch={(query) => {
            setSearchQuery(query);
            setMovies([]); // Очищаем список фильмов при новом поиске
            setFilteredMovies([]);
            setCurrentPage(1); // Сбрасываем страницу
            setHasMore(true); // Сбрасываем флаг наличия следующих страниц
          }}
        />
        <button onClick={() => setModalOpen(true)} className="filter-button">
          Фильтр
        </button>
      </div>
      {loading && currentPage === 1 ? (
        <Loader />
      ) : (
        <>
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
          {hasMore && !loading && (
            <div className="load-more-container">
              <button onClick={loadMoreMovies} className="load-more-button">
                Загрузить еще
              </button>
            </div>
          )}
        </>
      )}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        genres={genres}
        countries={countries}
        onApply={handleFilter}
      />
    </div>
  );
};

export default HomePage;

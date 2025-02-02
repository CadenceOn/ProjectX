import React, { useState } from 'react';
import './FilterModal.css';

const FilterModal = ({
  isOpen,
  onClose,
  genres,
  countries,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  genres: string[];
  countries: string[];
  onApply: (selectedFilters: { genres: string[]; countries: string[] }) => void;
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country],
    );
  };

  const handleApply = () => {
    onApply({ genres: selectedGenres, countries: selectedCountries });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Фильтры</h2>

        {/* Фильтр по жанрам */}
        <div className="genres-list">
          <h3>Жанры</h3>
          {genres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
              />
              {genre}
            </label>
          ))}
        </div>

        {/* Фильтр по странам */}
        <div className="countries-list">
          <h3>Страны</h3>
          {countries.map((country) => (
            <label key={country}>
              <input
                type="checkbox"
                value={country}
                checked={selectedCountries.includes(country)}
                onChange={() => toggleCountry(country)}
              />
              {country}
            </label>
          ))}
        </div>

        {/* Действия */}
        <div className="modal-actions">
          <button onClick={onClose}>Закрыть</button>
          <button onClick={handleApply}>Применить</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

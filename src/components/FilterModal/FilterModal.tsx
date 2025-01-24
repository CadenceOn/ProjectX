import React, { useState } from "react";
import "./FilterModal.css"; // Создайте CSS для стилизации

const FilterModal = ({
    isOpen,
    onClose,
    genres,
    onApply,
}: {
    isOpen: boolean;
    onClose: () => void;
    genres: string[];
    onApply: (selectedGenres: string[]) => void;
}) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleApply = () => {
        onApply(selectedGenres);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Фильтр по жанрам</h2>
                <div className="genres-list">
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
                <div className="modal-actions">
                    <button onClick={onClose}>Закрыть</button>
                    <button onClick={handleApply}>Применить</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;

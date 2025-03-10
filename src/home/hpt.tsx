// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import HomePage from './HomePage';
// import { Context } from '../store/context';
// import '@testing-library/jest-dom/extend-expect';
// import { Store } from '../store/store';
// import "@testing-library/jest-dom";



//     getFilmsFilter: jest.fn(),
//   },
// };

// // Mock Movies Data
// const mockMovies = [
//   {
//     kinopoiskId: 1,
//     nameRu: 'Фильм 1',
//     nameEn: 'Movie 1',
//     rating: 8.5,
//     posterUrl: 'movie1.jpg',
//     genres: [{ genre: 'Action' }],
//     countries: [{ country: 'USA' }],
//   },
//   {
//     kinopoiskId: 2,
//     nameRu: 'Фильм 2',
//     nameEn: 'Movie 2',
//     rating: 7.8,
//     posterUrl: 'movie2.jpg',
//     genres: [{ genre: 'Drama' }],
//     countries: [{ country: 'France' }],
//   },
// ];

// // Mock API Response
// mockStore.list.getFilmsFilter.mockResolvedValue({
//   data: {
//     items: mockMovies,
//   },
// });

// // Render Component with Context
// const renderWithContext = () => {
//       const mockStore = new Store(); // 
//   return render(
//     <Context.Provider value={{ store: mockStore }}>
//       <HomePage />
//     </Context.Provider>
//   );
// };

// describe('HomePage Component', () => {
//   it('renders the SearchBar, Filter Button, and Loader initially', async () => {
//     renderWithContext();

//     // Check if search bar and filter button exist
//     expect(screen.getByRole('textbox')).toBeInTheDocument();
//     expect(screen.getByAltText('Filter')).toBeInTheDocument();

//     // Check if loader is displayed initially
//     expect(screen.getByTestId('loader')).toBeInTheDocument();

//     // Wait for movies to load
//     await waitFor(() => expect(mockStore.list.getFilmsFilter).toHaveBeenCalled());
//   });

//   it('fetches and displays movies correctly', async () => {
//     renderWithContext();

//     // Wait for movies to load
//     await waitFor(() => {
//       expect(screen.getByText('Фильм 1')).toBeInTheDocument();
//       expect(screen.getByText('Фильм 2')).toBeInTheDocument();
//     });

//     // Check images are loaded
//     expect(screen.getByAltText('Фильм 1')).toHaveAttribute('src', 'movie1.jpg');
//     expect(screen.getByAltText('Фильм 2')).toHaveAttribute('src', 'movie2.jpg');
//   });

//   it('opens and closes the filter modal', async () => {
//     renderWithContext();

//     // Click filter button
//     const filterButton = screen.getByAltText('Filter');
//     fireEvent.click(filterButton);

//     // Modal should appear
//     expect(await screen.findByText('Применить')).toBeInTheDocument();

//     // Close modal
//     fireEvent.click(screen.getByText('Закрыть'));
//     await waitFor(() => {
//       expect(screen.queryByText('Применить')).not.toBeInTheDocument();
//     });
//   });

//   it('searches movies when a query is entered', async () => {
//     renderWithContext();

//     // Simulate entering search query
//     const searchInput = screen.getByRole('textbox');
//     fireEvent.change(searchInput, { target: { value: 'New Movie' } });
//     fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

//     // Expect API to be called with new keyword
//     await waitFor(() => {
//       expect(mockStore.list.getFilmsFilter).toHaveBeenCalledWith({
//         keyword: 'New Movie',
//         page: 1,
//       });
//     });
//   });

//   it('loads more movies when "Load More" button is clicked', async () => {
//     renderWithContext();

//     // Wait for initial load
//     await waitFor(() => {
//       expect(screen.getByText('Фильм 1')).toBeInTheDocument();
//     });

//     // Click Load More button
//     const loadMoreButton = screen.getByText('Загрузить еще');
//     fireEvent.click(loadMoreButton);

//     // Check if the function for fetching next page is triggered
//     await waitFor(() => {
//       expect(mockStore.list.getFilmsFilter).toHaveBeenCalledWith(
//         expect.objectContaining({ page: 2 })
//       );
//     });
//   });
// });

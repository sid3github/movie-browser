import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import useDebounce from './hooks/useDebounce';
import './App.css';

const App = () => {
  const currentYear = new Date().getFullYear();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    yearRange: [1900, currentYear], // Change the initial year range
    ratingRange: [0, 10],
  });

  const debouncedQuery = useDebounce(query, 500);

  const fetchMovies = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const params = {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          page: reset ? 1 : page,
          with_genres: filters.genre,
          'primary_release_date.gte': `${filters.yearRange[0]}-01-01`,
          'primary_release_date.lte': `${filters.yearRange[1]}-12-31`,
          'vote_average.gte': filters.ratingRange[0],
          'vote_average.lte': filters.ratingRange[1],
        };

        if (debouncedQuery) {
          params.query = debouncedQuery;
        }

        const endpoint = debouncedQuery
          ? 'https://api.themoviedb.org/3/search/movie'
          : 'https://api.themoviedb.org/3/discover/movie';

        const response = await axios.get(endpoint, { params });

        if (reset) {
          setMovies(response.data.results);
          setPage(2);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setPage((prevPage) => prevPage + 1);
        }

        // Check if there are more pages to fetch
        const totalPages = response.data.total_pages || 1;
        setHasMore(page < totalPages);
      } catch (error) {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [page, debouncedQuery, filters, loading]
  );

  useEffect(() => {
    fetchMovies(true);
  }, [fetchMovies]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className='App max-w-4xl mx-auto p-4'>
      <h1 className='text-4xl font-bold text-center mb-8 text-blue-600'>
        <span className='inline-block transform transition-transform duration-500 hover:scale-110'>
          Movie Browser
        </span>
      </h1>
      <SearchBar onSearch={handleSearch} />
      <Filters onFilterChange={handleFilterChange} />
      <InfiniteScroll
        dataLength={movies.length}
        next={() => fetchMovies(false)}
        hasMore={hasMore}
        loader={loading && movies.length === 0 && <h4>Loading...</h4>}
      >
        <MovieList movies={movies} />
      </InfiniteScroll>
    </div>
  );
};

export default App;

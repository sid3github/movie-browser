import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const currentYear = new Date().getFullYear();
  const [genre, setGenre] = useState('');
  const [yearRange, setYearRange] = useState([1980, currentYear]);
  const [ratingRange, setRatingRange] = useState([0, 10]);

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    onFilterChange({ genre: e.target.value, yearRange, ratingRange });
  };

  const handleYearRangeChange = (e) => {
    const newYearRange = [yearRange[0], parseInt(e.target.value)];
    setYearRange(newYearRange);
    onFilterChange({ genre, yearRange: newYearRange, ratingRange });
  };

  const handleRatingRangeChange = (e) => {
    const newRatingRange = [ratingRange[0], parseInt(e.target.value)];
    setRatingRange(newRatingRange);
    onFilterChange({ genre, yearRange, ratingRange: newRatingRange });
  };

  return (
    <div className='mb-4 flex flex-col sm:flex-row sm:space-x-4'>
      <select
        value={genre}
        onChange={handleGenreChange}
        className='p-2 border rounded mb-2 sm:mb-0 sm:w-auto'
      >
        <option value=''>All Genres</option>
        <option value='28'>Action</option>
        <option value='12'>Adventure</option>
        <option value='16'>Animation</option>
        <option value='35'>Comedy</option>
        <option value='80'>Crime</option>
        <option value='99'>Documentary</option>
        <option value='18'>Drama</option>
        <option value='10751'>Family</option>
        <option value='14'>Fantasy</option>
        <option value='36'>History</option>
        <option value='27'>Horror</option>
        <option value='10402'>Music</option>
        <option value='9648'>Mystery</option>
        <option value='10749'>Romance</option>
        <option value='878'>Science Fiction</option>
        <option value='10770'>TV Movie</option>
        <option value='53'>Thriller</option>
        <option value='10752'>War</option>
        <option value='37'>Western</option>
      </select>
      <div className='flex flex-col sm:flex-row sm:space-x-4'>
        <input
          type='number'
          value={yearRange[1]}
          onChange={handleYearRangeChange}
          placeholder='Year'
          className='p-2 border rounded mb-2 sm:mb-0'
        />
        <input
          type='number'
          value={ratingRange[1]}
          onChange={handleRatingRangeChange}
          placeholder='Rating'
          className='p-2 border rounded'
        />
      </div>
    </div>
  );
};

export default Filters;

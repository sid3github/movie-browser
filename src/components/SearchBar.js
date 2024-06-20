import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='mb-4'>
      <input
        type='text'
        value={searchQuery}
        onChange={handleInputChange}
        placeholder='Search for movies...'
        className='w-full p-2 border rounded'
      />
    </div>
  );
};

export default SearchBar;

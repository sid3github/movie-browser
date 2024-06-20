import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Heart } from 'feather-icons-react';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteMovies =
      JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setIsFavorite(favoriteMovies.some((favMovie) => favMovie.id === movie.id));
  }, [movie.id]);

  const handleFavoriteClick = () => {
    const favoriteMovies =
      JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favoriteMovies.filter(
        (favMovie) => favMovie.id !== movie.id
      );
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favoriteMovies.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }
    setIsFavorite(!isFavorite);
  };

  const { title, poster_path, release_date } = movie;

  return (
    <div className='relative rounded-lg overflow-hidden shadow-md hover:shadow-xl'>
      <LazyLoadImage
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : 'https://cdn2.iconfinder.com/data/icons/vivid/48/image-1024.png'
        }
        alt={title}
        className='w-[100rem] h-48 sm:h-64 object-cover'
        effect='blur'
      />
      <div className='px-2'>
        <h4 className='text-sm font-semibold mb-1'>{title}</h4>
        <p className='text-gray-600 text-sm line-clamp-3'>{release_date}</p>
      </div>
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full text-gray-700 transition-colors duration-300 ${
          isFavorite
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart size={18} strokeWidth={2} className='stroke-current' />
      </button>
    </div>
  );
};

export default MovieCard;

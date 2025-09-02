import { fetchMovieDetails } from "./fetchMovieDetails.js";

export const fetchMoviesPopular = async (apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
  );
  const data = await response.json();
  const results = data.results[0].id;
  fetchMovieDetails(results, apiKey);
};

import { fetchMovieDetails } from "./fetchMovieDetails.js";

const apiKey = process.env.API_KEY;

export const fetchMoviesPopular = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
  );
  const data = await response.json();
  const results = data.results[5].id;
  fetchMovieDetails(results);
};

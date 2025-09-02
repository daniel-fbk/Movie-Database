import { renderPage } from "./render.js";

export const fetchMovieDetails = async (id, apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  const data = await response.json();
  const results = data;
  renderPage(results);
};

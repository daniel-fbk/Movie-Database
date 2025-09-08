import { renderPage } from "./render.js";

const apiKey = process.env.API_KEY;

export const fetchMovieDetails = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  const data = await response.json();
  const results = data;
  console.log(results);
  renderPage(results);
};

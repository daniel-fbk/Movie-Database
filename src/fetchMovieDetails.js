import { renderPage } from "./render.js";

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`/.netlify/functions/movieDetailsApi?id=${id}`);
  const data = await response.json();
  const results = data;
  renderPage(results);
};

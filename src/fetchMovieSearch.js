import { fetchMovieDetails } from "./fetchMovieDetails.js";
import { renderPage } from "./render.js";

const searchForm = document.getElementById("nav-search-form");
const searchBar = document.getElementById("search-bar");
const liveSearchDropdown = document.getElementById("live-search-dropdown");

const apiKey = "1488bcbfe94f3af062a3346d2b7a6f4e";

export const fetchMovieSearch = async (title, apiKey) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`
  );
  const data = await response.json();
  const results = data.results[0].id;
  fetchMovieDetails(results, apiKey);
};

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(searchForm);
  let userInput = formData.get("search-input");
  if (!userInput) {
    return;
  }
  searchBar.value = "";
  fetchMovieSearch(userInput, apiKey);
});

// searchBar.addEventListener("input", async () => {
//   const query = searchBar.value;

//   if (query.length < 2) {
//     liveSearchDropdown.style.display = "none";
//     return;
//   }
//   const suggestions = await fetchSearchMovie(currentMovieId);

//   suggestions.forEach((movie) => {
//     // Poster, Title, Release Year, 2 actors
//     const suggestedMovie = createElement("div");
//     const posterContainer = createElement("div");
//     const suggestedMoviePoster = createElement("img");
//     suggestedMoviePoster.classList.add("suggested-movie-poster");
//     suggestedMoviePoster.src = movie.poster_path;
//     suggestedMovie.append(suggestedMoviePoster);
//     liveSearchDropdown.append(suggestedMovie);
//   });
// });

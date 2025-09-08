import { fetchMovieCredits } from "./fetchMovieCredits.js";
import { fetchMovieDetails } from "./fetchMovieDetails.js";
const imageNotFound = new URL("./images/imagenotfound.jpg", import.meta.url)
  .href;

const searchForm = document.getElementById("nav-search-form");
const searchBar = document.getElementById("search-bar");
const liveSearchDropdown = document.getElementById("live-search-dropdown");

const apiKey = process.env.API_KEY;

export const fetchMovieSearch = async (title, type) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`
  );
  const data = await response.json();
  const results = data.results;
  console.log(results);

  if (type === "input") {
    return results;
  } else {
    fetchMovieDetails(results[0].id);
  }
};

// searchForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const formData = new FormData(searchForm);
//   let userInput = formData.get("search-input");
//   if (!userInput) {
//     return;
//   }
//   searchBar.value = "";
//   let findMovie = await fetchSearchMovie(userInput);
//   renderPage(findMovie);
//   currentMovieDetails = await fetchMovieDetails(findMovie);
// });

export const handleSearch = searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  liveSearchDropdown.replaceChildren();

  const formData = new FormData(searchForm);
  let userInput = formData.get("search-input");
  if (!userInput) {
    return;
  }
  searchBar.value = "";
  fetchMovieSearch(userInput);
});

searchBar.addEventListener("input", async () => {
  const userInput = searchBar.value.trim();

  if (userInput.length === 0) {
    liveSearchDropdown.replaceChildren();
    return;
  }

  liveSearchDropdown.replaceChildren();

  // console.log(await fetchMovieSearch(userInput, apiKey));

  const suggestions = await fetchMovieSearch(userInput, "input");

  if (!suggestions || suggestions.length === 0) {
    return;
  }

  suggestions.slice(0, 8).forEach(async (movie) => {
    let movieId = movie.id;
    const creditsData = await fetchMovieCredits(movieId);
    const { cast } = creditsData;
    console.log(cast);
    // Poster, Title, Release Year, 2 actors
    const suggestedMovie = document.createElement("div");
    suggestedMovie.classList.add("suggested-container");

    const suggestedPosterContainer = document.createElement("div");
    suggestedPosterContainer.classList.add("suggested-poster-container");

    const suggestedPoster = document.createElement("img");
    suggestedPoster.classList.add("suggested-poster");
    console.log(movie.poster_path);
    suggestedPoster.src = movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : imageNotFound;

    const suggestedDetails = document.createElement("div");
    suggestedDetails.classList.add("suggested-details-container");

    const suggestedTitle = document.createElement("p");
    suggestedTitle.classList.add("suggested-title");
    suggestedTitle.textContent = movie.title;

    const suggestedReleaseYear = document.createElement("p");
    suggestedReleaseYear.classList.add("suggested-info");
    suggestedReleaseYear.classList.add("suggested-year");
    suggestedReleaseYear.textContent = movie.release_date.slice(0, 4);

    const actorsContainer = document.createElement("div");
    actorsContainer.classList.add("actors-container");

    const firstTwoActors = cast
      .slice(0, 2)
      .map((actor) => actor.name)
      .join(", ");

    const suggestedActors = document.createElement("p");
    suggestedActors.classList.add("suggested-info");
    suggestedActors.textContent = firstTwoActors;

    suggestedMovie.append(suggestedPosterContainer, suggestedDetails);
    suggestedPosterContainer.append(suggestedPoster);
    suggestedDetails.append(
      suggestedTitle,
      suggestedReleaseYear,
      actorsContainer
    );
    actorsContainer.append(suggestedActors);

    liveSearchDropdown.append(suggestedMovie);
  });
});

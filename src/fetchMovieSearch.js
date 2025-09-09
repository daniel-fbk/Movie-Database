import { fetchMovieDetails } from "./fetchMovieDetails.js";

const apiKey = process.env.API_KEY;

export const fetchMovieSearch = async (title, type) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`
  );
  const data = await response.json();
  const results = data.results;

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

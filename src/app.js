/* Todo

Create a data dashboard with data on movies, like IMDb
Things to get from API:
Title, description, poster, genres, runtime, votes, languages, actors, release date, trailer, images, reviews

Use methods like:
map()
filter()
sort()
reduce()

Destructuring to get relevant values from objects and arrays

*/

import "./style.css";

const apiKey = API_KEY;

// Import modules
import { fetchMoviesPopular } from "./fetchMoviesPopular.js";
import { loadBookmarks } from "./handleBookmarkStorage.js";

fetchMoviesPopular(apiKey);
loadBookmarks();

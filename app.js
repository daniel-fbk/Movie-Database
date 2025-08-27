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

const movieContainer = document.querySelector(".movie-container");
const bookmarksContainer = document.getElementById("bookmarks");
const bookmarkBtn = document.getElementById("bookmark-button");

let movies = [];

const API_POPULAR_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTczZDAzZjY5Zjc5YmZhNDJkOTlhN2U1ZjZjNjIwZSIsIm5iZiI6MTc1NTc3ODc0MS4wODksInN1YiI6IjY4YTcwZWI1NTlkMTM4NmQ4MzVkZDgxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWcR1qQQ7kePN_j3xSL0KvfbXMvVYQjUBqgNugG90WU",
  },
};

async function fetchPopularMovies() {
  const response = await fetch(API_POPULAR_MOVIES_URL, options);
  try {
    const data = await response.json();
    if (response.status === 200) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      return data.results[randomIndex].id;
    } else {
      console.log("Server Error", data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

async function fetchMovieDetails() {
  const movieId = await fetchPopularMovies();
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options
  );
  try {
    const data = await response.json();
    if (response.status === 200) {
      console.log("Movie Details:", data);
      return data;
    } else {
      console.log("Server Error", data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

// I want to store the object returned from fetchMovieDetails() in a variable usable elsewhere

// const aPromise = async () => {
//   notPromise = await fetchMovieDetails();
//   console.log("test1", notPromise);
// };

// let currentMovie = fetchMovieDetails();
// console.log("test2", currentMovie);

// console.log("test3", aPromise);

const saveBookmarkToStorage = () => {
  localStorage.setItem("movies", JSON.stringify(movies));
};

bookmarkBtn.addEventListener("click", () => {
  const currentMovieTitle = currentMovie.title;

  movies.push({
    title: currentMovieTitle,
  });
  saveBookmarkToStorage();
  renderPage();
});

const buildPage = async (movie) => {
  const posterContainer = document.createElement("div");
  const poster = document.createElement("img");
  posterContainer.classList.add("poster-container");
  poster.classList.add("poster");
  poster.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  const title = document.createElement("h1");
  title.classList.add("movie-title");
  title.textContent = movie.title;

  const genresContainer = document.createElement("div");
  genresContainer.classList.add("genres-container");
  movie.genres.forEach((genre) => {
    const genres = document.createElement("p");
    genres.classList.add("genres");
    genres.textContent = genre.name;
    genresContainer.append(genres);
  });

  const description = document.createElement("p");
  const releaseDate = document.createElement("p");
  const ageRating = document.createElement("p");
  description.classList.add("description");
  releaseDate.classList.add("release-date");
  ageRating.classList.add("age-rating");
  description.textContent = movie.overview;
  releaseDate.textContent = movie.release_date;
  ageRating.textContent = 5; // Need Content Rating API

  const runTime = document.createElement("p");
  runTime.classList.add("run-time");
  runTime.textContent = `Runtime: ${movie.runtime} minutes`;

  const ratingContainer = document.createElement("div");
  const ratingStar = document.createElement("img");
  const rating = document.createElement("p");
  ratingContainer.classList.add("rating-container");
  ratingStar.classList.add("rating-star");
  rating.classList.add("rating");

  const revenue = document.createElement("p");
  revenue.classList.add("revenue");
  revenue.textContent = `$${movie.revenue}`;

  const homePage = document.createElement("a");
  homePage.classList.add("homepage");
  homePage.textContent = movie.homepage;
  homePage.href = movie.homepage;
  homePage.target = "_blank";

  // const bookmarkBtn = document.createElement("button");
  // bookmarkBtn.classList.add("bookmark-button");
  // bookmarkBtn.textContent = "Bookmark";

  movieContainer.append(
    posterContainer,
    title,
    genresContainer,
    description,
    releaseDate,
    ageRating,
    runTime,
    ratingContainer,
    revenue,
    homePage,
    bookmarkBtn
  );
  posterContainer.append(poster);
  ratingContainer.append(ratingStar, rating);
};

async function renderPage() {
  const movieDetails = await fetchMovieDetails();
  await buildPage(movieDetails);
}

renderPage();

// const crewContainer = document.createElement("div");
// const crewList = document.createElement("ul");
// const director = document.createElement("li");
// const writers = document.createElement("li");
// const stars = document.createElement("li");
// crewContainer.classList.add("crew-container");
// crewList.classList.add("crew-list");
// director.classList.add("director");
// writers.classList.add("writers");
// stars.classList.add("stars");

// const videosContainer = document.createElement("section");
// const videosHeading = document.createElement("h3");
// const video = document.createElement("div");
// const videoPlayBtn = document.createElement("img");
// videosContainer.classList.add("videos-container");
// videosHeading.classList.add("videos-heading");
// video.classList.add("video");
// videoPlayBtn.classList.add("video-play-button");

// const photosContainer = document.createElement("section");
// const photosTitle = document.createElement("h3");
// const photo = document.createElement("div");
// photosContainer.classList.add("photos-container");
// photosTitle.classList.add("photos-title");
// photo.classList.add("photo");

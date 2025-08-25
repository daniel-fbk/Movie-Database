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

const apiKey = "5173d03f69f79bfa42d99a7e5f6c620e"; // Visible in the code
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

const request = new Request(url);

async function getData() {
  try {
    const response = await fetch(request);
    const data = await response.json();
    if (response.status === 200) {
      console.log("Success", data);
      return data;
    } else {
      console.log("Server Error", data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

getData();

const movieContainer = document.querySelector(".movie-container");

const buildPage = (movies) => {
  movies.forEach((movie) => {
    const posterContainer = document.createElement("div");
    const poster = document.createElement("img");
    posterContainer.classList.add("poster-container");
    poster.classList.add("poster");

    const title = document.createElement("h1");
    title.classList.add("movie-title");

    const genresContainer = document.createElement("div");
    const genres = document.createElement("p");
    genresContainer.classList.add("genres-container");
    genres.classList.add("genres");

    const description = document.createElement("p");
    const releaseDate = document.createElement("p");
    const ageRating = document.createElement("p");
    description.classList.add("description");
    releaseDate.classList.add("release-date");
    ageRating.classList.add("age-rating");

    const runTime = document.createElement("p");
    runTime.classList.add("run-time");

    const ratingContainer = document.createElement("div");
    const ratingStar = document.createElement("img");
    const rating = document.createElement("p");
    ratingContainer.classList.add("rating-container");
    ratingStar.classList.add("rating-star");
    rating.classList.add("rating");

    const crewContainer = document.createElement("div");
    const crewList = document.createElement("ul");
    const director = document.createElement("li");
    const writers = document.createElement("li");
    const stars = document.createElement("li");
    crewContainer.classList.add("crew-container");
    crewList.classList.add("crew-list");
    director.classList.add("director");
    writers.classList.add("writers");
    stars.classList.add("stars");

    const videosContainer = document.createElement("section");
    const videosHeading = document.createElement("h3");
    const video = document.createElement("div");
    const videoPlayBtn = document.createElement("img");
    videosContainer.classList.add("videos-container");
    videosHeading.classList.add("videos-heading");
    video.classList.add("video");
    videoPlayBtn.classList.add("video-play-button");

    const photosContainer = document.createElement("section");
    const photosTitle = document.createElement("h3");
    const photo = document.createElement("div");
    photosContainer.classList.add("photos-container");
    photosTitle.classList.add("photos-title");
    photo.classList.add("photo");

    movieContainer.append(posterContainer, title, genresContainer);
  });
};

const renderPage = () => {};

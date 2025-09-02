import { renderBookmarks } from "./render.js";

let movies = [];

export const loadBookmarks = () => {
  const bookmarkedMovies = localStorage.getItem("movies");
  if (bookmarkedMovies) {
    movies = JSON.parse(bookmarkedMovies);
    renderBookmarks(movies);
  }
};

export const handleBookmarkStorage = () => {
  localStorage.setItem("movies", JSON.stringify(movies));
};

export const bookmarkButton = (movie) => {
  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.classList.add("bookmark-button");
  bookmarkBtn.textContent = "Bookmark";

  bookmarkBtn.addEventListener("click", () => {
    if (!movies.includes(movie)) {
      movies.push(movie);
      handleBookmarkStorage();
      renderBookmarks(movies);
    } else {
      alert(`${movie} is already in bookmarks`);
    }
  });

  return bookmarkBtn;
};

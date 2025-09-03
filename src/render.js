import { buildPage } from "./buildPage.js";
import { sortBookmarks } from "./filter.js";
import { getFilters } from "./localStorage.js";

const bookmarksList = document.getElementById("bookmarks-list");

export const renderPage = async (movie) => {
  buildPage(movie);
};

export const renderBookmarks = (bookmarks) => {
  bookmarksList.replaceChildren();
  const filters = getFilters();
  const sorted = sortBookmarks(bookmarks, filters.sortType);
  sorted.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    bookmarksList.append(li);
  });
};

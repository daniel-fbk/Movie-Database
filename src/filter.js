import { getFilters, saveFilters, getBookmarks } from "./localStorage.js";
import { renderBookmarks } from "./render.js";

const setSortBy = document.getElementById("sort-by");

const filters = getFilters();
setSortBy.value = filters.sortType;

setSortBy.addEventListener("change", (e) => {
  filters.sortType = e.target.value;
  saveFilters(filters);
  const bookmarks = getBookmarks();
  renderBookmarks(bookmarks);
});

export const sortBookmarks = (bookmarks, sortType) => {
  return bookmarks.slice().sort((a, b) => {
    if (sortType === "most-popular") return b.popularity - a.popularity;
    if (sortType === "least-popular") return a.popularity - b.popularity;
    if (sortType === "alpha-asc") return a.title.localeCompare(b.title);
    if (sortType === "alpha-desc") return b.title.localeCompare(a.title);
    return 0;
  });
};

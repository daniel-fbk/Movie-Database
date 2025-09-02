import { buildPage } from "./buildPage.js";

const bookmarksList = document.getElementById("bookmarks-list");

export const renderPage = async (movie) => {
  buildPage(movie);
};

export const renderBookmarks = (movies) => {
  bookmarksList.replaceChildren();
  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie;
    bookmarksList.append(li);
  });
};

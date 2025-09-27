export const fetchMovieCredits = async (id) => {
  const response = await fetch(`/.netlify/functions/movieCreditsApi?id=${id}`);
  const data = await response.json();
  return data;
};

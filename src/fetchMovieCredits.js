const apiKey = process.env.API_KEY;

export const fetchMovieCredits = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};

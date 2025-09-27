export async function handler(event) {
  const apiKey = process.env.API_KEY;
  const { title } = event.queryStringParameters;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      title
    )}&api_key=${apiKey}`
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}

export async function getAllMovies() {
  const response = await fetch("/api/movies",{
    method: 'GET'
  });
  const data = await response.json();
  console.log(data);
  return data;
}
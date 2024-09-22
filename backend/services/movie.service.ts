export const getAllMovies = async () => {
  const data = await new Promise((resolve) =>
    setTimeout(() => {
      return resolve("movies");
    }, 500),
  );
  return data;
};

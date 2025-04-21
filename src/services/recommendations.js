export const getRecommendations = async (userReadingHistory) => {
  const genres = userReadingHistory.map(book => book.genre);
  const mostReadGenre = getMostFrequent(genres);

  try {
    const response = await fetch(`https://openlibrary.org/subjects/${mostReadGenre.toLowerCase()}.json`);
    const data = await response.json();
    return data.works || [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};

function getMostFrequent(arr) {
  return arr.sort((a,b) =>
    arr.filter(v => v === a).length - arr.filter(v => v === b).length
  ).pop();
}

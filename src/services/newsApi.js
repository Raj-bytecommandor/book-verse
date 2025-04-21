const RSS_FEEDS = [
  'https://www.goodreads.com/blog/list_rss.xml',
  'https://lithub.com/feed/',
  'https://bookriot.com/feed/'
];

const FALLBACK_IMAGES = {
  default: '/book-news-default.jpg',
  categories: {
    review: '/book-review.jpg',
    news: '/book-news.jpg',
    release: '/new-release.jpg'
  }
};

const getImageFromGoogleBooks = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=1`
    );
    const data = await response.json();
    return data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  } catch (error) {
    console.error('Error fetching Google Books image:', error);
    return null;
  }
};

const parseRSS = async (url) => {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error parsing RSS:', error);
    return [];
  }
};

export const fetchBookNews = async () => {
  try {
    const allFeeds = await Promise.all(RSS_FEEDS.map(feed => parseRSS(feed)));
    const articles = await Promise.all(
      allFeeds.flat().map(async (item) => {
        const image = item.thumbnail || 
                     item.enclosure?.link || 
                     await getImageFromGoogleBooks(item.title) ||
                     FALLBACK_IMAGES.default;
                     
        return {
          title: item.title,
          description: item.description,
          url: item.link,
          urlToImage: image,
          publishedAt: item.pubDate,
          author: item.author
        };
      })
    );
    
    return articles
      .filter(article => article.urlToImage)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

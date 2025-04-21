const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyBHoEXnpBqdrT3kTGiRKBFZ89xr4n1H2jI';

export const searchBooks = async (query, filters = {}, startIndex = 0) => {
  try {
    let queryString = `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}`;
    
    // Add filters
    if (filters.author) queryString += `+inauthor:${encodeURIComponent(filters.author)}`;
    if (filters.title) queryString += `+intitle:${encodeURIComponent(filters.title)}`;
    if (filters.publisher) queryString += `+inpublisher:${encodeURIComponent(filters.publisher)}`;
    if (filters.subject) queryString += `+subject:${encodeURIComponent(filters.subject)}`;
    if (filters.isbn) queryString += `+isbn:${encodeURIComponent(filters.isbn)}`;
    
    queryString += `&startIndex=${startIndex}&maxResults=20&key=${API_KEY}`;
    
    const response = await fetch(queryString);
    const data = await response.json();
    
    if (!data.items) return [];
    
    return data.items.map(book => ({
      id: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      authors: book.volumeInfo.authors || ['Unknown Author'],
      description: book.volumeInfo.description,
      publishedDate: book.volumeInfo.publishedDate,
      publisher: book.volumeInfo.publisher,
      pageCount: book.volumeInfo.pageCount,
      categories: book.volumeInfo.categories,
      imageLinks: {
        thumbnail: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:'),
        large: book.volumeInfo.imageLinks?.large?.replace('http:', 'https:'),
        smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail?.replace('http:', 'https:')
      },
      previewLink: book.volumeInfo.previewLink,
      infoLink: book.volumeInfo.infoLink,
      canonicalVolumeLink: book.volumeInfo.canonicalVolumeLink,
      averageRating: book.volumeInfo.averageRating,
      ratingsCount: book.volumeInfo.ratingsCount,
      language: book.volumeInfo.language,
      saleInfo: book.saleInfo,
      accessInfo: {
        epub: book.accessInfo?.epub,
        pdf: book.accessInfo?.pdf,
        webReaderLink: book.accessInfo?.webReaderLink
      },
      isbn: book.volumeInfo.industryIdentifiers?.find(id => 
        id.type === 'ISBN_13' || id.type === 'ISBN_10'
      )?.identifier,
      maturityRating: book.volumeInfo.maturityRating,
      printType: book.volumeInfo.printType,
      dimensions: {
        height: book.volumeInfo.dimensions?.height,
        width: book.volumeInfo.dimensions?.width,
        thickness: book.volumeInfo.dimensions?.thickness
      }
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const getBookDetails = async (bookId) => {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API}/${bookId}?key=${API_KEY}`);
    const data = await response.json();
    return {
      ...data.volumeInfo,
      id: data.id,
      saleInfo: data.saleInfo
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};

export const estimateReadingTime = (pageCount) => {
  const WORDS_PER_PAGE = 250;
  const WORDS_PER_MINUTE = 200;
  const minutes = (pageCount * WORDS_PER_PAGE) / WORDS_PER_MINUTE;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  return { hours, minutes: remainingMinutes };
};

export const calculateReadingDifficulty = (text) => {
  // Simple implementation of reading difficulty calculation
  const words = text.split(' ');
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  if (avgWordLength < 4) return 'Easy';
  if (avgWordLength < 6) return 'Medium';
  return 'Advanced';
};

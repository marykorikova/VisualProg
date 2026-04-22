import React, { useEffect, useState } from 'react';
import BookCard from './components/BookCard';
import type { Post, Book, BookWithImage, GoogleBooksResponse } from './types';
import './App.css';

const App: React.FC = () => {
  const [books, setBooks] = useState<BookWithImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const adaptPostToBook = (post: Post): Book => {
    const fakeIsbn = `978${String(post.id).padStart(9, '0')}`;
    const pageCount = 200 + (post.id % 401);
    const mockAuthors = [
      'Эрих Ремарк', 'Михаил Булгаков', 'Оскар Уайльд', 'Лев Толстой',
      'Фёдор Достоевский', 'Джордж Оруэлл', 'Джейн Остин', 'Эрнест Хемингуэй',
      'Рэй Брэдбери', 'Курт Воннегут', 'Габриэль Гарсиа Маркес', 'Франц Кафка'
    ];
    const author = mockAuthors[post.id % mockAuthors.length];
    
    return {
      id: post.id,
      title: post.title,
      isbn: fakeIsbn,
      pageCount: pageCount,
      authors: [author],
    };
  };

  const fetchBookImage = async (isbn: string): Promise<Blob | null> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data: GoogleBooksResponse = await response.json();
      const thumbnailUrl = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
      
      if (!thumbnailUrl) {
        return null;
      }
      
      const imageResponse = await fetch(thumbnailUrl);
      if (!imageResponse.ok) {
        return null;
      }
      
      const blob = await imageResponse.blob();
      return blob;
      
    } catch (error) {
      console.error(`Ошибка загрузки обложки для ISBN ${isbn}:`, error);
      return null;
    }
  };

  // useEffect(() => {
  //   const loadBooks = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
        
  //       // const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  //               const postsResponse = await fetch('https://openlibrary.org/search.json?q=russia&language=rus&limit=50');
   
        
  //       if (!postsResponse.ok) {
  //         throw new Error(`Ошибка загрузки постов: ${postsResponse.status}`);
  //       }
        
  //       const postsData: Post[] = await postsResponse.json();
      
  //       const booksData = postsData.slice(0, 20).map(adaptPostToBook);
 
  //       const booksWithImages = await Promise.all(
  //         booksData.map(async (book) => {
  //           const imageBlob = await fetchBookImage(book.isbn);
  //           return { ...book, imageBlob };
  //         })
  //       );
        
  //       setBooks(booksWithImages);
        
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'Произошла ошибка');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   loadBooks();
  // }, []);
  useEffect(() => {
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);

    
      const searchQuery = 'русская+литература';
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchQuery}&lang=rus&limit=20`
      );

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data = await response.json();
      
  
      const booksWithImages = await Promise.all(
        data.docs.slice(0, 20).map(async (book: any, index: number) => {
          // Формируем URL обложки (если есть cover_id)
          const coverId = book.cover_i;
          let imageBlob = null;
          
          if (coverId) {
            const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
            try {
              const imageResponse = await fetch(coverUrl);
              if (imageResponse.ok) {
                imageBlob = await imageResponse.blob();
              }
            } catch (err) {
              console.log('Не удалось загрузить обложку');
            }
          }
          
          return {
            id: book.key || index,
            title: book.title || 'Без названия',
            authors: book.author_name || ['Автор не указан'],
            isbn: book.isbn?.[0] || 'Нет ISBN',
            imageBlob: imageBlob
          };
        })
      );
      
      setBooks(booksWithImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };
  
  loadBooks();
}, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Загрузка книг...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Ошибка: {error}</p>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Библиотека книг</h1>
      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            authors={book.authors}
            imageBlob={book.imageBlob}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
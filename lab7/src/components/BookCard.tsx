import React from 'react';
import type { BookCardProps } from '../types';
import './BookCard.css';

const BookCard: React.FC<BookCardProps> = ({ title, authors, imageBlob }) => {
  const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : null;

  React.useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="book-card">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title} 
          className="book-cover"
        />
      ) : (
        <div className="no-image">Нет обложки</div>
      )}
      
      <div className="book-title">{title}</div>
      
      <div className="book-authors">
        {authors && authors.length > 0 
          ? authors.join(', ') 
          : 'Автор неизвестен'}
      </div>
    </div>
  );
};

export default BookCard;
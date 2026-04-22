export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


export interface Book {
  id: number;
  title: string;
  isbn: string;    
  pageCount: number; 
  authors: string[];  
}

export interface BookWithImage extends Book {
  imageBlob: Blob | null;
}

export interface GoogleBooksResponse {
  items?: Array<{
    volumeInfo: {
      imageLinks?: {
        thumbnail?: string;
      };
    };
  }>;
}

export interface BookCardProps {
  title: string;
  authors: string[];
  imageBlob: Blob | null;
}
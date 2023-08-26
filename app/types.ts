export interface Page {
    path: string;
    title: string;
  }

export interface Book {
    id: number;
    age: string;
    title: string;
    text: string[];
    "characters description"?: string[];
  }

export interface SelectOption {
    value: number;
    label: number | string;
  }

export interface BookNavProps  {
    setSelectedBook: (book: Book) => void;
    bookData: Book[];
  };

export interface FlipBookProps {
    bookId: number;
    text: string[];
  }
  
export interface FlipNavProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    isFlippingRight: boolean | null;
    setIsFlippingRight: React.Dispatch<React.SetStateAction<boolean | null>>;
    numberOfPages: number;
    setIsHalfway: React.Dispatch<React.SetStateAction<boolean>>;
    isLastPage: boolean;
    selectedBook: Book | undefined;
  }
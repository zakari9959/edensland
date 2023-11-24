export interface Page {
    path: string;
    title: string;
  }
export  interface SelectedBookContextType {
  selectedBook: Book | null,
  setSelectedBook: (book: Book) => void
  }
  export  interface CurrentPageContextType {
    currentPage: number,
    setCurrentPage: (currentPage: number) => void
    }
    export interface UserIdContextType {
      userId: string | null;
      setUserId: (userId: string | null) => void
    }
export interface Book {
    imageUrl: string;
    userId?: number;
    cover: string;
    _id: number;
    age: string;
    title: string;
    text: string[];
    "characters description"?: string[];
  }
export interface DeleteBookProps {
    bookId: number;
  }
export interface SelectOption {
    value: number;
    label: number | string;
  }

export interface BookNavProps  {
    bookData: Book[];
  };

export interface FlipBookProps {
   
  }
  
export interface FlipNavProps {
    isFlippingRight: boolean | null;
    setIsFlippingRight: React.Dispatch<React.SetStateAction<boolean | null>>;
    numberOfPages: number;
    setIsHalfway: React.Dispatch<React.SetStateAction<boolean>>;
    isLastPage: boolean;
    isCoverPageVisible: boolean;
    setIsCoverPageVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }
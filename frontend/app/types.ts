export interface Page {
    path: string;
    title: string;
  }
export  interface SelectedBookContextType {
  selectedBook: Book,
  setSelectedBook: (book: Book) => void
  }
  export  interface CurrentPageContextType {
    currentPage: number,
    setCurrentPage: (currentPage: number) => void
    }
    export interface UserIdContextType {
      userId: number;
      setUserId: (userId: number) => void
    }
export interface Book {
    cover: string;
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
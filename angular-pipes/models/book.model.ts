export interface Book {
  title: string;
  author: string;
  genre: string;
  published: Date;
  status: BookStatus;
  rating: number;
  summary: string;
  added?: Date;
}

export type BookStatus = 'Read' | 'Unread';

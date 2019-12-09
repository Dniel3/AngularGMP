import { Author } from './author-model';

/** Course entity interface */
export interface Course {
  id: number,
  name: string,
  date: string,
  length: number,
  description: string,
  authors?: Author[],
  isTopRated?: boolean,
}

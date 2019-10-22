/** Course entity interface */
export interface Course {
  id: string,
  title: string,
  creationDate: number,
  duration: number,
  description: string,
}

/** User entity interface. */
export interface User {
  id: string,
  name: string, 
  lastName: string,
}
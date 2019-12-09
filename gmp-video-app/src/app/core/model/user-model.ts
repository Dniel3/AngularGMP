export interface Name {
  first: string,
  last: string,
}

/** User entity interface. */
export interface User {
  id: string,
  name: Name,
  login: string,
  password: string,
}

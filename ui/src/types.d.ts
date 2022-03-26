export interface User {
  username: string;
  password: string;
  token: string;
  department: string;
  email: string;
  id: number;
}

export interface Param {
  username: string;
}

interface CustomerError extends Error {
  msg: string;
}

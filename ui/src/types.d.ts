export interface User {
  username: string;
  password: string;
  token: string;
  department: string;
  email: string;
  id: string;
}

export interface Param {
  username: string;
}

interface CustomerError extends Error {
  msg: string;
}

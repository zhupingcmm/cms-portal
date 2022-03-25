import fetch from "node-fetch";
const url = "http://localhost:8090/";

interface User {
  username?: string;
  password?: string;
  email?: string;
  department?: string;
  token?: string;
}

const addUser = async (user: User) => {
  console.log("user", JSON.stringify(user));
  try {
    const response = await fetch(`${url}user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = response.json();
    console.log("response data: ", data);
  } catch (e) {
    console.error(e);
  }
};

const start = () => {
  for (let i = 0; i < 10; i++) {
    addUser({
      username: `oo-${i}`,
      password: "1",
      email: `oo-${i}@163.com`,
      department: "cms",
      token: "",
    });
  }
};

start();

import express from "express";
import path from "path";

const app = express();
app.use(express.static('../dist'));
app.listen(3002, () => {
  console.log("server is running on http://localhost:3002");
});
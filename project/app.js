const morgan = require("morgan");
const express = require("express");

const app = express();

const port = 8080;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(port, () => {
  console.log("서버가 연결되었습니다.");
});

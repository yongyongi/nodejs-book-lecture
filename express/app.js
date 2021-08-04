const express = require("express");
const path = require("path"); //경로를 좀 더 명확히 하고 싶을때 사용.

console.log(Object.keys(require.cache));
const app = express();

//set은 전역 변수와 비슷하다 / app.get("")으로 불러서 사용할 수 있다.
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  res.send("post message");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.listen(app.get("port"), () => {
  console.log("3000포트가 연결되었습니다");
});

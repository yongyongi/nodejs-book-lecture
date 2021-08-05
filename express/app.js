const express = require("express");
const path = require("path"); //경로를 좀 더 명확히 하고 싶을때 사용.
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const multer = require("multer");
const app = express();
// console.log(Object.keys(require.cache));

//set은 전역 변수와 비슷하다 / app.get("")으로 불러서 사용할 수 있다.
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
// app.use(path.join(__dirname, express.static(__dirname, "public")));

app.use(cookieParser("yongyongi"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session());
// app.use(multer().array());

app.use((req, res, next) => {
  console.log("미들웨어");
  next();
  // next()를 해주지 않으면 현재 미들웨어까지만 실행되지만,
  // next()를 해주면 다음 미들웨어로 넘어가 실행시킨다.
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  res.send("post message");
});

app.get("/about", (req, res) => {
  console.log("about");
});

// 코드는 순서대로 실행되기 때문에 광범위한 라우터는 맨밑으로 내려준다.
app.get("*", (req, res) => {
  console.log("와일드카드");
}); //와일드 카드는 어떤 요청이 들어와도 실행되기 때문에 404에러 처리가 되지 않는다.

// 에러 미들웨어는 반드시 매개변수가 4개가 있어야한다.
app.use((err, req, res, next) => {
  console.error(err);
  res.send("에러다!!!");
});
app.listen(app.get("port"), () => {
  console.log("3000포트가 연결되었습니다");
});

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

//dotenv.config()는 process.env에 설정파일을 넣기 위해서 제일 상단에 배치한다.
dotenv.config();
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

const app = express();

//set으로 port와 넌적스 설정
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

//force:true는 모델이 변경되었을때, 테이블을 지웠다가 다시 만들어줌(데이터 날라감)
//데이터를 날리지 않고 변경하려면, alter:true로 설정!
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

passportConfig();
// 6장 참고.
app.use(morgan("dev")); //요청 로그
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
//세션을 받아서 실행 되어야하기 때문에 항상 express-session밑에 코드가 있어야한다.
app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);

// "/" 경로가 아닌 경로는 404에러로 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러처리 미들웨어에서는 next 사용하지 않아도 써줘야한다.
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

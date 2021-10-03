const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { isLoggedIn, isNotLoggedIn } = require("../passport/middlewares");

const router = express.Router();

//회원가입 라우터
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    //이미 가입이 되어있다면,
    if (exUser) {
      return res.redirect("join?error=exist"); //이 뒤로는 프론트에서 할일
    }
    //가입이 되어있지 않다면,
    //bcrypt.hash를 할 때, 숫자가 커지면 해킹 위험은 적어지지만, 오래 걸린다.
    const hash = await bcrypt.hash(password, 12); //12라고 기입된 곳의 숫자가 높을수록 복잡한 해시를 만들어낸다. 하지만, 너무 높으면 오래걸린다.
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

//local로그인 라우터
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    //세개의 인자들은 전략에서 done처리한 인자를 그대로 받는다.
    //서버 에러전달
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    //로그인 실패시
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    //로그인 성공시 serialize로 user객체를 전달
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      //여기서 세션 쿠키를 브라우저로 보내준다.
      return res.redirect("/");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

//카카오 로그인 창이 뜸
router.get("/kakao", passport.authenticate("kakao"));

//카카오 로그인을 한 후에 실행
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);
module.exports = router;

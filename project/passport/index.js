const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");
// 로그인 로직은 session처리와 여러가지의 로그인 방식으로 길어집니다.
// 길어지는 로직을 깔끔하게 만들어주기 위해서 passport를 사용한다.

module.exports = () => {
  //session에 저장
  passport.serializeUser((user, done) => {
    done(null, user.id); //서버 메모리가 한정되어 있기 때문에 id만 저장한다.
    //실무에서는 메모리에 저장하지않고, session DB를 따로 만들어 보관한다.
  });

  //로그인 후에 요청이 올때, session을 확인하여 req.user로 유저정보를 전달해줄 수 있다.
  //req.isAuthenticated()로 로그인 유무도 확인할 수 있다.
  passport.deserializeUser((id, done) => {
    console.log("deserializeUser");
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};

//passport에서는 전략이라는 것을 사용하는데 간단히 로그인 로직이라고 생각하면 된다.
//Strategy파일 각각이 로그인 로직이라고 생각하면 된다.

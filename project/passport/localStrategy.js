const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

// local로그인 전략(로그인 로직)
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", //req.body.email
        passwordField: "password", //req.body.password
      },
      //* done("서버에러", "로그인이 성공한 경우", "메시지")
      //done의 첫번째 인자는 기본값으로 null을 넣고, 두번째 인자는 로그인 실패시 false 성공시 보내줄 데이터를 넣는다, 세번째 인자는 결과에 따라 보내줄 메시지를 넣어준다.
      async (email, password, done) => {
        console.log(email, password);
        try {
          const exUser = await User.findOne({ where: { email } });
          //가입된 회원이라면,
          if (exUser) {
            //password와 복호화된 password가 일치하는지 확인한다.
            const result = await bcrypt.compare(password, exUser.password);
            //password가 일치하면, 유저정보를 done
            if (result) {
              done(null, exUser);
              //password가 일치하지 않으면, 에러메시지
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
            //가입된 회원이 아니라면, 에러메시지
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

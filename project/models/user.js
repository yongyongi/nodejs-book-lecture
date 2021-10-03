const Sequelize = require("sequelize");

module.exports = class User extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          //null이 올수 있다.
          allowNull: true,
          //중복되지 않은 데이터만 들어올 수 있다.
          //여기서 null은 서로 중복되는 값으로 보지 않는다.
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          //password 해쉬화를 위해 넉넉히 100으로 제한해놓음
          type: Sequelize.STRING(100),
          //ouath로그인시, 비밀번호가 없을 수 있으므로, allowNull:true
          allowNull: true,
        },
        provider: {
          type: Sequelize.STRING(10),
          allowNull: false,
          //oauth로그인이 아닐경우, 제공자는 local로 설정
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        //underscored true는 created_at, updated_at으로 표기
        // false는 createdAt, updatedAt
        underscored: false,
        //modelName 자바스크립트에서 사용하는 모델, tableName은 실제 데이터베이스 테이블명
        //보통 modelName은 첫번째만 대문자로 단수로 적고, tableName은 복수형으로 작성한다.
        modelName: "User",
        tableName: "users",
        //paranoid를 설정하면, deletedAt이 생성된다.
        //destroy할 경우, 데이터가 삭제되지 않고, deletedAt에 삭제 날짜만 기록된다.
        //이는 회원탈퇴유저가 복구를 희망할 때도 있기 때문에 실제로는 데이터를 보관하고 있는 것이다.
        paranoid: true,
        //charset, collate는 한글을 지원하기 위해 설정
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      //다대다 관계, User테이블과 User테이블 관계이므로 foreignKey를 서로 다른 것으로 지정해주어야한다.
      //여기서 through은 조인테이블 명이다.
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
};

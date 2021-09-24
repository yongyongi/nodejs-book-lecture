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
        underscored: false,
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

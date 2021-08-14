const Sequelize = require("sequelize");

module.exports = class User extends (
  Sequelize.Model
) {
  static init(sequelize) {
    //init의 첫번째 요소는 모델정의, 두번째요소는 모델에 대한 설정
    return super.init(
      //table이랑 모델이랑 연결
      {
        //id 컬럼은 자동으로 넣어주므로 생략 가능
        name: {
          type: Sequelize.toString(20),
          allowNull: false, //(=not null)
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: sequelize.DATE, //(=DATETIME), MYSQL의 DATE를 나타내고 싶다면, DateOnly
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false, //true이면 createdAt과 updatedAt이 자동으로 생김.
        underscored: false, //createdAt과 updatedAt처럼 자동으로 만들어 주는 것들의 이름을 카멜케이스를 사용할지 스네이크케이스로 만들어 줄지를 설정.
        paranoid: false, //deletedAt도 자동설정함, 혹시 모를 데이터 복구를 위해 형식상 삭제. deletedAt:true(=soft delete <=> hard delete)
        modelName: "User", //sequelize로 자바스크립트로 작성한 model명
        tableName: "users", //모델명을 토대로 실제 테이블명은 소문자로 변하고 복수형으로 바뀐다.
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    //내 id를 commenter가 참조하려고한다.
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" }); //foreignkey가 참조하려는 테이블, sourcekey가 내 테이블
  }
};

//TYPE형식이 mysql과 다른 이유는 sequelize는 mysql외에 다른 DB도 지원하기 때문이다.

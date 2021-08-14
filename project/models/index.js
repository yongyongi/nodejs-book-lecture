//mysql2 드라이버를 사용해서 sequelize로 mysql과 node를 연결해준다.

const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize); //table이랑 모델이랑 연결
Comment.init(sequelize); //table이랑 모델이랑 연결

User.associations(db);
Comment.associations(db);

module.exports = db;

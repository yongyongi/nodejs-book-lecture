# sequelize

SQL작업을 쉽게 할 수 있도록 도와주는 ORM이다.

ORM은 Object Relational Mapping의 약자로 자바스크립트 문법으로 데이터베이스 조작 가능하게 만든다.

초기 규모의 프로젝트로만 사용할 수 있다. 프로젝트가 커지면 SQL을 사용해야한다.

mysql2은 드라이버이다. node와 mysql을 연결해주는 드라이버이다.

models폴더의 index.js파일에서 init으로 sequelize와 연결할 수 있고, associate로 관계 설정할 수 있다.

associate로 관계를 형성하면 관계되어있는 컬럼은 자동생성한다.

1:N괸계
=> 1인 테이블에는 hasMany(), N테이블에는 belongsTo()

1:1관계
=> hasOne과 belongsTo를 사용한다. hasOne과 belongsTo를 적용하는 기준은 belongsTo를 쓰는 테이블에 foreignkey가 생기기 때문에 그 부분을 생각하여서 결정.

하나의 테이블에 많은 컬럼이 있다면, 로딩이 느려지기 때문에 빈번도나 중요도, 보안 중요도에 따라 테이블을 나누기도 한다.

이럴때는 하나의 테이블에 있어도 되는 데이터를 쪼개어 놓은것이기 때문에 1:1관계를 형성한다.

ex) 사용자 테이블과 사용자 정보 테이블을 나눈다.

N:M관계
=> 두 테이블 모두 belongsToMany를 사용하고, through에 조인테이블을 넣어준다.

데이터베이스 정규화 원칙에 하나의 데이터만 들어가야하기 때문에 N:M관계를 형성하려면, 중간에 조인테이블을 하나 더 생성해야한다.

게시글과 해시태그 테이블

INSERT INTO nodejs.users (name, age, married, comment) VALUES ("yong", 29, 0, "자기소개");
=> create로 생성

SELECT \* FROM nodejs.users;
=> findAll로 조회

SELECT name, married FROM nodejs.users;
=> findAll({
attributes:["name", "married"],
})

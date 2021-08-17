## mongoDB

nosql중 점유율이 가장 높은 데이터베이스

mongoDB 자체적으로는 컬렉션간의 JOIN이 지원 되지않는다. (관계가 없다.)

자유도가 높기 떄문에 sql보다는 비교적 불안정하다. 대신에 확장성에 있어서 nosql이 조금 더 좋다.

sql과 nosql의 용어적 차이도 있다. 테이블을 컬렌션으로, 로우를 다큐먼트로, 컬럼을 필드로 명칭한다.

JOIN과 비슷한 aggregate기능이 있기는 하지만, mongoose에서 populate가 JOIN과 유사하게 사용할 수 있는 역할을 해준다.

빅데이터나, 메시징, 로 그를 쌓는 메시지, 세션 관리등 비정형 데이터를 관리할때 사용하면 좋다.

## 어드민 설정하기

mongoDB 프롬프트에서 use admin명령어를 실행해주면 기본으로 생성되어있는 admin db로 들어가진다.

db.createUser({user:'root', pwd: 'nodejsbook', roles:['root']}) 를 해주면 관리자가 생성된다.

mongod --auth를 실행해주면 비밀번호가 있어야지만 mongoDB에 접속할 수 있도록 해준다.

이제 mongoDB에 접속할때, admin -u root -p nodejsbook 과 같이 패스워드를 입력해야지만 접속할 수 있게 된다. 이렇게 설정하면 보안이 훨씬 안전해진다.

## DB생성 및 컬렉션 생성

use [db명]으로 DB생성, 컬렉션을 db.createCollection("user")로 만들 수도 있지만, 다큐먼트를 넣는 순간 컬렉션이 자동으로 생성되기 때문에 직접 생성하지 않아도 된다.

## CRUD

- Create

db.users.save({name:"yong", married:false})

자동으로 고유값인 ObjectId가 생성된다. ObjectId에는 보이지않는 날짜가 있기 때문에 날짜순으로 정렬할 수 있다.

생성시 createdAt을 date로 지정하였을떄, 정확한 시간을 넣어주고, +뒷부분을 09로 넣어야 한국시간이 된다.

- Read

db.users.find({}) : 모두 조회
db.users.findOne(조건) : 하나만 조회

db.users.find({name:"yong"},{\_id:1})

여기서 첫번째 객체는 조건이고, 두번째 객체는 보여주고 싶은 필드를 의미한다. 값이 1이면 보여주고, 0이면 보여주지 않는다. mysql의 attributes와 동일하다.

$gt, $or로 조건 연산자 사용가능

비교연산자 참고 : https://www.zerocho.com/category/MongoDB/post/57a17d114105f0a03bc55f74

db.users.find({}, {\_id:0}).sort({age:-1}) : 정렬해서 조회

1이 오름차순 -1이 내림차순이다.

limit은 sequelize와 같다. sequelize에서의 offset은 mongoDB에서 skip으로 사용된다.

- Update

db.users.update({name:"yong"},{$set:{comment:"하이요"}})

첫번째 객체에는 조건을 작성하고, 두번째 객체에는 바꿀 내용을 작성한다. $set연산자를 안붙이면 대참사.... 모든 필드값들이 바뀐다.

- Delete

db.users.remove({name:"yong"})

### mysql과 같이 관계를 지어주려면 user의 ObjectId를 복사해서 comment의 commenter필드와 같이 한 필드에 붙여넣으면 연결이 된다. 하지만 foreign key처럼 완전히 관계를 시켜주는게 아니므로 mongoDB는 항상 오타를 주의해야한다.

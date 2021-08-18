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

## mongoose

mysql의 sequelize과 비슷, mongoose는 ODM(Object Document mapping)으로 ORM과 비슷한 의미이다. sequelize는 mysql의 쿼리를 자바스크립트를 다룰 수 있게 하기 위해 사용하지만 mongoDB는 자바스크립트 언어로 데이터를 다룰 수 있는데 왜 ODM을 사용 하는 걸까? 이유는 mongoose에는 mongoDB에서 지원하지 않는 기능들이 많기 때문이다. 특히 mongoose를 사용하면 mysql의 스키마를 표현할 수 있다. 즉, JOIN을 할 수 있다. 아이러니하게도 mongoose에서 지원하는 기능들을 사용하다보면 sql을 사용하는 것과 차이가 없게 된다. 그래서 나는 sql, nosql에서 각각 ORM, ODM 프레임워크를 사용한다면, 차별점을 확장성에 둔다. 수직확장으로 하면 유리한지, 수평확장으로 하면 유리한지.

## mongoose로 mongoDB 연결

```
// 개발 모드일때, 쿼리가 로그로 뜨게 하는 코드
const connect = () => {
    if(process.env.NODE_ENV !== "production"){
        mongoose.set("debug",true)
    }
}
mongoose.connect("mongodb://사용자:비밀번호@loaclhost:27017/admin",{
    dbName: "nodejs",
    useNewUrlParser:true, // 버전이 바뀌면서 설정해야하는 부분
    useCreateIndex: true, // 번전이 바뀌면서 설정해야하는 부분
}, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("연결 성공")
    }
})
```

## mongoose의 스키마

두 테이블의 관계를 만들어줄떄, N인쪽에 ref로 참조할 테이블명을 저장한다. ref로 관계를 지어놓으면 populate를 사용하여 테이블 JOIN이 가능하다. ref로 관계를 맺어주지 않고, 참조할 테이블의 객체를 그대로 작성하는 경우(Nested Object)도 있지만, 데이터의 중복이 생기고, 변경될 경우 하나씩 직접 바꿔줘야하기 때문에 ObjectId의 populate를 사용하면 이 문제를 해결한다. 하지만, populate는 자바스크립트로 돌아가기 때문에 속도가 느린 단점이 있다. 방법마다 각각 장단점이 있기 때문에 서비스의 특성에 따라 선택하여 사용하면 된다.

데이터의 수정이 많을것 같다면, ObjectId의 populate를 사용하는게 좋을 것 같고, 데이터의 수정이 거의 없을 것 같다면, Nested Object를 사용하는게 좋을 것 같다.

mongoose를 사용하여 스키마를 만들면, sequelize와 같이 데이터 타입과 옵션을 지정할 수 있다.

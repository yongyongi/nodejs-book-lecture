# My-sql(sql)

- 정형화된 데이터
- 관계형성이 되어있는 데이터

### 시작하기

mysql -h localhost -u root -p
h 호스트, u 사용자, p 패스워드

### 데이터베이스 쿼리

- 생성

CREATE DATABASE DB명;
=> 위의 쿼리만 작성해주어도 되지만, 한글을 많이 사용할 경우 가급적이면 default character set utf8;을 추가로 작성해주자.

- 확인

SHOW DATABASES;
=> 모든 데이터베이스 조회

- 선택

USE DB명;
=> 해당 데이터베이스 선택

- 삭제

DROP DATABASE DB명;
=> 해당 데이터베이스 삭제

### 테이블 생성 및 조회

CREATE TABLE 데이터베이스명.테이블 이름 (
필드이름1 필드타입1,
필드이름2 필드타입2,
...
)

- 타입 옵션

INT: 정수 자료형(FLOAT, DOUBLE은 실수)
VARCHAR: 문자열 자료형, 가변 길이(CHAR은 고정 길이)
TEXT: 긴 문자열은 TEXT로 별도 저장
DATETIME: 날짜 자료형 저장
TINYINT: -128에서 127까지 저장하지만 여기서는 1 또는 0만 저장해 불 값 표현

NOT NULL: 빈 값은 받지 않는다는 뜻(NULL은 빈 값 허용)
AUTO_INCREMENT: 숫자 자료형인 경우 다음 로우가 저장될 때 자동으로 1증가
UNSIGNED: 0과 양수만 허용
ZEROFILL: 숫자의 자리 수가 고정된 경우 빈 자리에 0을 넣음
DEFAULT noew(): 날짜 컬럼의 기본값을 현재 시간으로

PRIMARY KEY(id): 고유한 값, 보통 ID
INDEX commenter_idx (commenter ASC): 자주 검색하는 것을 인덱스 지정해주면 검색 성능이 빨리진다.
FOREIGN KEY (commenter): 외래키, 다른 테이블의 컬럼을 참조할때 사용.
REFERENCES 데이터베이스명.테이블명 (id): 관계 맺기
ON DELETE: CASCADE 옵션은 연결된 모든 관계의 데이터를 의미한다. SET NULL은 해당 컬럼의 데이터는 남겨두고, 연결된 테이블의 컬럼은 NULL로 바꾼다. NO ACTION은 아무런 변화가 없는 것을 의미.
ON UPDATE: 수정되었을때, 연결되어있는 데이터도 수정할건지 여부, 옵션은 위와 동일
DEFAULT CHARSET=utf8mb4: 기본설정, 이모티콘도 사용하고 싶다면 mb4를 붙이자.

???
ENGINE=InnoDB; => 알아보기

정규화 공부를 통해 관계에 대한 원칙을 알아보자.

show tables;
=> 현재 데이타베이스의 테이블 조회

---

### CRUD(Create Read Update Delete)

- CREATE

INSERT INTO 데이터베이스명.테이블명 (컬럼명,컬럼명, ...) VALUES (값,값, ...);
=> 테이블에 데이터 삽입

- READ

SELECT _ FROM 데이터베이스명.테이블명;
=> "_"은 모든 컬럼을 조회, 만약 특정 컬럼만 조회하고 싶을때는 "_" 대신에 컬럼명을 입력해준다.
SELECT _ FROM 데이터베이스명.테이블명 WHERE 조건 AND 조건;
=> 두가지 조건 모두 성립하는 데이터 조회
SELECT _ FROM 데이터베이스명.테이블명 WHERE 조건 OR 조건;
=> 둘중 하나의 조건이라도 성립하는 데이터 조회
SELECT _ FROM 데이터베이스명.테이블명 ORDER BY age DESC;
=> 나이를 기준으로 내림차순으로 데이터 조회
SELECT _ FROM 데이터베이스명.테이블명 ORDER BY age ASC;
=> 나이를 기준으로 오름차순으로 데이터 조회
SELECT _ FROM 데이터베이스명.테이블명 ORDER BY age ASC LIMIT 1;
=> 데이터 정렬후, LIMIT 수만큼 데이터 조회
SELECT \* FROM 데이터베이스명.테이블명 ORDER BY age ASC LIMIT 1 OFFSET 1;
=> OFFSET 수만큼 건너뛰고 다음 데이터를 조회

- UPDATE

UPDATE 데이터베이스명.테이블명 SET 컬럼명 = "바꿀내용" WHERE 조건;
=> WHERE조건에 맞는 데이터를 SET뒤에 있는 내용으로 바꾼다. WHERE가 없으면 모든 데이터가 바뀌니 업데이트시 WHERE는 필수!

- DELETE

DELETE FROM 데이터베이스명.테이블명 WHERE 조건;
=> WHERE 조건에 맞는 데이터 삭제

# nosql

- 데이터 수집용으로 사용
- 비정형화 데이터
- 검색기능이 많을때 사용

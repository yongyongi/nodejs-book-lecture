# NPM(Node Package Manager)

## npm이란?

다른 사람들이 만들어 놓은 소스코드를 모아둔 저장소이다. "바퀴를 재발명 하지말라"는 말이 있듯이, 이미 만들어져있는 걸 다시 만들지말고 가져와서 사용하게끔 만들어 놓은것이다. npm에는 100만개가 넘는 패키지가 있고, 모든 언어 통틀어서도 가장 많은 패키지를 가지고 있다.

node프로젝트는 대부분 npm을 사용하기 때문에 npm init을 통해 package.json파일을 만들고 시작한다. 다운받은 모듈은 이 package.json안에 저장이 된다. init시에 작성해야하는 목록이 있다. 그 중 name은 npm배포시 검색되는 이름이다. script는 터미널에 명령하는 별명이라고 보면된다. npm run 뒤에 별명을 붙여서 특정 명령을 실행시킬 수 있다.(run 생략가능) licence에는 오픈소스가 되길 원한다면 MIT나 ISC로 지정해놓으면 된다. 보통은 오픈소스로 공개하기 때문에 이렇게만 알고 있어도 될것같다.

모듈 설치는 npm install을 통해서 할 수 있다. 줄여서 npm i로 명령해도 된다. 여기서 npm i으로 설치한 모듈은 package.json의 dependencies에 저장된다. 실제 배포할때까지 쓰이는 모듈들을 저장하는 곳이다. npm i -D로 설치한 모듈은 package.json의 devDependencies에 저장된다. 개발을 할때만 쓰이는 모듈을 저장하는 곳이다. 내 코드를 다른 사람이 install할때, 개발에만 쓰이는 devDependencies 모듈은 설치되지 않고, dependencies 모듈만 설치되기 때문에 메모리 낭비를 줄일 수 있다.

또, npm i -g로 글로벌에 설치할 수 있다. 글로벌에 설치가 되면, 명령어에서 사용가능해진다. 하지만, package.json어디에도 저장이 되지 않기 때문에 다른 사람이 내 코드를 사용할때, 글로벌로 설치된 모듈을 알지 못하게 된다. 그러므로 자주 사용하지 않지만, 사용해야한다면 npx로 실행하여 글로벌과 똑같은 효과를 볼 수 있다

## npm i을 하면 node_modules폴더와 package-lock.json파일이 생성된다.

node_modules는 install한 모듈이 모아져있는 폴더이다. 그렇지만, 설치하지 않은 모듈까지 있는 이유는 무엇일까? 현재 install한 모듈도 하나의 프로젝트이기 때문에 dependencies에 있는 모듈도 같이 설치가 되기 때문이다. express로 예를 든다면, 나는 express모듈 하나만 install했지만, express모듈을 만들기 위해서 사용한 모듈도 굉장히 많기 때문에 express를 install하면 그 안의 모듈들도 모두 install된다. 이와 같이 node_modules의 용량은 크기 때문에 배포를 하기전에는 삭제를 해주고, 배포서버에 package.json을 통해 install 해주는게 좋다.

pacakage-lock.json을 살펴보면 굉장히 코드가 길다. 이 코드들은 위와같이 express를 설치하면서 같이 설치된 모듈들의 version이 모두 표기되어있는 파일이다. 즉, ependency의 dependency 버전이 기입되어있다.

## npm은 Sem ver 버저닝을 사용한다.

npm에서 설치한 모듈은 3부분으로 버전이 나누어져 있다. 앞에서부터 순서대로 major(주버전), minor(부버전), patch(수버전) 이라고 한다.

-major: 대대적인 수정으로 기존코드가 실행되지 않을 수 있다. 하위버전과 호환되지 않는 수정 사항이 생겼을 경우에 올린다.
-minor: 수정은 생겼지만 하위버전과 호환이 되어서 실행에 문제없다.
-patch: 마이너한 버그 수정

### package.json에서 버전 고정시키는 법

버전맨앞에 사용해주면 된다. ex) "^1.21.0"

- ^ : major버전을 고정시켜준다. 대부분 이 방법을 사용한다. 두번째부터는 바뀌어도 기존프로그램에 영향을 끼치지 않기 때문이다.
- ~ : major, minor버전을 고정시켜준다.
- : major, minor, patch버전을 고정시켜준다.

### Tip - 설치시에 버전

npm i express@latest - 가장 최신버전으로 설치.
npm i express@3.23.1 - 정확히 버전으로 설치.
npm i express@3 - major만 적어도 된다.
npm i express@next - 앞으로 나올 버전을 미리 사용. npm info를 통해 next버전이 있는지 확인 가능.

## npm 명령어들

npm info - 해당 모듈의 정보. next버전이 있는지도 확인가능.
npm uninstall - 설치 제거.
npm search - npm웹사이트에서 모듈 검색하는 것과 같음.
npm adduser, npm login - 로그인 (npm에 배포하기 위해서).
npm whoami 현재 사용자가 누구인지 알려줌.
npm logout - 로그아웃.
npm version - major,minor,patch 중 입력시 해당 버전이 1씩 올라감.
npm deprecate 패키지명||버전||메시지 - 치명적인 버그가 있을때, 해당 버전 사용금지를 알리기 위해 사용.
npm publish - 패키지 배포.
npm unpublish - 배포 중단(배포 후 72시간 내에만 가능) --force붙여줘야함.
npm ls - 현재폴더의 패키지 정보.

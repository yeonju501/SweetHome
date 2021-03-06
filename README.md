# 🏡SweetHome

SweetHome은 **아파트 입주민들을 위한 웹 커뮤니티 서비스**입니다.

팬데믹의 영향으로 이웃들과 소통하기 더욱 어려워진 요즘, 

SweetHome에서는 아파트 인증을 거친 주민들과 안전하게 소통할 수 있습니다.

아파트 내 공지사항과 생활 정보를 편하게 공유하고, 직접 게시판을 개설할 수도 있어요.

SweetHome으로 당신의 이웃을 만나보세요.



## 📅 프로젝트 기간

- 22.01.10 ~ 22.02.18



## 💡프로젝트 사용법

#### Frontend

```
$ cd frontend
$ npm install
# 로컬 서버 실행
$ npm start
```

#### Backend

```
$ cd backend
$ ./gradlew bootRun
```



## 🛠 기술 스택

#### Frontend

* React, Redux, html/css

#### Backend

* Java, Springboot, JPA

#### Server

* Nginx, AWS, Docker

#### DB

* MySQL



## 🏗 프로젝트 아키텍쳐 

![2](https://user-images.githubusercontent.com/75344304/176684624-e8b94578-f03a-4728-8539-821e37149e24.png)



## ⚙️ERD

![image-20220219201316007](README.assets/image-20220219201316007.png)



## 📌주요 기능

### 1) 로그인/

* 회원가입/로그인 기능
* 카카오 소셜 로그인 기능
* 가입 이메일을 통한 비밀번호 찾기 기능

![image-20220217211626144](README.assets/image-20220217211626144-5268962.png)


### 2) 인증

* 아파트 입주민은 인증 신청 후 관리자의 승인을 받아 이용 가능
* 아파트 입주민 인증과 관리자 인증 분리

![image-20220217214632987](README.assets/image-20220217214632987-5268962.png)

#### 2-1) 아파트 세대원 인증 페이지

* 주소 찾기 버튼 클릭 및 주소 검색 후 동, 호수 수동으로 입력하여 인증 요청

![image-20220217214848563](README.assets/image-20220217214848563-5268962.png)

#### 2-2) 아파트 관리자 인증 페이지

* 주소 찾기 버튼 클릭 및 주소 검색 후 입력하여 관리자 인증 요청

![image-20220217215116931](README.assets/image-20220217215116931-5268962.png)


### 3) 커뮤니티

* 즐겨찾는 게시판을 등록하여 원하는 게시판을 모아볼 수 있음
* 아파트 커뮤니티 내 실시간 인기글, 최신글 기능

![image-20220217215304676](README.assets/image-20220217215304676-5268962.png)

#### 3-1) 게시판

* 새글을 작성해주세요 클릭시 아래에 textarea 표시
* 게시글 제목 클릭시 해당 게시글 상세페이지로 이동

![image-20220217215731427](README.assets/image-20220217215731427-5268962.png)

#### 3-2)  게시글 상세페이지

* 쪽지 클릭시 해당 유저에게 쪽지 보내는 팝업 창 실행
* 신고 클릭시 해당 게시글을 신고하는 팝업 창 실행
* 하트 아이콘 클릭시 좋아요 수 1 및 빨강색으로 변경
* 댓글을 남기고 작성시 아래에 댓글이 생성됨

![image-20220217215741810](README.assets/image-20220217215741810-5268962.png)

### 4) 동의서

* 아파트 주민 간의 동의서를 생성하고 동의/반대를 받을 수 있음

![image-20220217220041247](README.assets/image-20220217220041247-5268962.png)

### 5) 쪽지

* 사용자들의 개인적인 소통을 위한 쪽지 기능
* 안읽은 쪽지부터 표시되며, 쪽지 멀티 삭제 가능

![image-20220217220525022](README.assets/image-20220217220525022-5268962.png)


### 6) 프로필

* 프로필 페이지에서 프로필 사진 설정 가능
* 본인이 작성한 글을 따로 확인 가능
* 이사가기 기능을 통해 주소 변경 가능

![image-20220217220710982](README.assets/image-20220217220710982-5268962.png)


## 💻 협업 룰
### Commit Type
```
$ git commit -m [#'JIRA 번호'] 타입 : 작업 설명 
```

| git status | 의미 |
| --- | ---|
| feat | 새로운 기능 추가|
| refactor | 코드 리팩토링 |
| style | 스타일 작업 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| chore | 빌드 업무 수정, 패키지 매니저 수정 |



## 😊 팀 소개
**권연주 (Backend)**

**박예정 (Frontend)**

**우동진 (Frontend)** 

**우상준 (Frontend)**

**이승기 (Backend)**




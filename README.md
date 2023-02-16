## **💻 WKKCLOUD**

진행 기간 : 2021 / 05 / 19 ~ 2021 / 07 / 19

팀 구성 : 풀스택 1명

## **📄 서비스 소개**

WKKCLOUD는 파일을 업로드 하여 공유할 수 있는 사이트입니다. 

사용자는 폴더를 생성, 삭제 할 수 있으며 파일을 업로드, 다운로드, 삭제 할 수 있습니다.

WKKCLOUD는 친구들과 파일을 쉽고 간편하게 공유하고자 제작을 진행하게 되었습니다.

사이트 주소 : [https://wkkcloud.fly.dev/](https://wkkcloud.fly.dev/)

* Azure 스토리지 계정 만료로 인하여 로그인 기능을 제외한 모든 기능이 정상 작동하지 않습니다.
* ID : admin , PASSWORD : 1

## 👨🏻‍💻 역할

풀스택

## 🛠 기술 스택

- Front-End
    - Vue.js
    - Vuetify
- Back-End
    - go
    - gin-gonic
- Database
    - PostgreSQL
    - Azure

## ****📌 주요 기능****

- 로그인, 로그아웃
- 파일 공유
    - 폴더 생성, 삭제
    - 파일 업로드, 다운로드, 삭제

### 1. **로그인**

![1](https://user-images.githubusercontent.com/79083202/219436950-67e12b3c-2346-447f-a97b-050975b22407.gif)

### 2. 파일 공유

**폴더 생성**

![2](https://user-images.githubusercontent.com/79083202/219436954-4eae4343-340e-44e6-8897-7ae4f42dbfad.gif)

**폴더 삭제**

![3](https://user-images.githubusercontent.com/79083202/219436959-45c6be11-05e6-4f02-84d6-c557f9b2ee4d.gif)

**파일 업로드**

![4](https://user-images.githubusercontent.com/79083202/219436965-64d0f7f0-b4af-4558-a9ef-26ee977ee4a0.gif)

**파일 다운로드**

![5](https://user-images.githubusercontent.com/79083202/219436970-4fcc96c0-3614-4299-b72b-352ac9da77cd.gif)

**파일 삭제**

![6](https://user-images.githubusercontent.com/79083202/219436975-4da54667-f9e9-4510-b1b5-ff367313bb05.gif)

## **⚠️ 개발 이슈**

- 파일 업로드 및 삭제
    
    처음 파일 업로드 기능을 구현할 당시 한번에 하나씩 업로드 하는 방식으로 제작을 진행하였습니다.
    
    하지만 친구들의 피드백을 받아 보았을 때 공유할 파일을 여러개 선택하여 업로드 시킬 수 있었으면 좋겠다고 하였습니다.
    
    그리하여 하나의 파일이 아닌 여러개의 파일을 업로드, 삭제가 가능하도록 구현하였습니다.
    
    ### **개선 후**
    
    **파일 업로드**
    
    ![7](https://user-images.githubusercontent.com/79083202/219436978-8f5a476c-d54f-4d18-acdb-600446151d95.gif)
    
    **파일 다운로드**
    
    ![8](https://user-images.githubusercontent.com/79083202/219436982-04f98f6a-0d40-41af-9eba-706dacebb783.gif)
   
    **파일 삭제**
    
    ![9](https://user-images.githubusercontent.com/79083202/219436984-9ddfd771-dd77-463c-8e0f-e2bb44bcd299.gif)

## **❗️ 문제점**

- 성능
    
    이 프로젝트는 경험과 공부를 가장 큰 목적으로 두고 제작하였습니다. 그렇기 때문에 파일을 업로드 하는 과정에서 불필요한 과정이 추가 되었고 이는 성능 이슈를 만들게 되었습니다.
    
    ### **파일 전송 구조**
    
    ![10](https://user-images.githubusercontent.com/79083202/219436989-f8aa0fe7-8acd-413b-b478-27bb99c2a39d.png)

    WKKCLOUD는 밑의 두개의 화살표와 같은 방식으로 제작이 되었으며, 현재 방식이 아닌 서버를 거치지 않고 Azure 컨테이너에 바로 업로드하는 방식으로 제작을 진행할 경우 성능 이슈를 해결할 수 있을것으로 생각됩니다.

import adobeIcon from '@/assets/icons/main/track/adobe.svg';
import awsIcon from '@/assets/icons/main/track/aws.svg';
import dockerIcon from '@/assets/icons/main/track/docker.svg';
import figmaIcon from '@/assets/icons/main/track/figma.svg';
import framerIcon from '@/assets/icons/main/track/framer.svg';
import javaIcon from '@/assets/icons/main/track/java.svg';
import jsIcon from '@/assets/icons/main/track/js.svg';
import notionIcon from '@/assets/icons/main/track/notion.svg';
import protopieIcon from '@/assets/icons/main/track/protopie.svg';
import reactIcon from '@/assets/icons/main/track/react.svg';
import springbootIcon from '@/assets/icons/main/track/springboot.svg';
import tailwindcssIcon from '@/assets/icons/main/track/tailwind.svg';

export const curriculumData = {
  PO: {
    title: 'PO TRACK CURRICULUM',
    subtitle: '_기획적 사고와 디자이너의 시선으로 세상을 바라보기',
    techStack: [
      { name: 'figma', size: 39, icon: figmaIcon },
      { name: 'framer', size: 41, icon: framerIcon },
      { name: 'protopie', size: 29, icon: protopieIcon },
      { name: 'adobe', size: 37, icon: adobeIcon },
      { name: 'notion', size: 37, icon: notionIcon },
    ],
    curriculum: [
      {
        badge: '공통',
        badgeColor: '#FF7D56',
        text: 'Figma + Notion 기본 기능 알아보기',
        explainText:
          'Figma의 협업 기능과 문서 관리 방법, Frame과 Section의 차이점, 기본 기능을 배워요. Notion의 기본 기능을 워크숍 형식으로 예제를 만들며 배워요.',
      },
      {
        badge: '1주차',
        badgeColor: '#C6E400',
        text: '개발 프로세스의 이해 / Figma 기초',
        explainText:
          '서비스 개발 프로세스를 살펴보며, 각 직군의 역할과 직무에 대해 배워요. Figma의 기초 기능들을 익혀요.',
      },
      {
        badge: '2주차',
        badgeColor: '#C6E400',
        text: '리서치 기획하기 / Constraints, Auto Layout',
        explainText:
          '아이데이션과 리서치 과정을 함께 해보며 배워요. Figma의 핵심 기능인 Constraints와 Auto Layout을 익혀요.',
      },
      {
        badge: '3주차',
        badgeColor: '#C6E400',
        text: 'IA, 와이어프레임 / Design System, Library',
        explainText:
          'IA와 와이어프레임을 함께 제작해보고, 디자인 시스템과 라이브러리 기능을 배워요.',
      },
      {
        badge: '4주차',
        badgeColor: '#C6E400',
        text: '아이디어 크리틱 / 디자인 기초 이론, Variants',
        explainText:
          '개인별 프로젝트에 대한 상호 크리틱을 하고, 기초적인 디자인 원칙과 Variants 기능을 배워요.',
      },
      {
        badge: '5주차',
        badgeColor: '#C6E400',
        text: '발표자료로 정리하기, BM / Dev mode',
        explainText: '발표자료를 기획하고, BM을 점검해요. 개발하기 좋은 디자인에 대해 배워요.',
      },
      {
        badge: '6주차',
        badgeColor: '#C6E400',
        text: '발표자료 피드백 / Figma 기능 총 복습',
        explainText:
          '발표자료 피드백을 통해 개선 방향을 정리하고, Figma의 주요 기능들을 총복습해요.',
      },
      {
        badge: '7주차',
        badgeColor: '#C6E400',
        text: '개인별 프로젝트 PT 및 피드백',
        explainText:
          '개인별로 진행한 프로젝트를 PT하고 효과적인 내용 전달을 위한 피드백 시간을 가져요.',
      },
      {
        badge: '8주차',
        badgeColor: '#C6E400',
        text: '기능명세서 / 컨셉, 컬러, 브랜딩, 타이포그래피',
        explainText:
          '기능명세서 작성 방법을 배우고, 브랜딩에 충실한 디자인과 타이포그래피 기초에 대해 학습해요.',
      },
      {
        badge: '9주차',
        badgeColor: '#C6E400',
        text: 'API 활용 / Figma Effects, 이미지 활용',
        explainText:
          'API를 고려한 기획적 사고를 기르고, 디자인의 깊이감을 더해줄 수 있는 효과와 이미지 활용에 대해 배워요.',
      },
      {
        badge: '10주차',
        badgeColor: '#C6E400',
        text: '최종 프로토타이핑',
        explainText:
          '프로젝트 크리틱 시간을 가진 후, 프로토타이핑을 통해 화면 흐름 설계 방법을 익혀요.',
      },
      {
        badge: '11주차',
        badgeColor: '#C6E400',
        text: '프로젝트 최종 발표 및 크리틱',
        explainText: '프로젝트 최종 발표를 진행하고, 크리틱을 통해 완성도를 높여요.',
      },
      {
        badge: '12주차',
        badgeColor: '#C6E400',
        text: '기획 / 디자인 워크숍1',
        explainText:
          '프로젝트의 부족했던 점을 개선하고, 완성도 높은 UI를 함께 만들어보며 더 다양한 기능을 익혀요.',
      },
      {
        badge: '13주차',
        badgeColor: '#C6E400',
        text: '기획 / 디자인 워크숍2',
        explainText:
          '생성형 AI를 활용해 디자인을 돋보일 수 있게 하는 방법을 배우고, 완성도 높은 UI를 함께 만들어보며 더 다양한 기능을 익혀요.',
      },
      {
        badge: '14주차',
        badgeColor: '#C6E400',
        text: '기획 / 디자인 워크숍3',
        explainText:
          '프로토타입을 더 완성도 있게 보여줄 수 있는 Protopie의 기능을 배우고 함께 인터렉션을 제작해봐요.',
      },
    ],
  },
  FRONTEND: {
    title: 'FRONTEND TRACK CURRICULUM',
    subtitle: '_Re:액트부터 시작하는 프론트 생활',
    techStack: [
      { name: 'javascript', size: 40, icon: jsIcon },
      { name: 'react', size: 40, icon: reactIcon },
      { name: 'tailwindcss', size: 40, icon: tailwindcssIcon },
    ],
    curriculum: [
      {
        badge: '공통',
        badgeColor: '#FF7D56',
        text: 'Figma + Notion 기본 기능 알아보기',
        explainText:
          'Figma의 협업 기능과 문서 관리 방법, Frame과 Section의 차이점, 기본 기능을 배워요. Notion의 기본 기능을 워크숍 형식으로 예제를 만들며 배워요.',
      },
      {
        badge: '1주차',
        badgeColor: '#C6E400',
        text: 'JavaScript 및 React 입문',
        explainText: 'JavaScript 기본 문법을 익히고 React를 시작해보아요.',
      },
      {
        badge: '2주차',
        badgeColor: '#C6E400',
        text: 'GitHub 기초 입문',
        explainText: 'GitHub 사용법을 익히고, 브랜치 생성과 관리를 경험해요.',
      },
      {
        badge: '3주차',
        badgeColor: '#C6E400',
        text: 'JSX, hook과 스타일링 다루기',
        explainText: 'JSX와 hook을 이해하고, 이를 활용해 간단한 쇼핑몰 페이지를 제작해요.',
      },
      {
        badge: '4주차',
        badgeColor: '#C6E400',
        text: 'Figma, CSS, 폴더구조 익히기',
        explainText:
          'Figma와 CSS를 활용해 UI를 설계하고, 폴더 구조를 적용해 쇼핑몰 페이지를 제작해요.',
      },
      {
        badge: '5주차',
        badgeColor: '#C6E400',
        text: '라우팅과 API 구조 이해하기',
        explainText: '페이지 라우팅을 통해 화면을 연결하고, dummydata로 API 개념을 익혀요.',
      },
      {
        badge: '6주차',
        badgeColor: '#C6E400',
        text: 'API 연동 실습',
        explainText: '실제 API를 연동해 프론트엔드에서 데이터 흐름을 이해하고 구현해요.',
      },
      {
        badge: '7주차',
        badgeColor: '#C6E400',
        text: 'Figma로 웹사이트 제작하기',
        explainText: 'Figma로 설계된 웹사이트를 직접 구현해 완성해요.',
      },
      {
        badge: '8주차',
        badgeColor: '#C6E400',
        text: 'Vercel & Netlify로 배포하기',
        explainText:
          'Vercel과 Netlify를 활용해 프론트엔드 프로젝트를 배포하고, 배포 흐름을 이해해요.',
      },
      {
        badge: '9주차',
        badgeColor: '#C6E400',
        text: ' GitHub 협업 실습',
        explainText:
          '해커톤을 대비해 Zustand 등을 활용하고, GitHub 팀 협업과 충돌 해결 과정을 경험해요.',
      },
      {
        badge: '10주차',
        badgeColor: '#C6E400',
        text: '최적화 적용하기',
        explainText: 'UseMemo와 Callback 함수로 성능을 높여보아요.',
      },
      {
        badge: '11주차',
        badgeColor: '#C6E400',
        text: '연합 세션',
        explainText: '백엔드 개발자와 협업하며 프론트엔드 개발 경험을 확장해요.',
      },
    ],
  },
  BACKEND: {
    title: 'BACKEND TRACK CURRICULUM',
    subtitle: '_쉽게 풀어 공부하는 스프링 백엔드 개발',
    techStack: [
      { name: 'java', size: 36, icon: javaIcon },
      { name: 'springboot', size: 36, icon: springbootIcon },
      { name: 'docker', size: 33, icon: dockerIcon },
      { name: 'aws', size: 36, icon: awsIcon },
    ],
    curriculum: [
      {
        badge: '공통',
        badgeColor: '#FF7D56',
        text: 'Figma + Notion 기본 기능 알아보기',
        explainText:
          'Figma의 협업 기능과 문서 관리 방법, Frame과 Section의 차이점, 기본 기능을 배워요. Notion의 기본 기능을 워크숍 형식으로 예제를 만들며 배워요.',
      },
      {
        badge: '1주차',
        badgeColor: '#C6E400',
        text: '기초 GitHub 다루기',
        explainText:
          'GitHub로 코드를 올리고, 수정하는 과정을 익혀요. 브랜치 생성과 관리를 경험해요.',
      },
      {
        badge: '2주차',
        badgeColor: '#C6E400',
        text: 'SpringBoot의 이해',
        explainText: 'SpringBoot가 왜 쓰이고 어떻게 동작하는지 배워요.',
      },
      {
        badge: '3주차',
        badgeColor: '#C6E400',
        text: 'API 명세와 CRUD',
        explainText: 'API 설계 과정과 기본 API 개발 방식을 익혀요.',
      },
      {
        badge: '4주차',
        badgeColor: '#C6E400',
        text: 'Entity, Controller, Swagger 명세 ',
        explainText: 'Entity와 Controller 구조를 이해하고 Swagger로 API 문서화하는 방법을 익혀요.',
      },
      {
        badge: '5주차',
        badgeColor: '#C6E400',
        text: 'Repository, Dto, Service',
        explainText: 'DB 접근을 활용한 비즈니스 로직 구현 방식을 익혀요.',
      },
      {
        badge: '6주차',
        badgeColor: '#C6E400',
        text: 'MySQL과 ERD 활용',
        explainText: '테이블 구조와 관계를 설계하고 실제 DB에 활용하는 방법을 배워요.',
      },
      {
        badge: '7주차',
        badgeColor: '#C6E400',
        text: 'SpringSecurity와 JWT',
        explainText: '로그인, 인증·인가에 대해서 JWT와 함께 배워요.',
      },
      {
        badge: '8주차',
        badgeColor: '#C6E400',
        text: '응답 통일과 예외 처리 + 로깅',
        explainText: '에러와 응답을 깔끔하게 정리하고 남기는 방법을 배워요.',
      },
      {
        badge: '9주차',
        badgeColor: '#C6E400',
        text: 'IA 보고 ERD 작성 & API 생성하기 (PO 협업)',
        explainText: 'PO팀과 협업하여 전체적인 백엔드 개발 과정을 익혀요.',
      },
      {
        badge: '10주차',
        badgeColor: '#C6E400',
        text: 'AWS를 활용한 배포',
        explainText: '개발한 API를 AWS EC2에 배포하는 과정을 익혀요.',
      },
      {
        badge: '11주차',
        badgeColor: '#C6E400',
        text: '연합 세션',
        explainText: '프론트엔드 개발자와 협업하여 간단한 서비스를 만들어요.',
      },
    ],
  },
};

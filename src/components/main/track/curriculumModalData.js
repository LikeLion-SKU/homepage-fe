// Figma에서 제공한 이미지 URL (임시 - 나중에 실제 아이콘 파일로 교체 필요)
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
      },
      {
        badge: '1주차',
        badgeColor: '#C6E400',
        text: '개발 프로세스의 이해 / Figma 기초',
      },
      {
        badge: '2주차',
        badgeColor: '#C6E400',
        text: '리서치 기획하기 / Constraints, Auto Layout',
      },
      {
        badge: '3주차',
        badgeColor: '#C6E400',
        text: 'IA, 와이어프레임 / Design system, Variables',
      },
      {
        badge: '4주차',
        badgeColor: '#C6E400',
        text: '아이디어 크리틱 / 디자인 기초 이론, Variants',
      },
      {
        badge: '5주차',
        badgeColor: '#C6E400',
        text: '기획을 발표자료로 정리하기, BM / Dev mode',
      },
      {
        badge: '6주차',
        badgeColor: '#C6E400',
        text: '발표자료 피드백 / figma 기능 총 복습',
      },
      {
        badge: '7주차',
        badgeColor: '#C6E400',
        text: '개인별 프로젝트 PT 및 피드백',
      },
      {
        badge: '8주차',
        badgeColor: '#C6E400',
        text: '기능명세서 / 컨셉, 컬러, 타이포그래피',
      },
      {
        badge: '9주차',
        badgeColor: '#C6E400',
        text: 'API 활용 / effects, 이미지 활용',
      },
      {
        badge: '10주차',
        badgeColor: '#C6E400',
        text: '프로토타이핑',
      },
      {
        badge: '11주차',
        badgeColor: '#C6E400',
        text: '프로젝트 최종 발표 및 크리틱',
      },
      {
        badge: '12주차',
        badgeColor: '#C6E400',
        text: '기획 / 디자인 워크숍',
      },
      {
        badge: '13주차',
        badgeColor: '#C6E400',
        text: '기획 / 디자인 워크숍',
      },
      {
        badge: '14주차',
        badgeColor: '#C6E400',
        text: '기획 / 디자인 워크숍',
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
      },
      {
        badge: '1주차',
        badgeColor: '#C6E400',
        text: 'JavaScript 및 React 입문',
      },
      {
        badge: '2주차',
        badgeColor: '#C6E400',
        text: 'GitHub 기초 입문',
      },
      {
        badge: '3주차',
        badgeColor: '#C6E400',
        text: 'JSX, hook과 스타일링 다루기',
      },
      {
        badge: '4주차',
        badgeColor: '#C6E400',
        text: 'Figma, CSS, 폴더구조 익히기',
      },
      {
        badge: '5주차',
        badgeColor: '#C6E400',
        text: '라우팅과 API 구조 이해하기',
      },
      {
        badge: '6주차',
        badgeColor: '#C6E400',
        text: 'API 연동 실습',
      },
      {
        badge: '7주차',
        badgeColor: '#C6E400',
        text: 'Figma로 웹사이트 제작하기',
      },
      {
        badge: '8주차',
        badgeColor: '#C6E400',
        text: 'Vercel & Netlify로 배포하기',
      },
      {
        badge: '9주차',
        badgeColor: '#C6E400',
        text: ' GitHub 협업 실습',
      },
      {
        badge: '10주차',
        badgeColor: '#C6E400',
        text: '연합세션',
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
      },
      {
        badge: '1주차',
        badgeColor: '#C6E400',
        text: '기초 GitHub 다루기',
      },
      {
        badge: '2주차',
        badgeColor: '#C6E400',
        text: 'SpringBoot의 이해',
      },
      {
        badge: '3주차',
        badgeColor: '#C6E400',
        text: 'API 명세와 CRUD',
      },
      {
        badge: '4주차',
        badgeColor: '#C6E400',
        text: 'Entity, Controller, Swagger 명세 ',
      },
      {
        badge: '5주차',
        badgeColor: '#C6E400',
        text: 'Repository, Dto, Service',
      },
      {
        badge: '6주차',
        badgeColor: '#C6E400',
        text: 'MySQL과 ERD 활용',
      },
      {
        badge: '7주차',
        badgeColor: '#C6E400',
        text: 'SpringSecurity와 JWT',
      },
      {
        badge: '8주차',
        badgeColor: '#C6E400',
        text: '응답 통일과 예외 처리 + 로깅',
      },
      {
        badge: '9주차',
        badgeColor: '#C6E400',
        text: 'IA 보고 ERD 작성 & API 생성하기 (기획 협업)',
      },
      {
        badge: '10주차',
        badgeColor: '#C6E400',
        text: 'AWS를 활용한 배포',
      },
    ],
  },
};

import { useRef } from 'react';

// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';

import tracksBlahIcon from '@/assets/icons/main/track/tracks-blah.svg';
import BEImage from '@/assets/images/BE-explain.svg';
import FEImage from '@/assets/images/FE-explain.svg';
import POImage from '@/assets/images/PO-explain.svg';
import useScale from '@/components/main/hooks/useScale';
import MainSectionLayout from '@/components/main/layout';
import useMediaQuery from '@/hooks/useMediaQuery';

import Card from './card/card.jsx';

function Track() {
  const scale = useScale();
  const isMobile760 = useMediaQuery('(max-width: 760px)');
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const card1InView = useInView(card1Ref, { once: true, amount: 0.2, margin: '-150px' });
  const card2InView = useInView(card2Ref, { once: true, amount: 0.2, margin: '-150px' });
  const card3InView = useInView(card3Ref, { once: true, amount: 0.2, margin: '-150px' });
  const poDescription = {
    paragraph1:
      ' 프로젝트를 이끌며, 프로젝트에서 기획과 디자인을 담당해요. 문제점을 발견하고 해결책을 모색해 서비스로 구현해요.',
    paragraph2:
      ' 1. 기획과 디자인에 관한 자료를 함께 보고 생각을 공유하는 워크숍 수업을 통해 비판적 사고능력을 키워요. ',
    paragraph3:
      ' 2. Figma를 배우고, 효율적인 기획과 퀄리티 있는 결과물을 위해 리서치 AI와 생성형 AI 활용을 배워요.    ',
    gap: '0.5rem',
  };
  const feDescription = {
    paragraph1:
      ' 사용자가 화면에서 수행하는 클릭, 입력, 이동 등의 행동을 직관적인 UI로 설계하고 구현해요.',
    paragraph2:
      ' 1. UI 흐름과 인터랙션 사례를 함께 분석하며, 사용자 행동을 기준으로 한 사고력과 문제 해결 능력을 키워요. ',
    paragraph3: ' 2. JavaScript 기반의 React 라이브러리를 활용해 개발을 진행하며 배워요.  ',
    gap: '0.5rem',
  };
  const beDescription = {
    paragraph1:
      ' 사용자의 화면 속 행동이 화면 뒤에서 실제 서비스로 이어지도록 처리하는 역할을 담당해요.',
    paragraph2:
      ' 1. 데이터를 저장하고 관리하며, 서비스가 안정적으로 동작하도록 핵심 비즈니스 로직과 API를 구현해요.  ',
    paragraph3:
      ' 2. 이러한 과정을 Java 기반의 Spring 프레임워크를 활용해 개발을 진행하며 배워요.   ',
    gap: '0.5rem',
  };

  return (
    <MainSectionLayout
      title="트랙 소개"
      showTopBorder={false}
      overflowVisible={true}
      backgroundStyle={{
        backgroundImage: 'linear-gradient(rgb(244, 244, 244) 0%, rgba(217, 217, 217, 0) 100%)',
      }}
    >
      <div className="relative">
        {/* 트랙 섹션 내부에 위치하는 타이틀 옆 아이콘 (개별 위치 조정 가능) */}
        <img
          src={tracksBlahIcon}
          alt="tracks blah"
          className="absolute pointer-events-none"
          loading="lazy"
          style={{
            // 여기 값만 바꾸면 아이콘을 개별적으로 이동 가능
            left: `${(120 / 16) * scale}rem`,
            top: `${(-115 / 16) * scale}rem`,
            width: `${(159 / 16) * scale * (isMobile760 ? 1.4 : 1)}rem`,
            height: 'auto',
            zIndex: 30,
            willChange: 'transform',
          }}
        />

        <div className="flex flex-col min-[1200px]:flex-row gap-8 w-full min-[1200px]:w-[125%] min-[1200px]:-ml-[12%] mt-[42px] pb-0">
          <motion.div
            ref={card1Ref}
            className="flex-1 min-[1200px]:flex-1 max-[460px]:flex-none w-full"
            initial={{ y: 60, opacity: 0 }}
            animate={card1InView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0,
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <Card title="PO 프로젝트 오너" description={poDescription} image={POImage} />
          </motion.div>
          <motion.div
            ref={card2Ref}
            className="flex-1 min-[1200px]:flex-1 max-[460px]:flex-none w-full min-[1200px]:relative min-[1200px]:top-10"
            initial={{ y: 60, opacity: 0 }}
            animate={card2InView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.3,
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <Card title="FRONTEND 프론트엔드 개발자" description={feDescription} image={FEImage} />
          </motion.div>
          <motion.div
            ref={card3Ref}
            className="flex-1 min-[1200px]:flex-1 max-[460px]:flex-none w-full min-[1200px]:relative min-[1200px]:top-20"
            initial={{ y: 60, opacity: 0 }}
            animate={card3InView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.6,
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <Card title="BACKEND 백엔드 개발자" description={beDescription} image={BEImage} />
          </motion.div>
        </div>
      </div>
    </MainSectionLayout>
  );
}

export default Track;

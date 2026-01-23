// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import tracksBlahIcon from '@/assets/icons/main/track/tracks-blah.svg';
import BEImage from '@/assets/images/BE-explain.svg';
import FEImage from '@/assets/images/FE-explain.svg';
import POImage from '@/assets/images/PO-explain.svg';
import useScale from '@/components/main/hooks/useScale';
import MainSectionLayout from '@/components/main/layout';

import Card from './card/card.jsx';

function Track() {
  const scale = useScale();
  const poDescription =
    '우리 삶 속 Pain Point를 찾아내고 이를 해결하기 위한 서비스를 출시해요. 이를 위해 와이어프레임 Flowchart를 배워요. 사용자 경험을 고려한 UI를 디자인하고 서비스의 의도에 맞게 사용자들을 유도해요. 이를 위해 Figma라는 디자인 툴을 배워요.';
  const feDescription =
    '사용자가 화면에서 수행하는 클릭, 입력, 이동 등의 행동을 직관적인 UI로 설계해요. 이러한 상호작용이 실제 서비스 기능으로 자연스럽게 이어지게 화면 흐름과 상태를 제어해요. 함께 JavaScript 기반의 React 라이브러리를 활용해 개발을 진행하며 배워요.';
  const beDescription =
    '사용자의 화면 속 행동이 화면 뒤에서 실제 서비스로 이어지도록 처리하는 역할을 담당해요. 데이터를 저장하고 관리하며, 서비스가 안정적으로 동작하도록 핵심 비즈니스 로직과 API를 구현해요. 이러한 과정을 Java 기반의 Spring 프레임워크를 활용해 개발을 진행하며 배워요.';

  return (
    <MainSectionLayout
      title="트랙 소개"
      showTopBorder={false}
      backgroundStyle={{
        backgroundImage: 'linear-gradient(180deg, #F4F4F4 0%, rgba(217, 217, 217, 0) 100%)', // 그라데이션 배경
        backgroundBorderColor: '1px solid var(--color-navy-blue)',
      }}
    >
      <div className="relative">
        {/* 트랙 섹션 내부에 위치하는 타이틀 옆 아이콘 (개별 위치 조정 가능) */}
        <img
          src={tracksBlahIcon}
          alt="tracks blah"
          className="absolute pointer-events-none"
          style={{
            // 여기 값만 바꾸면 아이콘을 개별적으로 이동 가능
            left: `${(120 / 16) * scale}rem`,
            top: `${(-115 / 16) * scale}rem`,
            width: `${(159 / 16) * scale}rem`,
            height: 'auto',
            zIndex: 30,
          }}
        />

        <div className="flex flex-col sm:flex-row gap-8 w-full sm:w-[120%] sm:-ml-[10%] mt-[42px] pb-20 sm:pb-0">
          <motion.div
            className="flex-1 w-full"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0,
            }}
          >
            <Card title="PO 프로젝트 오너" description={poDescription} image={POImage} />
          </motion.div>
          <motion.div
            className="flex-1 w-full sm:relative sm:top-10"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.3,
            }}
          >
            <Card title="FRONTEND 프론트엔드 개발자" description={feDescription} image={FEImage} />
          </motion.div>
          <motion.div
            className="flex-1 w-full sm:relative sm:top-20"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.6,
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

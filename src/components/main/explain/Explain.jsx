// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import projectsIcon from '@/assets/icons/main/projects-blah.svg';
import skullionIcon from '@/assets/icons/main/skulions-blah.svg';
import SmallFrameBox from '@/components/layout/frame/Frame';
import ExplainBackground from '@/components/main/explain/background/ExplainBackground';
import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

import LabelBlahMarquee from './LabelBlahMarquee';
import ExplainText from './text/ExplainText';
import Number from './text/Number';

function Explain() {
  const scale = useScale();
  const isMobile760 = useMediaQuery('(max-width: 760px)');
  const isMobile480 = useMediaQuery('(max-width: 480px)');

  // 모바일에서 blah 이미지 위치 조정
  // 480px 이하일 때는 별도 위치 값 사용
  const leftBlahLift = isMobile480 ? 50 : isMobile760 ? 80 : 60; // 좌측은 아래로 (양수)
  const skullionLift = isMobile480 ? -30 : isMobile760 ? -20 : 20; // skullionIcon만 데스크톱에서 위로
  const leftBlahShift = isMobile480 ? -10 : isMobile760 ? -10 : 0; // 좌측은 왼쪽으로 (음수)
  const rightBlahShift = 0; // 우측은 움직이지 않음

  return (
    <ExplainBackground>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1, margin: '-100px' }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
        }}
      >
        <SmallFrameBox
          className="mb-2"
          cornerScale={0.9}
          borderWidth={2}
          letterSpacing={-0.88}
          color="var(--color-navy-blue)"
        >
          <div className="flex flex-col items-start justify-center w-full">
            <h2
              className="font-bold text-[var(--color-navy-blue)] m-0"
              style={{
                fontSize: `${(36 / 16) * scale * (isMobile480 ? 1.3 : 1)}rem`,
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontWeight: '700',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              서경대학교 멋쟁이사자처럼
            </h2>
          </div>
        </SmallFrameBox>

        {/* 본문 텍스트 */}
        <div style={{ marginTop: '0.9rem' }}>
          <ExplainText />
        </div>

        {/* Project 이미지 좌측 */}
        <motion.div
          className="flex justify-end mb-8"
          style={{
            marginTop: `${(160 / 16) * scale}rem`,
            position: 'relative',
            zIndex: 25,
          }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: '-100px' }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
        >
          <motion.img
            src={projectsIcon}
            alt="Project"
            className="object-contain"
            style={{
              width: `${(200 / 16) * scale * (isMobile760 ? 1.2 : 1)}rem`,
              height: `${(100 / 16) * scale * (isMobile760 ? 1.2 : 1)}rem`,
              marginRight: `${(-10 / 16) * scale}rem`,
              imageRendering: 'crisp-edges',
              transform: 'translateY(150%)',
              position: 'relative',
              zIndex: 30,
            }}
            initial={false}
            animate={{ y: leftBlahLift, x: leftBlahShift }}
            transition={{ type: 'tween', duration: 0.01 }}
          />
        </motion.div>

        {/* Skullions 이미지 우측 */}
        <motion.div
          className="flex justify-start mb-8"
          style={{
            marginTop: `${(40 / 16) * scale}rem`,
            position: 'relative',
            zIndex: 25,
          }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: '-100px' }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
        >
          <motion.img
            src={skullionIcon}
            alt="Skullions"
            className="object-contain"
            style={{
              width: `${(200 / 16) * scale * (isMobile760 ? 1.2 : 1)}rem`,
              height: `${(130 / 16) * scale * (isMobile760 ? 1.2 : 1)}rem`,
              marginLeft: `${(325 / 16) * scale}rem`,
              imageRendering: 'crisp-edges',
              transform: 'translateY(140%)',
              position: 'relative',
              zIndex: 30,
            }}
            initial={false}
            animate={{ y: skullionLift, x: rightBlahShift }}
            transition={{ type: 'tween', duration: 0.01 }}
          />
        </motion.div>

        {/* Label BLAH 1 + 2 (같이 이동) */}
        <div
          style={{
            marginTop: `${(370 / 16) * scale}rem`, // ← 여기 값만 조절
          }}
        >
          {/* Label BLAH 1 */}
          <div
            className="flex justify-start"
            style={{
              transform: 'translateY(-35%)',
              marginBottom: `${(40 / 16) * scale}rem`,
              marginLeft: `${(75 / 16) * scale}rem`,
            }}
          >
            <LabelBlahMarquee type="1" />
          </div>

          {/* Label BLAH 2 */}
          <div
            className="flex justify-end"
            style={{ transform: 'translateY(-30%)', marginRight: `${(110 / 16) * scale}rem` }}
          >
            <LabelBlahMarquee type="2" />
          </div>
        </div>

        {/* 숫자 */}

        <Number value={42} initialX={495} initialY={20} />
        <Number value={108} initialX={140} initialY={-120} />
      </motion.div>
    </ExplainBackground>
  );
}

export default Explain;

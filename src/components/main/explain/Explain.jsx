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
  const isMobile440 = useMediaQuery('(max-width: 440px)');
  const isDesktop1440 = useMediaQuery('(min-width: 1440px)');
  const isDesktop1200 = useMediaQuery('(min-width: 1200px)');

  // 모바일에서 blah 이미지 위치 조정
  // 480px 이하일 때는 별도 위치 값 사용
  const leftBlahLift = isMobile760
    ? (isMobile480 ? 15 : 40) + (isMobile440 ? 40 : 0) // 760px 이하에서 위로 이동 (음수), 480px 이하에서 projects만 아래로
    : 60 + (!isMobile760 ? 30 : 0) + (isDesktop1200 ? 20 : 0) + (isDesktop1440 ? 60 : 0); // 761px 이상에서 projects만 아래로, 1200px 이상에서 더 아래로, 1440px 이상에서 더 아래로
  const skullionLift = isMobile480
    ? -50 + (isMobile440 ? 30 : 0)
    : isMobile760
      ? -30
      : -20 + (!isMobile440 ? -20 : 0); // skullionIcon만 480px 이하에서 위로, 440px 이하에서 아래로, 441px 이상에서 위로
  const leftBlahShift =
    (isMobile480 ? 30 : isMobile760 ? 40 : 70) +
    (isMobile440 ? 20 : 0) +
    (!isMobile440 ? 20 : 0) +
    (isDesktop1440 ? 70 : 0); // 좌측은 왼쪽으로 (음수), 441px 이상에서 projects만 오른쪽으로, 1440px 이상에서 더 오른쪽으로
  const rightBlahShift = !isMobile760 ? 30 : 0; // 761px 이상에서 skulions만 오른쪽으로

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
        <div style={{ marginTop: isMobile760 ? '0.4rem' : '0.9rem' }}>
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
            marginTop: `${((isMobile440 ? 260 : isMobile480 ? 140 : isMobile760 ? 160 : 240) / 16) * scale}rem`, // ← 여기 값만 조절, 440px 이하에서 간격 높임
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

        <Number
          value={72}
          initialX={495}
          initialY={
            20 + (isMobile440 ? 50 : 0) + (!isMobile760 ? 40 : 0) + (isDesktop1440 ? 30 : 0)
          }
        />
        <Number
          value={108}
          initialX={140}
          initialY={
            -180 +
            (isMobile440 ? 100 : 0) +
            (!isMobile440 ? 80 : 0) +
            (!isMobile760 ? -20 : 0) +
            (isDesktop1440 ? -30 : 0)
          }
        />
      </motion.div>
    </ExplainBackground>
  );
}

export default Explain;

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import labelBlah1Icon from '@/assets/icons/main/label-blah1.svg';
import labelBlah2Icon from '@/assets/icons/main/label-blah2.svg';
import leftBlahIcon from '@/assets/icons/main/left-blah.svg';
import rightBlahIcon from '@/assets/icons/main/right-blah.svg';
import LabelAnimation from '@/components/animation/LabelAnimation';
import SmallFrameBox from '@/components/layout/frame/Frame';
import ExplainBackground from '@/components/main/explain/background/ExplainBackground';
import useScale from '@/components/main/hooks/useScale';

import ExplainText from './text/ExplainText';
import Number from './text/Number';

function Explain() {
  const scale = useScale();

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
          className="mb-12"
          cornerScale={0.9}
          borderWidth={2}
          letterSpacing={-0.88}
          color="var(--color-navy-blue)"
        >
          <div className="flex flex-col items-start justify-center w-full">
            <h2
              className="font-bold text-[var(--color-navy-blue)] m-0"
              style={{
                fontSize: `${(36 / 16) * scale}rem`,
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
        <ExplainText />

        {/* BLAH 이미지 좌측 */}
        <motion.div
          className="flex justify-end mb-8"
          style={{
            marginTop: `${(160 / 16) * scale}rem`,
          }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: '-100px' }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
        >
          <img
            src={leftBlahIcon}
            alt="BLAH"
            className="object-contain"
            style={{
              width: `${(180 / 16) * scale}rem`,
              height: `${(61 / 16) * scale}rem`,
              marginRight: `${(50 / 16) * scale}rem`,
              imageRendering: 'crisp-edges',
              transform: 'translateY(150%)',
            }}
          />
        </motion.div>

        {/* BLAH 이미지 우측 */}
        <motion.div
          className="flex justify-start mb-8"
          style={{
            marginTop: `${(80 / 16) * scale}rem`,
          }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: '-100px' }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
          }}
        >
          <img
            src={rightBlahIcon}
            alt="BLAH"
            className="object-contain"
            style={{
              width: `${(177 / 16) * scale}rem`,
              height: `${(55 / 16) * scale}rem`,
              marginLeft: `${(332 / 16) * scale}rem`,
              imageRendering: 'crisp-edges',
              transform: 'translateY(140%)',
            }}
          />
        </motion.div>

        {/* Label BLAH 1 + 2 (같이 이동) */}
        <motion.div
          style={{
            marginTop: `${(330 / 16) * scale}rem`, // ← 여기 값만 조절
          }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: '-100px' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Label BLAH 1 */}
          <div className="flex justify-start mb-3" style={{ transform: 'translateY(-40%)' }}>
            <LabelAnimation direction="right" maxOffset={200} startX={160}>
              <img
                src={labelBlah1Icon}
                alt="Label BLAH 1"
                className="object-contain"
                style={{
                  width: `${(1220 / 16) * scale}rem`,
                  height: `${(140 / 16) * scale}rem`,
                  minWidth: `${(1220 / 16) * scale}rem`,
                  minHeight: `${(140 / 16) * scale}rem`,
                  marginLeft: `${(100 / 16) * scale}rem`,
                  imageRendering: 'crisp-edges',
                  display: 'block',
                }}
              />
            </LabelAnimation>
          </div>

          {/* Label BLAH 2 */}
          <div className="flex justify-end mb-[-15px]" style={{ transform: 'translateY(-30%)' }}>
            <LabelAnimation direction="left" maxOffset={200} startX={-200}>
              <img
                src={labelBlah2Icon}
                alt="Label BLAH 2"
                className="object-contain"
                style={{
                  width: `${(1220 / 16) * scale}rem`,
                  height: `${(140 / 16) * scale}rem`,
                  minWidth: `${(1220 / 16) * scale}rem`,
                  minHeight: `${(140 / 16) * scale}rem`,
                  marginRight: `${(100 / 16) * scale}rem`,
                  imageRendering: 'crisp-edges',
                  display: 'block',
                }}
              />
            </LabelAnimation>
          </div>
        </motion.div>

        {/* 숫자 */}

        <Number value={50} initialX={495} initialY={40} />
        <Number value={54} initialX={140} initialY={-100} />
      </motion.div>
    </ExplainBackground>
  );
}

export default Explain;

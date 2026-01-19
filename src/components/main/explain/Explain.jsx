import { useEffect, useState } from 'react';

import labelBlah1Icon from '@/assets/icons/main/label-blah1.svg';
import labelBlah2Icon from '@/assets/icons/main/label-blah2.svg';
import leftBlahIcon from '@/assets/icons/main/left-blah.svg';
import rightBlahIcon from '@/assets/icons/main/right-blah.svg';
import SmallFrameBox from '@/components/layout/frame/Frame';
import ExplainBackground from '@/components/main/explain/background/ExplainBackground';

import ExplainText from './text/ExplainText';

function Explain() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth;
      const baseWidth = 1440;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const calculatedScale = windowWidth / (baseWidth * (rootFontSize / 16));
      setScale(calculatedScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <ExplainBackground>
      <SmallFrameBox className="mb-12" cornerScale={0.9} borderWidth={2} letterSpacing={-0.88}>
        <div className="flex flex-col items-start justify-center w-full">
          <h2
            className="font-bold text-[#1a1a1a] m-0"
            style={{
              fontSize: `${(36 / 16) * scale}rem`,
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: '700',
            }}
          >
            서경대학교 멋쟁이사자처럼
          </h2>
        </div>
      </SmallFrameBox>

      {/* 본문 텍스트 */}
      <ExplainText />

      {/* BLAH 이미지 좌측 */}
      <div
        className="flex justify-end mb-8"
        style={{
          marginTop: `${(160 / 16) * scale}rem`,
        }}
      >
        <img
          src={leftBlahIcon}
          alt="BLAH"
          className="object-contain"
          style={{
            width: `${(180 / 16) * scale}rem`,
            height: `${(61 / 16) * scale}rem`,
            marginRight: `${(60 / 16) * scale}rem`,
          }}
        />
      </div>

      {/* BLAH 이미지 우측 */}
      <div
        className="flex justify-start mb-8"
        style={{
          marginTop: `${(80 / 16) * scale}rem`,
        }}
      >
        <img
          src={rightBlahIcon}
          alt="BLAH"
          className="object-contain"
          style={{
            width: `${(177 / 16) * scale}rem`,
            height: `${(55 / 16) * scale}rem`,
            marginLeft: `${(300 / 16) * scale}rem`,
          }}
        />
      </div>

      {/* Label BLAH 1 */}
      <div
        className="flex justify-start mb-3 animate-fade-in-left"
        style={{
          marginTop: `${(160 / 16) * scale}rem`,
        }}
      >
        <img
          src={labelBlah1Icon}
          alt="Label BLAH 1"
          className="object-contain"
          style={{
            width: `${(1220 / 16) * scale}rem`,
            height: `${(140 / 16) * scale}rem`,
            marginLeft: `${(180 / 16) * scale}rem`,
          }}
        />
      </div>

      {/* Label BLAH 2 */}
      <div className="flex justify-end mb-[-15px] animate-fade-in-right">
        <img
          src={labelBlah2Icon}
          alt="Label BLAH 2"
          className="object-contain"
          style={{
            width: `${(1220 / 16) * scale}rem`,
            height: `${(140 / 16) * scale}rem`,
            marginRight: `${(180 / 16) * scale}rem`,
          }}
        />
      </div>
    </ExplainBackground>
  );
}

export default Explain;

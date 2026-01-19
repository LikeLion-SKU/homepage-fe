import { useEffect, useState } from 'react';

function ExplainText() {
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

  const fontSize = `${(18 / 16) * scale}rem`;
  const lineHeight = '160%';

  return (
    <div
      style={{
        color: '#1C1B1A',
        fontSize,
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        lineHeight,
      }}
      className="break-words"
    >
      <span
        style={{
          fontWeight: '500',
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        }}
      >
        안녕하세요{' '}
      </span>
      <span
        style={{
          fontWeight: '700',
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        }}
      >
        서경대학교 멋쟁이사자처럼
      </span>
      <span
        style={{
          fontWeight: '500',
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        }}
      >
        입니다.
        <br />
        멋쟁이사자처럼은 다양한 전공의 학생들로 이루어진 IT 동아리입니다.
        <br />
        서경대 멋쟁이사자처럼은 함께 배우고 성장하는 커뮤니티를 지향합니다.
        <br />
        스스로를 발전시키고자 하는 열정을 바탕으로 도전하며,
        <br />
        성장을 즐길 줄 아는 분들과 함께 더 나은 내일을 만들어가고자 합니다.
      </span>
    </div>
  );
}

export default ExplainText;

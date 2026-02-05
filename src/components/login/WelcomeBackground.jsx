import bacteriaIcon from '@/assets/icons/bacteriophage.svg';
import catIcon from '@/assets/icons/cat.svg';
import cursorIcon from '@/assets/icons/cursor.svg';
import eyeIcon from '@/assets/icons/eye.svg';
import humanIcon from '@/assets/icons/human.svg';
import ninjaIcon from '@/assets/icons/ninja.svg';
import sunIcon from '@/assets/icons/sun.svg';
import telephoneIcon from '@/assets/icons/telephone.svg';

function WelcomeBackground({ children }) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 아이콘들 - 격자보다 위에 배치 (z-index: 5), 반응형 없이 고정 픽셀 크기/위치, 잘리도록 */}
      <div className="absolute inset-0 z-[5] pointer-events-none" style={{ overflow: 'hidden' }}>
        {/* cat - 좌측 상단 */}
        <img
          src={catIcon}
          alt="cat"
          className="absolute"
          style={{
            top: '85px',
            left: '360px',
            width: '200px',
            height: 'auto',
            maxWidth: 'none',
            flexShrink: 0,
          }}
        />

        {/* sun - 우측 상단 */}
        <img
          src={sunIcon}
          alt="sun"
          className="absolute"
          style={{
            top: '35px',
            left: '-26px',
            width: '200px',
            height: 'auto',
            maxWidth: 'none',
            flexShrink: 0,
          }}
        />

        {/* bacteria - 좌측 중앙 */}
        <img
          src={bacteriaIcon}
          alt="bacteria"
          className="absolute"
          style={{
            top: '365px',
            left: '72px',
            width: '220px',
            height: 'auto',
            maxWidth: 'none',
            flexShrink: 0,
          }}
        />

        {/* cursor - 우측 중앙 */}
        <img
          src={cursorIcon}
          alt="cursor"
          className="absolute"
          style={{
            top: '520px',
            left: '800px',
            width: '200px',
            height: 'auto',
            maxWidth: 'none',
            flexShrink: 0,
          }}
        />

        {/* human - 좌측 하단 */}
        <img
          src={humanIcon}
          alt="human"
          className="absolute"
          style={{
            bottom: '-55px',
            left: '350px',
            width: '170px',
            height: 'auto',
            maxWidth: 'none',
            flexShrink: 0,
          }}
        />

        {/* eye - 중앙 하단 */}
        <img
          src={eyeIcon}
          alt="eye"
          className="absolute"
          style={{
            bottom: '414px',
            left: '905px',
            width: '185px',
            height: 'auto',
            maxWidth: 'none',
            flexShrink: 0,
          }}
        />

        {/* telephone - 우측 하단 */}
        <img
          src={telephoneIcon}
          alt="telephone"
          className="absolute"
          style={{
            bottom: '557px',
            left: '1351px',
            width: '190px',
            height: 'auto',
            maxWidth: 'none',
            flexShrink: 0,
          }}
        />

        {/* ninja - 중앙 상단 */}
        <img
          src={ninjaIcon}
          alt="ninja"
          className="absolute"
          style={{
            top: '400px',
            left: '1306px',
            width: '200px',
            height: 'auto',
            maxWidth: 'none',
            flexShrink: 0,
          }}
        />
      </div>

      {/* children (WelcomeSection) */}
      {children}
    </div>
  );
}

export default WelcomeBackground;

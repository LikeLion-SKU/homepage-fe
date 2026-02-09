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
            top: '120px',
            left: '395px',
            width: '220px',
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
            left: '-40px',
            width: '240px',
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
            top: '485px',
            left: '5px',
            width: '250px',
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
            bottom: '30px',
            left: '945px',
            width: '230px',
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
            bottom: '-100px',
            left: '350px',
            width: '190px',
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
            bottom: '534px',
            left: '1105px',
            width: '205px',
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
            bottom: '697px',
            left: '1651px',
            width: '200px',
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
            top: '590px',
            left: '1590px',
            width: '220px',
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

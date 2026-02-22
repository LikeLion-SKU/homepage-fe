import scheduleBlahIcon from '@/assets/icons/main/schedule/2026-blah.svg';
import aprilIcon from '@/assets/icons/main/schedule/april.svg';
import augustIcon from '@/assets/icons/main/schedule/august.svg';
import decemberIcon from '@/assets/icons/main/schedule/december.svg';
import julyIcon from '@/assets/icons/main/schedule/july.svg';
import juneIcon from '@/assets/icons/main/schedule/june.svg';
import marchIcon from '@/assets/icons/main/schedule/march.svg';
import mayIcon from '@/assets/icons/main/schedule/may.svg';
import novemberIcon from '@/assets/icons/main/schedule/november.svg';
import octoberIcon from '@/assets/icons/main/schedule/october.svg';
import sebtemberIcon from '@/assets/icons/main/schedule/sebtember.svg';
import umbrellaIcon from '@/assets/icons/main/schedule/umbrella.svg';
import useScale from '@/components/main/hooks/useScale';
import ClickBox from '@/components/main/schedule/ClickBox';
import useMediaQuery from '@/hooks/useMediaQuery';

function ScheduleMobile({ onMonthClick }) {
  const scale = useScale();
  const isMobile = useMediaQuery('(max-width: 480px)');
  // 월별 아이콘 매핑
  const monthIconMap = {
    '3월': marchIcon,
    '4월': aprilIcon,
    '5월': mayIcon,
    '6월': juneIcon,
    '7월': julyIcon,
    '8월': augustIcon,
    '9월': sebtemberIcon,
    '10월': octoberIcon,
    '11월': novemberIcon,
    '12월': decemberIcon,
  };

  // 월별 말풍선 오프셋 (px)
  const CLICKBOX_OFFSET = {
    '3월': { x: 0, y: 0 },
    '4월': { x: 0, y: 0 },
    '5월': { x: 20, y: 25 },
    '6월': { x: 0, y: 15 },
    '7월': { x: 0, y: 0 },
    '8월': { x: 5, y: 0 },
    '9월': { x: 5, y: -5 },
    '10월': { x: 10, y: 30 },
    '11월': { x: 5, y: 0 },
    '12월': { x: 5, y: 5 },
  };

  return (
    <div className="relative w-full" style={{ minHeight: '455px', paddingTop: '15px' }}>
      {/* 타이틀 옆 장식 아이콘 (2026-blah) */}
      <img
        src={scheduleBlahIcon}
        alt="schedule blah"
        className="absolute pointer-events-none"
        style={{
          left: isMobile ? '33%' : '40%',
          top: `${((isMobile ? -235 : -200) / 16) * scale}rem`,
          width: `${((isMobile ? 200 : 120) / 16) * scale}rem`,
          height: 'auto',
          zIndex: 30,
        }}
      />
      {/* 월별 아이콘들을 모바일 레이아웃에 맞게 배치 */}
      <div className="relative w-full" style={{ height: '380px' }}>
        {/* Dot icons - 장식용 */}
        {/* 상단 중앙 dot 그룹 */}
        <div className="absolute" style={{ left: '26%', top: '-5px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 상단 오른쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '89%', top: '-5px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 중간 왼쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '5%', top: '80px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 중간 중앙 dot 그룹 */}
        <div className="absolute" style={{ left: '50%', top: '80px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>
        {/* 중간 중앙2 dot 그룹 */}
        <div className="absolute" style={{ left: '77%', top: '80px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(1)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>
        {/* 중간 오른쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '102%', top: '80px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 하단 왼쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '-28%', top: '185px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 하단 중앙 dot 그룹 */}
        <div className="absolute" style={{ left: '33%', top: '185px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 하단 오른쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '89%', top: '185px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 최하단 왼쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '-15%', top: '290px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(1)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>
        {/* 최하단 중간 dot 그룹 */}
        <div className="absolute" style={{ left: '16%', top: '290px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>
        {/* 최하단 오른쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '63%', top: '290px' }}>
          <div className="flex" style={{ gap: `${(0 / 16) * scale}rem` }}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{
                  fontFamily: 'pixel game, monospace',
                  marginLeft: i > 0 ? `${(-25 / 16) * scale}rem` : '0',
                }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 3월 - 상단 왼쪽 */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '8%' : '3%', top: '8px', width: '50px', height: '48px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['3월'].x} offsetYPx={CLICKBOX_OFFSET['3월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('3월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="3월 일정 보기"
          >
            <img src={monthIconMap['3월']} alt="3월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* 5월 - 상단 오른쪽 */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '65%' : '60%', top: '-17px', width: '53px', height: '60px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['5월'].x} offsetYPx={CLICKBOX_OFFSET['5월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('5월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="5월 일정 보기"
          >
            <img src={monthIconMap['5월']} alt="5월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* 6월 - 중간 왼쪽 */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '35%' : '30%', top: '77px', width: '45px', height: '50px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['6월'].x} offsetYPx={CLICKBOX_OFFSET['6월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('6월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="6월 일정 보기"
          >
            <img src={monthIconMap['6월']} alt="6월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* 7월 - 중간 오른쪽 */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '88%' : '83%', top: '91px', width: '32px', height: '32px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['7월'].x} offsetYPx={CLICKBOX_OFFSET['7월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('7월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="7월 일정 보기"
          >
            <img src={monthIconMap['7월']} alt="7월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* umbrella 아이콘 - 7월 옆 */}
        <img
          src={umbrellaIcon}
          alt="umbrella"
          className="absolute"
          style={{
            left: isMobile ? '70%' : '65%',
            top: '97px',
            width: '22px',
            height: '24px',
          }}
        />

        {/* 8월 - 하단 왼쪽 */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '15%' : '10%', top: '186px', width: '40px', height: '45px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['8월'].x} offsetYPx={CLICKBOX_OFFSET['8월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('8월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="8월 일정 보기"
          >
            <img src={monthIconMap['8월']} alt="8월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* 9월 - 중앙 */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '74%' : '69%', top: '189px', width: '42px', height: '38px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['9월'].x} offsetYPx={CLICKBOX_OFFSET['9월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('9월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="9월 일정 보기"
          >
            <img src={monthIconMap['9월']} alt="9월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* 10월 - 하단 왼쪽 */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '-4%' : '-9%', top: '270px', width: '73px', height: '80px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['10월'].x} offsetYPx={CLICKBOX_OFFSET['10월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('10월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="10월 일정 보기"
          >
            <img src={monthIconMap['10월']} alt="10월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* 11월 - 하단 중앙 */}
        <div
          className="absolute group"
          style={{
            left: isMobile ? '51.27%' : '46.27%',
            top: '298px',
            width: '35px',
            height: '32px',
          }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['11월'].x} offsetYPx={CLICKBOX_OFFSET['11월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('11월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="11월 일정 보기"
          >
            <img src={monthIconMap['11월']} alt="11월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* 12월 - 하단 오른쪽 */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '97%' : '92%', top: '275px', width: '45px', height: '63px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['12월'].x} offsetYPx={CLICKBOX_OFFSET['12월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('12월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="12월 일정 보기"
          >
            <img src={monthIconMap['12월']} alt="12월" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* 4월 - 상단 중앙 (필요시 추가) */}
        <div
          className="absolute group"
          style={{ left: isMobile ? '-9%' : '-14%', top: '90px', width: '35px', height: '35px' }}
        >
          <ClickBox offsetXPx={CLICKBOX_OFFSET['4월'].x} offsetYPx={CLICKBOX_OFFSET['4월'].y} />
          <button
            type="button"
            onClick={() => onMonthClick('4월')}
            className="relative w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-105"
            aria-label="4월 일정 보기"
          >
            <img src={monthIconMap['4월']} alt="4월" className="w-full h-full object-contain" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleMobile;

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

function ScheduleMobile({ onMonthClick }) {
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

  return (
    <div className="relative w-full" style={{ minHeight: '455px', paddingTop: '15px' }}>
      {/* 월별 아이콘들을 모바일 레이아웃에 맞게 배치 */}
      <div className="relative w-full" style={{ height: '380px' }}>
        {/* Dot icons - 장식용 */}
        {/* 상단 중앙 dot 그룹 */}
        <div className="absolute" style={{ left: '26%', top: '-5px' }}>
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 상단 오른쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '89%', top: '-5px' }}>
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 중간 왼쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '5%', top: '80px' }}>
          <div className="flex gap-2.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 중간 중앙 dot 그룹 */}
        <div className="absolute" style={{ left: '50%', top: '80px' }}>
          <div className="flex gap-2.5">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>
        {/* 중간 중앙2 dot 그룹 */}
        <div className="absolute" style={{ left: '75%', top: '80px' }}>
          <div className="flex gap-2.5">
            {[...Array(1)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>
        {/* 중간 오른쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '102%', top: '80px' }}>
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 하단 왼쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '-28%', top: '185px' }}>
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 하단 중앙 dot 그룹 */}
        <div className="absolute" style={{ left: '33%', top: '185px' }}>
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 하단 오른쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '89%', top: '185px' }}>
          <div className="flex gap-2.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 최하단 왼쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '-15%', top: '290px' }}>
          <div className="flex gap-2.5">
            {[...Array(1)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>
        {/* 최하단 중간 dot 그룹 */}
        <div className="absolute" style={{ left: '16%', top: '290px' }}>
          <div className="flex gap-2.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>
        {/* 최하단 오른쪽 dot 그룹 */}
        <div className="absolute" style={{ left: '63%', top: '290px' }}>
          <div className="flex gap-2.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="text-[#00156a] text-5xl font-bold"
                style={{ fontFamily: 'pixel game, monospace' }}
              >
                .
              </div>
            ))}
          </div>
        </div>

        {/* 3월 - 상단 왼쪽 */}
        <button
          type="button"
          onClick={() => onMonthClick('3월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '3%',
            top: '4px',
            width: '55px',
            height: '55px',
          }}
          aria-label="3월 일정 보기"
        >
          <img src={monthIconMap['3월']} alt="3월" className="w-full h-full object-contain" />
        </button>

        {/* 5월 - 상단 오른쪽 */}
        <button
          type="button"
          onClick={() => onMonthClick('5월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '60%',
            top: '-17px',
            width: '60px',
            height: '60px',
          }}
          aria-label="5월 일정 보기"
        >
          <img src={monthIconMap['5월']} alt="5월" className="w-full h-full object-contain" />
        </button>

        {/* 6월 - 중간 왼쪽 */}
        <button
          type="button"
          onClick={() => onMonthClick('6월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '30%',
            top: '77px',
            width: '50px',
            height: '50px',
          }}
          aria-label="6월 일정 보기"
        >
          <img src={monthIconMap['6월']} alt="6월" className="w-full h-full object-contain" />
        </button>

        {/* 7월 - 중간 오른쪽 */}
        <button
          type="button"
          onClick={() => onMonthClick('7월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '83%',
            top: '91px',
            width: '38px',
            height: '38px',
          }}
          aria-label="7월 일정 보기"
        >
          <img src={monthIconMap['7월']} alt="7월" className="w-full h-full object-contain" />
        </button>

        {/* 8월 - 하단 왼쪽 */}
        <button
          type="button"
          onClick={() => onMonthClick('8월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '9%',
            top: '185px',
            width: '50px',
            height: '50px',
          }}
          aria-label="8월 일정 보기"
        >
          <img src={monthIconMap['8월']} alt="8월" className="w-full h-full object-contain" />
        </button>

        {/* 9월 - 중앙 */}
        <button
          type="button"
          onClick={() => onMonthClick('9월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '67%',
            top: '183px',
            width: '50px',
            height: '50px',
          }}
          aria-label="9월 일정 보기"
        >
          <img src={monthIconMap['9월']} alt="9월" className="w-full h-full object-contain" />
        </button>

        {/* 10월 - 하단 왼쪽 */}
        <button
          type="button"
          onClick={() => onMonthClick('10월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '-9%',
            top: '270px',
            width: '90px',
            height: '80px',
          }}
          aria-label="10월 일정 보기"
        >
          <img src={monthIconMap['10월']} alt="10월" className="w-full h-full object-contain" />
        </button>

        {/* 11월 - 하단 중앙 */}
        <button
          type="button"
          onClick={() => onMonthClick('11월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '44.27%',
            top: '295px',
            width: '38px',
            height: '38px',
          }}
          aria-label="11월 일정 보기"
        >
          <img src={monthIconMap['11월']} alt="11월" className="w-full h-full object-contain" />
        </button>

        {/* 12월 - 하단 오른쪽 */}
        <button
          type="button"
          onClick={() => onMonthClick('12월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '92%',
            top: '275px',
            width: '60px',
            height: '63px',
          }}
          aria-label="12월 일정 보기"
        >
          <img src={monthIconMap['12월']} alt="12월" className="w-full h-full object-contain" />
        </button>

        {/* 4월 - 상단 중앙 (필요시 추가) */}
        <button
          type="button"
          onClick={() => onMonthClick('4월')}
          className="absolute cursor-pointer hover:opacity-80 transition-opacity active:opacity-70"
          style={{
            left: '-14%',
            top: '90px',
            width: '35px',
            height: '35px',
          }}
          aria-label="4월 일정 보기"
        >
          <img src={monthIconMap['4월']} alt="4월" className="w-full h-full object-contain" />
        </button>
      </div>
    </div>
  );
}

export default ScheduleMobile;

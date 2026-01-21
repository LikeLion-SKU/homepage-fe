import awardBlahIcon from '@/assets/icons/main/award/winner-blah.svg';
import Award1Image from '@/assets/images/danchu.png';
import Award3Image from '@/assets/images/junglegym.png';
import Award2Image from '@/assets/images/livfit.png';
import useScale from '@/components/main/hooks/useScale';
import MainSectionLayout from '@/components/main/layout';

import AwardButton from './AwardButton';
import AwardCardList from './AwardCardList';
import AwardText from './AwardText';

// 더미 데이터 (나중에 실제 데이터로 교체 가능)
const awardCards = [
  {
    image: Award1Image,
    hasDragButton: false,
  },
  {
    image: Award2Image,
    hasDragButton: true,
  },
  {
    image: Award3Image,
    hasDragButton: false,
  },
];

function Award() {
  const scale = useScale();

  return (
    <MainSectionLayout title="역대 수상작" showTopBorder={false} paddingScale={0.39}>
      <div className="relative" style={{ minHeight: `${(800 / 16) * scale}rem` }}>
        {/* 우측 상단 텍스트 (개별 위치 조정 가능) */}
        <div
          className="absolute text-right"
          style={{
            right: `${(-56 / 16) * scale}rem`,
            top: `${(-80 / 16) * scale}rem`,
            zIndex: 30,
            maxWidth: `${(520 / 16) * scale}rem`,
          }}
        >
          <AwardText />
        </div>

        {/* 타이틀 옆 장식 아이콘 (개별 위치 조정 가능) */}
        <img
          src={awardBlahIcon}
          alt="award blah"
          className="absolute pointer-events-none"
          style={{
            left: `${(110 / 16) * scale}rem`,
            top: `${(-30 / 16) * scale}rem`,
            width: `${(159 / 16) * scale}rem`,
            height: 'auto',
            zIndex: 30,
          }}
        />
        {/* 카드만 아래로 내리기 (아이콘 위치에는 영향 없음) */}
        <div style={{ paddingTop: `${(140 / 16) * scale}rem` }}>
          <AwardCardList cards={awardCards} />
        </div>

        {/* 하단 버튼 */}
        <div style={{ marginTop: `${(30 / 16) * scale}rem` }}>
          <AwardButton />
        </div>
      </div>
    </MainSectionLayout>
  );
}

export default Award;

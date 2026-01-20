import Bird6Image from '@/assets/images/bird6-image.png';
import useScale from '@/components/main/hooks/useScale';
import MainSectionLayout from '@/components/main/layout';

import AwardCardList from './AwardCardList';

// 더미 데이터 (나중에 실제 데이터로 교체 가능)
const awardCards = [
  {
    image: null,
    hasDragButton: false,
  },
  {
    image: Bird6Image,
    hasDragButton: true,
  },
  {
    image: null,
    hasDragButton: false,
  },
];

function Award() {
  const scale = useScale();

  return (
    <MainSectionLayout title="역대 수상작" showTopBorder={false} paddingScale={0.4}>
      <div
        style={{
          marginTop: `${(70 / 16) * scale}rem`,
        }}
      >
        <AwardCardList cards={awardCards} />
      </div>
    </MainSectionLayout>
  );
}

export default Award;

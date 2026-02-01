import { useEffect, useState } from 'react';

import awardBlahIcon from '@/assets/icons/main/award/winner-blah.svg';
import Award6Image from '@/assets/images/artium.png';
import Award1Image from '@/assets/images/danchu.png';
import Award3Image from '@/assets/images/junglegym.png';
import Award2Image from '@/assets/images/livfit.png';
import Award4Image from '@/assets/images/pickle.png';
import Award5Image from '@/assets/images/setbang.png';
import useScale from '@/components/main/hooks/useScale';
import MainSectionLayout from '@/components/main/layout';
import useMediaQuery from '@/hooks/useMediaQuery';

import AwardButton from './AwardButton';
import AwardCardList from './AwardCardList';
import AwardText from './AwardText';

// 더미 데이터 (나중에 API 호출로 교체 예정)
const dummyAwardCards = [
  {
    image: Award1Image,
    hasDragButton: false,
    to: '/project', // 단추 상세보기
  },
  {
    image: Award2Image,
    hasDragButton: true,
    to: '/project/viewDetail', // 임시로 단추 상세보기
  },
  {
    image: Award3Image,
    hasDragButton: false,
    to: '/project', // 예시
  },
  {
    image: Award4Image,
    hasDragButton: false,
    to: '/project/viewDetail', // 예시
  },
  {
    image: Award5Image,
    hasDragButton: false,
    to: '/project', // 예시
  },
  {
    image: Award6Image,
    hasDragButton: false,
    to: '/project/viewDetail', // 예시
  },
];

function Award() {
  const scale = useScale();
  const isMobile480 = useMediaQuery('(max-width: 480px)');
  const isMobile760 = useMediaQuery('(max-width: 760px)');

  // TODO: API 호출로 수상작 카드 데이터 받아오기
  // API 응답 예시 구조:
  // {
  //   id: number,
  //   image: string (이미지 URL),
  //   hasDragButton: boolean,
  //   detailPath: string (예: '/project/123' 또는 '/project/viewDetail?id=123')
  // }
  const [awardCards, _setAwardCards] = useState(dummyAwardCards);

  useEffect(() => {
    // TODO: API 호출 구현
    // 예시:
    // const fetchAwardCards = async () => {
    //   try {
    //     const data = await APIService.public.get('/api/awards');
    //     // API 응답을 카드 형식으로 변환
    //     const cards = data.map((item) => ({
    //       image: item.imageUrl,
    //       hasDragButton: item.hasDragButton || false,
    //       to: item.detailPath || `/project/${item.id}`,
    //     }));
    //     _setAwardCards(cards);
    //   } catch (error) {
    //     console.error('수상작 카드 데이터 로드 실패:', error);
    //     // 에러 발생 시 더미 데이터 유지
    //   }
    // };
    // fetchAwardCards();
  }, []);

  return (
    <MainSectionLayout
      title="역대 수상작"
      showTopBorder={false}
      paddingScale={isMobile480 ? 0.6 : 0.39}
      paddingBottomScale={isMobile480 ? 5 : 1}
      frameTopOffset={isMobile480 ? -80 : null}
    >
      <div className="relative" style={{ minHeight: `${(800 / 16) * scale}rem` }}>
        {/* 모바일 480px 이하: 텍스트를 프레임 박스 아래로 배치 */}
        {isMobile480 ? (
          <>
            {/* 타이틀 옆 장식 아이콘 */}
            <img
              src={awardBlahIcon}
              alt="award blah"
              className="absolute pointer-events-none"
              style={{
                left: `${(300 / 16) * scale}rem`,
                top: `${(-150 / 16) * scale}rem`,
                width: `${(159 / 16) * scale * (isMobile760 ? 1.2 : 1)}rem`,
                height: 'auto',
                zIndex: 30,
              }}
            />
            {/* 프레임 박스 아래 텍스트 */}
            <div
              className="text-right"
              style={{
                marginTop: `${(20 / 16) * scale}rem`,
                marginBottom: `${(20 / 16) * scale}rem`,
                transform: `translateX(${(120 / 16) * scale}rem)`,
                maxWidth: '100%',
              }}
            >
              <AwardText />
            </div>
            {/* 카드 */}
            <div style={{ paddingTop: `${(20 / 16) * scale}rem` }}>
              <AwardCardList cards={awardCards} />
            </div>
          </>
        ) : (
          <>
            {/* 데스크탑: 우측 상단 텍스트 */}
            <div
              className="absolute text-right"
              style={{
                right: `${(-70 / 16) * scale}rem`,
                top: `${(-110 / 16) * scale}rem`,
                zIndex: 30,
                maxWidth: `${(520 / 16) * scale}rem`,
              }}
            >
              <AwardText />
            </div>

            {/* 타이틀 옆 장식 아이콘 */}
            <img
              src={awardBlahIcon}
              alt="award blah"
              className="absolute pointer-events-none"
              style={{
                left: `${(110 / 16) * scale}rem`,
                top: `${(-30 / 16) * scale}rem`,
                width: `${(159 / 16) * scale * (isMobile760 ? 1.2 : 1)}rem`,
                height: 'auto',
                zIndex: 30,
              }}
            />
            {/* 카드만 아래로 내리기 */}
            <div style={{ paddingTop: `${(60 / 16) * scale}rem` }}>
              <AwardCardList cards={awardCards} />
            </div>
          </>
        )}

        {/* 하단 버튼 */}
        <div
          style={{ marginTop: isMobile480 ? `${(50 / 16) * scale}rem` : `${(50 / 16) * scale}rem` }}
        >
          <AwardButton />
        </div>
      </div>
    </MainSectionLayout>
  );
}

export default Award;

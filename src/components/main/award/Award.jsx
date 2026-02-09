import { useEffect, useRef, useState } from 'react';

import { getAwardList } from '@/api/projectApi';
import awardBlahIcon from '@/assets/icons/main/award/winner-blah.svg';
import Award3Image from '@/assets/images/artium.png';
import Award4Image from '@/assets/images/danchu.png';
import Award2Image from '@/assets/images/livfit.png';
import Award1Image from '@/assets/images/pickle.png';
import Award5Image from '@/assets/images/setbang.png';
import Award6Image from '@/assets/images/setbang.png';
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

  const [awardCards, setAwardCards] = useState(dummyAwardCards);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // 중복 호출 방지
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchAwardCards = async () => {
      try {
        // 수상작 목록 조회
        const response = await getAwardList();

        if (response?.data && Array.isArray(response.data)) {
          // API 응답을 카드 형식으로 변환
          const cards = response.data.map((item) => ({
            image: item.thumbnailUrl || item.imageUrl || Award1Image,
            hasDragButton: item.hasDragButton || false,
            to: '/project/viewDetail',
            projectId: item.id, // getProjectDetail에 사용할 projectId
            title: item.title,
          }));

          // 수상작이 있으면 API 데이터 사용, 없으면 더미 데이터 유지
          if (cards.length > 0) {
            setAwardCards(cards);
          }
        }
      } catch (error) {
        console.error('수상작 카드 데이터 로드 실패:', error);
        // 에러 발생 시 더미 데이터 유지
        hasFetchedRef.current = false; // 에러 시 재시도 가능하도록
      }
    };

    fetchAwardCards();
  }, []);

  return (
    <MainSectionLayout
      title="역대 수상작"
      showTopBorder={false}
      paddingScale={isMobile480 ? 0.6 : 0.25}
      paddingBottomScale={isMobile480 ? 5 : 1}
      frameTopOffset={isMobile480 ? -80 : null}
      backgroundStyle={{
        isolation: 'isolate',
        zIndex: 10,
      }}
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
                position: 'relative',
                marginTop: `${(10 / 16) * scale}rem`,
                marginBottom: `${(20 / 16) * scale}rem`,
                transform: `translateX(${(120 / 16) * scale}rem)`,
                maxWidth: '100%',
                zIndex: 100,
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
                position: 'absolute',
                right: `${(-70 / 16) * scale}rem`,
                top: `${(-160 / 16) * scale}rem`,
                zIndex: 100,
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

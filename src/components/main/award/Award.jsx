import { useCallback, useEffect, useRef, useState } from 'react';

import { getAwardList } from '@/api/projectApi';
import awardBlahIcon from '@/assets/icons/main/award/winner-blah.svg';
import Award1Image from '@/assets/images/pickle.png';
import useScale from '@/components/main/hooks/useScale';
import MainSectionLayout from '@/components/main/layout';
import useMediaQuery from '@/hooks/useMediaQuery';

import AwardButton from './AwardButton';
import AwardCardList from './AwardCardList';
import AwardText from './AwardText';

function Award() {
  const scale = useScale();
  const isMobile480 = useMediaQuery('(max-width: 480px)');
  const isMobile760 = useMediaQuery('(max-width: 760px)');

  const [awardCards, setAwardCards] = useState([]);
  const [lastCursor, setLastCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null); // 오른쪽 끝을 감지할 요소의 참조

  const fetchAwardCards = useCallback(
    async (isInitial = false) => {
      if (loading || (!isInitial && !hasNext)) return;

      setLoading(true);
      try {
        const response = await getAwardList(isInitial ? null : lastCursor, 10);
        console.log('API 응답 전체:', response);

        // API 응답 구조 확인: response.content 또는 response.data.content 또는 response.data
        const awardList = response?.content || response?.data?.content || response?.data || [];
        console.log('수상작 목록:', awardList);

        if (Array.isArray(awardList) && awardList.length > 0) {
          const cards = awardList
            .filter((item) => {
              const hasProjectId = !!item.projectId;
              if (!hasProjectId) {
                console.warn('projectId가 없는 항목:', item);
              }
              return hasProjectId;
            })
            .map((item) => {
              const imageUrl = item.thumbnailUrl || item.imageUrl;
              console.log(`프로젝트 ${item.projectId} 이미지 URL:`, imageUrl);

              return {
                image: imageUrl || Award1Image,
                hasDragButton: item.hasDragButton || false,
                to: '/project/viewDetail',
                projectId: item.projectId,
                title: item.title || '',
              };
            });

          // 초기화 로드면 새로 갈아끼우고, 추가 로드면 기존 뒤에 붙임
          if (isInitial) {
            setAwardCards(cards);
          } else {
            setAwardCards((prev) => [...prev, ...cards]);
          }

          // 상태 업데이트
          setLastCursor(response?.lastCursor || null);
          setHasNext(response?.hasNext !== false);
        } else {
          setHasNext(false);
        }
      } catch (error) {
        console.error('수상작 카드 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    },
    [lastCursor, hasNext, loading]
  );

  useEffect(() => {
    fetchAwardCards(true); // 초기화 모드로 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasNext || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchAwardCards(false); // 오른쪽 끝에 닿으면 추가 로드 호출
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNext, loading, fetchAwardCards]);

  return (
    <MainSectionLayout
      title="역대 수상작"
      showTopBorder={false}
      paddingScale={isMobile480 ? 0.6 : 0.25}
      paddingBottomScale={isMobile480 ? 5 : 1}
      frameTopOffset={isMobile480 ? -80 : -85}
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
              <AwardCardList cards={awardCards} observerRef={observerRef} loading={loading} />
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
                top: `${(-150 / 16) * scale}rem`,
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
                left: `${(150 / 16) * scale}rem`,
                top: `${(-70 / 16) * scale}rem`,
                width: `${(159 / 16) * scale * (isMobile760 ? 1.2 : 1)}rem`,
                height: 'auto',
                zIndex: 30,
              }}
            />
            {/* 카드만 아래로 내리기 */}
            <div style={{ paddingTop: `${(60 / 16) * scale}rem` }}>
              <AwardCardList cards={awardCards} observerRef={observerRef} loading={loading} />
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

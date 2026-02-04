import { useCallback, useEffect, useRef, useState } from 'react';

import { getSemester } from '@/api/semesterApi';
import { getClubMember } from '@/api/userApi';
import BackgroundImg1 from '@/assets/images/member_background1.svg';
import BackgroundImg2 from '@/assets/images/member_background2.svg';
import BackgroundImg3 from '@/assets/images/member_background3.svg';
import MemberOption from '@/components/Member/MemberOption';
import MemberSection from '@/components/Member/MemberSection';
import TitleSection from '@/components/common/TitleSection';

export default function Member() {
  const [semesters, setSemesters] = useState([]);
  const [selectSemester, setSelectSemester] = useState('');
  const [members, setMembers] = useState([]);
  const [cursor, setCursor] = useState({ position: 'LEAD', track: null });
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null); // 바닥을 감지할 요소의 참조
  useEffect(() => {
    const getSemesterData = async () => {
      try {
        const data = await getSemester();
        setSemesters(data);
        if (data.length > 0) setSelectSemester(`${data[0]}기`);
      } catch (error) {
        console.log('기수 데이터 조회 실패:', error);
      }
    };
    getSemesterData();
  }, []);

  const fetchMembers = useCallback(
    async (isInitial = false) => {
      if (loading || (!isInitial && !hasNext)) return;

      setLoading(true);
      try {
        // "14기"에서 숫자 14만 추출 (API가 integer를 요구하므로)
        const semesterNum = parseInt(selectSemester);

        const res = await getClubMember(semesterNum, {
          'next-position-cursor': isInitial ? 'LEAD' : cursor.position,
          'next-track-cursor': isInitial ? null : cursor.track,
        });

        // 초기화 로드면 새로 갈아끼우고, 추가 로드면 기존 뒤에 붙임
        setMembers((prev) => (isInitial ? res.content : [...prev, ...res.content]));

        // 상태 업데이트
        setCursor({
          position: res.nextPositionCursor,
          track: res.nextTrackCursor,
        });
        setHasNext(res.hasNext);
      } catch (error) {
        console.error('멤버 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    },
    [selectSemester, cursor, hasNext, loading]
  );

  useEffect(() => {
    fetchMembers(true); // true 인자를 주어 초기화 모드로 실행
  }, [selectSemester]);

  useEffect(() => {
    if (!hasNext || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMembers(false); // 바닥에 닿으면 추가 로드 호출
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchMembers, hasNext, loading]);

  return (
    <div className="flex flex-col py-14 px-5 pad:px-7  web:px-14 relative mb-70">
      <TitleSection
        title="구성원"
        pageExplanation="서경대학교 멋쟁이사자처럼의 구성원들을 살펴보세요."
        onSearch={false}
      >
        <MemberOption
          optionData={semesters}
          selectedOption={selectSemester}
          setSelectedOption={setSelectSemester}
        />
      </TitleSection>
      <div className="flex flex-col gap-32 pad:pl-3.25 web:pl-7 pt-20">
        <MemberSection title="운영진" data={members.filter((m) => m.position !== 'BABYLION')} />
        <MemberSection title="아기사자" data={members.filter((m) => m.position === 'BABYLION')} />
      </div>

      <div ref={observerRef} className="h-10 w-full flex justify-center items-center">
        {loading && <div className="animate-spin">🌀</div>}
      </div>
      <img src={BackgroundImg1} className="absolute w-191 left-auto right-0 -z-1" />
      <img src={BackgroundImg2} className="absolute w-191 top-400 left-0 -z-1" />
      <img src={BackgroundImg3} className="absolute w-191 top-1000 left-50 -z-1" />
    </div>
  );
}

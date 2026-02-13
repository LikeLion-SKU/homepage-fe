import { useEffect, useRef, useState } from 'react';

import { getProjectType } from '@/api/projectApi';
import OptionBox from '@/components/common/Option/optionBox';
import { useIsPhone } from '@/hooks/useIsPhone';
import useSemesterListStore from '@/store/useSemesterListStore';

export default function ProjectOption({ handleSemester, handleProjectType, initValue }) {
  const [semesters, setSemesters] = useState([]);
  const [projectTypeName, setProjectTypeName] = useState([]);
  const [projectTypeMap, setProjectTypeMap] = useState({}); // 이름으로 ID를 찾기 위한 객체
  const [selectProjectType, setSelectProjectType] = useState('전체');
  const [selectSemester, setSelectSemester] = useState(initValue.semester);
  const lastSentProjectType = useRef('전체');
  const lastSentSemester = useRef(null);
  const isPhone = useIsPhone();
  let isMountProject = useRef(false);
  let isMountSemester = useRef(false);
  const scrollRef = useRef(null);
  const { semesterData } = useSemesterListStore();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheelAction = (e) => {
      // 세로 스크롤이 발생할 때만 가로로 전환하고 기본 동작 방지
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    // passive: false로 설정해야 preventDefault가 작동함
    el.addEventListener('wheel', onWheelAction, { passive: false });
    return () => el.removeEventListener('wheel', onWheelAction);
  }, [projectTypeName]); // 데이터가 로드되어 영역이 생길 때 다시 등록

  useEffect(() => {
    const getProjectTypeData = async () => {
      try {
        const projectTypeData = await getProjectType(); // 1. API 데이터 수신
        setProjectTypeName(['전체', ...projectTypeData.map((item) => item.projectTypeName)]);

        const mapping = {}; // 이름 -> ID
        const reverseMapping = {}; // ID -> 이름 (유지용)

        projectTypeData.forEach((item) => {
          mapping[item.projectTypeName] = item.projectTypeId;
          reverseMapping[item.projectTypeId] = item.projectTypeName;
        });

        // 2. 상태 업데이트 (다음 렌더링에 반영됨)
        setProjectTypeMap(mapping);

        // 3. [중요] 상태 변수(projectTypeMap) 대신 로컬 변수(reverseMapping)로 즉시 찾기
        if (initValue.projectTypeId) {
          const savedName = reverseMapping[initValue.projectTypeId] || '전체';
          setSelectProjectType(savedName); // UI 텍스트 업데이트
          lastSentProjectType.current = savedName; // 마운트 시 중복 요청 방지
        }
      } catch (error) {
        console.log('옵션 데이터 조회 실패:', error);
      }
    };
    getProjectTypeData();
  }, [initValue.projectTypeId]); // initValue가 들어오는 시점에 재실행

  useEffect(() => {
    const getSemesterData = async () => {
      try {
        const semesterList = ['전체', ...semesterData];
        setSemesters(semesterList);
        if (initValue.semester) {
          setSelectSemester(initValue.semester === '전체' ? '전체' : `${initValue.semester}기`);
          lastSentSemester.current =
            initValue.semester === '전체' ? '전체' : `${initValue.semester}기`;
        }
      } catch (error) {
        console.log('옵션 데이터 조회 실패:', error);
      }
    };
    getSemesterData();
  }, [semesterData]);

  useEffect(() => {
    //대회명 선택시 실행
    if (!isMountProject.current) {
      isMountProject.current = true; // 마운트 되었다고 표시
      return; // 함수 종료 (handleProjectType 실행 안 함)
    }
    if (lastSentProjectType.current === selectProjectType) return;
    const id = selectProjectType === '전체' ? 0 : projectTypeMap[selectProjectType];
    handleProjectType(id);
    lastSentProjectType.current = selectProjectType;
  }, [selectProjectType]);

  useEffect(() => {
    // 1. 값이 없거나 초기 로딩 중일 때 방어 로직
    if (!selectSemester || semesters.length === 0) return;

    // 2. 초기 마운트 시점 처리
    if (!isMountSemester.current) {
      isMountSemester.current = true;

      lastSentSemester.current = selectSemester;
      return;
    }
    // 3. 중복 전송 방지 (동일한 값을 클릭했을 때)
    if (lastSentSemester.current === selectSemester) return;
    // 4. 부모(Store)에게 변경 알림
    if (selectSemester === '전체') {
      handleSemester(0);
    } else {
      // '12기' -> 12 (숫자만 추출)
      const semesterNumber = selectSemester.replace(/[^0-9]/g, '');
      handleSemester(Number(semesterNumber));
    }
    // 5. 마지막으로 보낸 값 기록
    lastSentSemester.current = selectSemester;
  }, [selectSemester, semesters.length]);

  return (
    <div className="flex  h-20 items-center gap-2 pad:gap-15">
      <OptionBox
        initValue="기수별"
        optionData={semesters}
        bgColor="#F8FBE7"
        selectedNum={selectSemester}
        setSelectedNum={setSelectSemester}
      />
      {isPhone ? (
        <OptionBox
          initValue="대회별"
          optionData={projectTypeName}
          bgColor="#F8FBE7"
          selectedNum={selectProjectType}
          setSelectedNum={setSelectProjectType}
        />
      ) : (
        <div
          ref={scrollRef}
          className="flex flex-1 min-w-0 h-10 text-[1rem] pad:gap-5 items-center overflow-x-auto no-scrollbar border-r"
        >
          {projectTypeName.map((name) => (
            <div
              key={name}
              onClick={() => setSelectProjectType(name)}
              className={`text-[0.7rem] pad:text-[1rem] px-5 h-10 items-center flex shrink-0 ${selectProjectType == name ? 'font-bold' : 'font-medium'}`}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

import { getProjectType } from '@/api/projectApi';
import { getSemester } from '@/api/semesterApi';
import OptionBox from '@/components/common/Option/optionBox';
import { useIsPhone } from '@/hooks/useIsPhone';

export default function ProjectOption({ handleSemester, handleProjectType }) {
  const [semesters, setSemesters] = useState([]);
  const [projectTypeName, setProjectTypeName] = useState([]);
  const [projectTypeMap, setProjectTypeMap] = useState({}); // 이름으로 ID를 찾기 위한 객체
  const [selectProjectType, setSelectProjectType] = useState('전체');
  const [selectSemester, setSelectSemester] = useState(null);
  const lastSentProjectType = useRef('전체');
  const lastSentSemester = useRef(null);
  const isPhone = useIsPhone();
  let isMountProject = useRef(false);
  let isMountSemester = useRef(false);

  useEffect(() => {
    const getOptionData = async () => {
      try {
        const semesterData = ['전체', ...(await getSemester())];
        setSemesters(semesterData);

        const projectTypeData = await getProjectType();
        setProjectTypeName(['전체', ...projectTypeData.map((item) => item.projectTypeName)]);
        const mapping = {};
        projectTypeData.forEach((item) => {
          mapping[item.projectTypeName] = item.projectTypeId;
        });
        setProjectTypeMap(mapping);
      } catch (error) {
        console.log('옵션 데이터 조회 실패:', error);
      }
    };
    getOptionData();
  }, []);

  useEffect(() => {
    //대회명 선택시 실행
    if (!isMountProject.current) {
      isMountProject.current = true; // 마운트 되었다고 표시
      return; // 함수 종료 (handleProjectType 실행 안 함)
    }
    if (lastSentProjectType.current === selectProjectType) return;
    if (selectProjectType === '전체') {
      handleProjectType(0);
    } else {
      handleProjectType(projectTypeMap[selectProjectType]);
    }
    lastSentProjectType.current = selectProjectType;
  }, [selectProjectType]);

  useEffect(() => {
    //기수 선택시 실행
    if (!isMountSemester.current) {
      isMountSemester.current = true; // 마운트 되었다고 표시
      return; // 함수 종료 (handleProjectType 실행 안 함)
    }
    if (lastSentSemester.current === selectSemester || !selectSemester) return;
    if (selectSemester === '전체') {
      handleSemester(0);
    } else {
      const semesterNumber = selectSemester.replace(/[^0-9]/g, '');
      handleSemester(Number(semesterNumber));
    }
    lastSentSemester.current = selectSemester;
  }, [selectSemester]);

  return (
    <div className="flex  h-20 items-center gap-2 pad:gap-15">
      <OptionBox
        initValue="기수별"
        optionData={semesters}
        bgColor="#E9E9E9"
        selectedNum={selectSemester}
        setSelectedNum={setSelectSemester}
      />
      {isPhone ? (
        <OptionBox
          initValue="대회별"
          optionData={projectTypeName}
          bgColor="#E9E9E9"
          selectedNum={selectProjectType}
          setSelectedNum={setSelectProjectType}
        />
      ) : (
        <div className="flex flex-1 min-w-0 h-10 text-[1rem] pad:gap-5 items-center overflow-x-auto no-scrollbar border-r">
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

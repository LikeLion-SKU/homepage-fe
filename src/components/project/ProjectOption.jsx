import { useEffect, useState } from 'react';

import { getProjectType } from '@/api/projectApi';
import { getSemester } from '@/api/semesterApi';
import OptionBox from '@/components/common/Option/optionBox';
import { useIsPhone } from '@/hooks/useIsPhone';

export default function ProjectOption() {
  const [semesters, setSemesters] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [selectMenu, setSelectMenu] = useState('전체');
  const isPhone = useIsPhone();
  useEffect(() => {
    const getOptionData = async () => {
      try {
        setSemesters(await getSemester());
        setProjectTypes(await getProjectType());
      } catch (error) {
        console.log('옵션 데이터 조회 실패:', error);
      }
    };
    getOptionData();
  }, []);

  return (
    <div className="flex  h-20 items-center gap-2 pad:gap-15">
      <OptionBox initValue="기수별" optionData={semesters} bgColor="#E9E9E9" />
      {isPhone ? (
        <OptionBox initValue="대회별" optionData={projectTypes} bgColor="#E9E9E9" />
      ) : (
        <div className="flex flex-1 min-w-0 h-10 text-[1rem] pad:gap-5 items-center overflow-x-auto no-scrollbar border-r">
          {projectTypes.map((name) => (
            <div
              key={name}
              onClick={() => setSelectMenu(name)}
              className={`text-[0.7rem] pad:text-[1rem] px-5 h-10 items-center flex shrink-0 ${selectMenu == name ? 'font-bold' : 'font-medium'}`}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import { getProjectType, postProjectType } from '@/api/projectApi';
import { getSemester, postSemester } from '@/api/semesterApi';
import OptionAdminTable from '@/components/admin/Option/OptionAdminTable';
import OptionTitle from '@/components/admin/Option/OptionTitle';

export default function AdminOption() {
  const [semester, setSemester] = useState([]);
  const [projectType, setProjectType] = useState([
    '중앙해커톤',
    '아이디어톤',
    '4호선톤',
    '트렌디톤',
    'SKTHON',
  ]);
  //@ts-ignore
  const { openModal, showToast } = useOutletContext();
  const saveOption = () => {
    //저장 api 추가 예정
    postProjectType();
    postSemester();
    showToast('저장되었습니다!');
  };
  useEffect(() => {
    const getOption = async () => {
      setSemester(await getSemester());
      const projectTypeData = await getProjectType();
      setProjectType([...projectTypeData.map((item) => item.projectTypeName)]);
    };
    getOption();
  }, []);
  return (
    <div className="flex flex-col gap-20 px-21 py-30">
      <OptionTitle />
      <div className="flex gap-4 mt-10">
        <OptionAdminTable title="기수" optionData={semester} setOptionData={setSemester} />
        <OptionAdminTable title="대회명" optionData={projectType} setOptionData={setProjectType} />
      </div>
      <button
        onClick={() => openModal('저장하시겠습니까?', () => saveOption())}
        className="w-43 h-12 border text-center items-center bg-[#D9D9D9] mx-auto"
      >
        저장하기
      </button>
    </div>
  );
}

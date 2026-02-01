import { useState } from 'react';
import { useOutletContext } from 'react-router';

import OptionAdminTable from '@/components/admin/Option/OptionAdminTable';
import OptionTitle from '@/components/admin/Option/OptionTitle';

export default function AdminOption() {
  const [ordinalData, setOrdinalData] = useState(['14기', '13기', '12기', '11기']);
  const [contestData, setContestData] = useState([
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
    showToast('저장되었습니다!');
  };
  return (
    <div className="flex flex-col gap-20 px-21 py-30">
      <OptionTitle />
      <div className="flex gap-4 mt-10">
        <OptionAdminTable title="기수" optionData={ordinalData} setOptionData={setOrdinalData} />
        <OptionAdminTable title="대회명" optionData={contestData} setOptionData={setContestData} />
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

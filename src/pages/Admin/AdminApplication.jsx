import { useState } from 'react';

import AdminApplicationTitle from '@/components/admin/Application/AdminApplicationTitle';
import AdminMember from '@/components/admin/User/AdminMember';
import ButtonGroup from '@/components/admin/User/ButtonGroup';

export default function AdminApplication() {
  const propsData = {
    title: '지원서/지원자 관리',
    explain: '지원서 / 지원자 관리 페이지입니다.',
    rule: [
      '1. 지원서 합불 입력 시 면접 합불 선택 가능',
      '2. 지원서 삭제 가능',
      '3. 필터 및 검색으로 찾기 가능',
    ],
    button: (
      <button
        onClick={() => {}}
        className="flex w-40 h-10 justify-center items-center text-[1rem] border bg-white hover:bg-stone-50 transition-all px-"
      >
        지원서 추가&수정
      </button>
    ),
  };

  const semesterData = ['14기', '13기', '12기', '11기'];
  const trackData = ['PO', 'PM', 'Design', 'Frontend', 'Backend'];

  const [isNumber, setIsNumber] = useState(true);
  const [isTrack, setIsTrack] = useState(true);

  return (
    <div className="relative flex flex-col p-21 gap-14">
      <AdminApplicationTitle props={propsData}>
        <div className="flex flex-col gap-5">
          <>
            <ButtonGroup buttonData={semesterData} isCheck={isNumber} setIsCheck={setIsNumber} />
            <ButtonGroup buttonData={trackData} isCheck={isTrack} setIsCheck={setIsTrack} />
          </>
        </div>
      </AdminApplicationTitle>
      <div className="flex border-t">
        <AdminMember />
      </div>
    </div>
  );
}

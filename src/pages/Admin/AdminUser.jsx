import { useState } from 'react';

import AdminTitleSection from '@/components/admin/AdminTitleSection';
import AdminMember from '@/components/admin/User/AdminMember';
import AdminUserMember from '@/components/admin/User/AdminUserMember';
import ButtonGroup from '@/components/admin/User/ButtonGroup';

export default function AdminUser() {
  const propsData = {
    title: '사용자 관리',
    explain: '게스트에게 구성원 권한을 부여하거나 구성원을 게스트 권한으로 변경하는 페이지입니다.',
    rule: [
      '1. 권한 변경하고 싶은 게스트 / 구성원 선택',
      '2. 구성원이동 / 게스트 이동 클릭',
      '3. 권한 변경 완료',
    ],
  };
  const propsData2 = {
    title: '사용자 관리',
    explain: '게스트에게 구성원 권한을 부여하거나 구성원을 게스트 권한으로 변경하는 페이지입니다.',
    rule: [],
  };
  const buttonData = ['14기', '13기', '12기', '11기'];

  const [isUser, setIsUser] = useState(true);
  const [isNumber, setIsNumber] = useState(true);
  const [isTrack, setIsTrack] = useState(true);
  const [isRole, setIsRole] = useState(true);

  return (
    <div className="relative flex flex-col p-21 gap-14">
      <div className="absolute left-70 top-23 flex gap-3">
        <div
          onClick={() => setIsUser(true)}
          className={`flex w-30 h-10 justify-center items-center text-[1rem] border ${isUser ? 'bg-[#CBCBCB]' : 'bg-white'}`}
        >
          게스트 관리
        </div>
        <div
          onClick={() => setIsUser(false)}
          className={`flex w-30 h-10 justify-center items-center text-[1rem] border ${isUser ? 'bg-white' : 'bg-[#CBCBCB]'}`}
        >
          구성원 관리
        </div>
      </div>
      <AdminTitleSection props={isUser ? propsData : propsData2}>
        <div className="flex flex-col gap-5">
          {!isUser && (
            <>
              <ButtonGroup buttonData={buttonData} isCheck={isNumber} setIsCheck={setIsNumber} />
              <ButtonGroup buttonData={buttonData} isCheck={isTrack} setIsCheck={setIsTrack} />
              <ButtonGroup buttonData={buttonData} isCheck={isRole} setIsCheck={setIsRole} />
            </>
          )}
        </div>
      </AdminTitleSection>
      <div className="flex border-t">{isUser ? <AdminUserMember /> : <AdminMember />}</div>
    </div>
  );
}

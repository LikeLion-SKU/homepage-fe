import { useState } from 'react';

import UserTable from '@/components/admin/User/UserTable';

export default function AdminUserMember() {
  const optionData = ['이름', '학과', '학번'];
  const [guestData, setGuestData] = useState([
    { name: '홍길동1', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '홍길동2', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '홍길동3', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '홍길동4', major: '컴퓨터공학과', stdNum: '20220000' },
  ]);
  const [memberData, setMemberData] = useState([
    { name: '정목진1', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '정목진2', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '정목진3', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '정목진4', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '정목진5', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '정목진6', major: '컴퓨터공학과', stdNum: '20220000' },
  ]);
  return (
    <div className="flex ">
      <div className="flex flex-col gap-12 py-15 bg-[#F8F8F8] w-158 px-8.5">
        <p className="text-[1.4rem] font-bold">게스트 정보</p>
        <UserTable
          option={optionData}
          cardData={guestData}
          setCardData={setGuestData}
          setOtherData={setMemberData}
        />
      </div>
      <div className="flex flex-col gap-12 py-15 w-158 px-8.5">
        <p className="text-[1.4rem] font-bold">구성원 정보</p>
        <UserTable
          option={optionData}
          cardData={memberData}
          setCardData={setMemberData}
          setOtherData={setGuestData}
          onDelete={false}
        />
      </div>
    </div>
  );
}

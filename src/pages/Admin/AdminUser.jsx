import { useState } from 'react';

//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import AdminTitleSection from '@/components/admin/AdminTitleSection';
import AdminUserMember from '@/components/admin/AdminUserMember';
import Table from '@/components/admin/Table';

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

  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex flex-col p-21 gap-14">
      <AdminTitleSection props={propsData}>
        <div className="flex gap-3">
          <div
            onClick={() => setIsSelected(true)}
            className={`flex w-30 h-10 justify-center items-center text-[1rem] border ${isSelected ? 'bg-[#CBCBCB]' : 'bg-white'}`}
          >
            게스트 관리
          </div>
          <div
            onClick={() => setIsSelected(false)}
            className={`flex w-30 h-10 justify-center items-center text-[1rem] border ${isSelected ? 'bg-white' : 'bg-[#CBCBCB]'}`}
          >
            구성원 관리
          </div>
        </div>
      </AdminTitleSection>
      <div className="flex border-t">
        <AdminUserMember />
      </div>
    </div>
  );
}

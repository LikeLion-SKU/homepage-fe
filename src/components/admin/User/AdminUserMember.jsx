import UserTable from '@/components/admin/User/UserTable';

export default function AdminUserMember() {
  const optionData = ['이름', '학과', '학번'];
  const cardData = [
    { name: '홍길동', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '홍길동', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '홍길동', major: '컴퓨터공학과', stdNum: '20220000' },
    { name: '홍길동', major: '컴퓨터공학과', stdNum: '20220000' },
  ];
  return (
    <div className="flex ">
      <div className="flex flex-col justify-center gap-12 py-15 bg-[#F8F8F8] w-158 px-8.5">
        <p className="text-[1.4rem] font-bold">게스트 정보</p>
        <UserTable option={optionData} cardData={cardData} />
      </div>
      <div className="flex flex-col justify-center gap-12 py-15 w-158 px-8.5">
        <p className="text-[1.4rem] font-bold">구성원 정보</p>
        <UserTable option={optionData} cardData={cardData} />
      </div>
    </div>
  );
}

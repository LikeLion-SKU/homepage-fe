import UserTable from '@/components/admin/User/UserTable';

export default function AdminUserMember({ guestData, memberData, setIsGetGuest, setTrigger }) {
  const optionData = ['이름', '학과', '학번'];
  return (
    <div className="flex ">
      <div className="flex flex-col gap-12 py-15 bg-[#F8F8F8] w-158 px-8.5">
        <p className="text-[1.4rem] font-bold">게스트 정보</p>
        <UserTable
          option={optionData}
          cardData={guestData}
          setIsGetGuest={(is) => setIsGetGuest((prev) => [is, prev[1]])}
          setTrigger={setTrigger}
        />
      </div>
      <div className="flex flex-col gap-12 py-15 w-158 px-8.5 bg-white">
        <p className="text-[1.4rem] font-bold">구성원 정보</p>
        <UserTable
          option={optionData}
          cardData={memberData}
          onDelete={false}
          setIsGetGuest={(is) => setIsGetGuest((prev) => [prev[0], is])}
          setTrigger={setTrigger}
        />
      </div>
    </div>
  );
}

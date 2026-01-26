import AdminTitleSection from '@/components/admin/AdminTitleSection';
import DateAdminSection from '@/components/admin/Interview/DateAdminSection';

export default function AdminInterview() {
  const titleData = {
    title: '면접 일정 관리',
    explain: `면접 일정 등록에서 면접 일정을 등록&삭제하고
    면접 일정 관리에서 등록된 면접 일정을 확인할 수 있습니다.`,
    rule: ['1. 해당 파트에 면접 일자 작성 및 엔터', '2. 날짜 등록 완료', '3. 삭제 버튼으로 삭제'],
  };
  return (
    <div className="flex flex-col px-21.5 py-29 gap-13">
      <AdminTitleSection props={titleData} />
      <DateAdminSection />
    </div>
  );
}

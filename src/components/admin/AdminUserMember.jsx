import AdminTable from '@/components/admin/AdminTable';

export default function AdminUserMember() {
  return (
    <div className="flex ">
      <AdminTable title="게스트 정보" bgColor="#F8F8F8" />
      <AdminTable title="구성원 정보" />
    </div>
  );
}

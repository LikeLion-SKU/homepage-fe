import { useLocation } from 'react-router';

import PasswordResultForm from '@/components/passwordFind/PasswordResultForm';

export default function PasswordResult() {
  const location = useLocation();
  const email = location.state?.email || '';
  const tempPassword = location.state?.tempPassword || '';

  return (
    <div
      className="flex flex-col items-center justify-center px-4 flex-1"
      style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: 0, overflow: 'hidden' }}
    >
      <PasswordResultForm email={email} tempPassword={tempPassword} />
    </div>
  );
}

import { useNavigate } from 'react-router';

import RedirectButton from '@/components/common/Button/RedirectButton';
import StatusMessage from '@/components/common/StatusMessage';
import GridSection from '@/components/layout/background/GridSection';

export default function Error401() {
  const title = 'ERROR 401';
  const content = '인증이 필요합니다.\n로그인 후 다시 시도해 주세요.';
  const buttonName = '로그인 하러 가기';
  const navigate = useNavigate();
  return (
    <GridSection>
      <div className="flex flex-col min-h-screen justify-center items-center gap-16">
        <StatusMessage title={title} content={content}></StatusMessage>
        <RedirectButton buttonName={buttonName} onClick={() => navigate('/login')}></RedirectButton>
      </div>
    </GridSection>
  );
}

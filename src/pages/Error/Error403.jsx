import { useNavigate } from 'react-router';

import RedirectButton from '@/components/common/Button/RedirectButton';
import StatusMessage from '@/components/common/StatusMessage';
import GridSection from '@/components/layout/background/GridSection';

export default function Error403() {
  const title = '403 ERROR';
  const content =
    '접근 권한이 없습니다.\n해당 페이지를 이용할 수 없습니다.\n이용에 불편을 드려 죄송합니다.';
  const buttonName = '홈으로 돌아가기';
  const navigate = useNavigate();
  return (
    <GridSection>
      <div className="flex flex-col min-h-screen justify-center items-center gap-16">
        <StatusMessage title={title} content={content}></StatusMessage>
        <RedirectButton buttonName={buttonName} onClick={() => navigate('/')}></RedirectButton>
      </div>
    </GridSection>
  );
}

import { useNavigate } from 'react-router';

import GridSection from '@/components/background/GridSection';
import RedirectButton from '@/components/common/Button/RedirectButton';
import StatusMessage from '@/components/common/StatusMessage';

export default function ServerError() {
  const title = '요청하신 작업을 수행하지 못했습니다.';
  const content = '서버에 오류가 발생했습니다.\n이용에 불편을 드려 죄송합니다.';
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

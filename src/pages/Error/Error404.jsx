import { useNavigate } from 'react-router';

import RedirectButton from '@/components/common/Button/RedirectButton';
import StatusMessage from '@/components/common/StatusMessage';
import GridSection from '@/components/layout/background/GridSection';

export default function Error404() {
  const title = '404 ERROR';
  const content =
    '페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.\n입력하신 주소가 정확한지 다시 한 번 확인해주세요. ';
  const buttonName = '이전페이지로 돌아가기';
  const navigate = useNavigate();
  return (
    <GridSection>
      <div className="flex flex-col min-h-screen justify-center items-center gap-16">
        <StatusMessage title={title} content={content}></StatusMessage>
        <RedirectButton buttonName={buttonName} onClick={() => navigate(-1)}></RedirectButton>
      </div>
    </GridSection>
  );
}

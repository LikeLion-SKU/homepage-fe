import { useNavigate } from 'react-router';

import GridSection from '@/components/background/GridSection';
import RedirectButton from '@/components/common/Button/RedirectButton';
import StatusMessage from '@/components/common/StatusMessage';

export default function LoginRequired() {
  const title = '로그인이 필요한 서비스입니다.';
  const content = '로그인 후 이용해주세요.\n이용에 불편을 드려 죄송합니다.';
  const buttonName = '로그인 하러가기';
  const navigate = useNavigate();
  return (
    <GridSection>
      <div className="flex flex-col min-h-screen justify-center items-center gap-16">
        <StatusMessage title={title} content={content}></StatusMessage>
        <RedirectButton buttonName={buttonName} onClick={navigate('/login')}></RedirectButton>
      </div>
    </GridSection>
  );
}

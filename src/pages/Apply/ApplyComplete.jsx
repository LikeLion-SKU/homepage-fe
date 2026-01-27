import { useNavigate } from 'react-router';

import RedirectButton from '@/components/common/Button/RedirectButton';
import StatusMessage from '@/components/common/StatusMessage';
import GridSection from '@/components/layout/background/GridSection';

export default function ApplyComplete() {
  const title = '지원서를 제출하셨습니다!';
  const content =
    '지원해주셔서 감사합니다.\n설문지는 한번만 작성할 수 있습니다.\n함께 활동하기를 기대하겠습니다.';
  const buttonName = '내 지원서 보러가기';
  const navigate = useNavigate();
  return (
    <GridSection>
      <div className="flex flex-col min-h-screen justify-center items-center gap-16">
        <StatusMessage title={title} content={content}></StatusMessage>
        <RedirectButton
          buttonName={buttonName}
          onClick={() => navigate('/application')}
        ></RedirectButton>
      </div>
    </GridSection>
  );
}

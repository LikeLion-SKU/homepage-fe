import { useNavigate } from 'react-router';

import PageTitle from '@/components/common/PageTitle';
import CheckButton from '@/components/result/CheckButton';

export default function InterviewNotice() {
  const navigate = useNavigate();
  const notPass = `안녕하세요. IT동아리 멋쟁이사자처럼 운영진입니다.
        먼저 저희 동아리에 지원해주셔서 감사합니다.
        14기 면접 결과 불합격이라는 소식을 전해드립니다.
        많은 지원자로 인해 면접자님의 뛰어난 역량에도 불구하고 한정된 인원 
        때문에 더 많은 부원들을 모시지 못하게 되어 송구스럽게 생각합니다.
        다음 모집에는 더 많은 분들과 함께 하기 위해 노력하겠습니다.
        다시 한번 소중한 시간을 내어 면접에 응해 주셔서
        진심으로 감사드립니다.
        지원자님의 정보는 한 달 이내로 일괄 삭제하겠습니다.`;
  return (
    <div className="flex flex-col justify-center items-center gap-9 pt-50">
      <PageTitle title="면접 결과 안내" width="290px" color="Navy" />
      <div className="flex w-186 h-90 justify-center items-center bg-[#F9F9F9] whitespace-pre-line text-center text-[1rem] px-27 py-15 drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]">
        {notPass}
      </div>
      <CheckButton buttonName="확인했어요" onClick={() => navigate('/')} />
    </div>
  );
}

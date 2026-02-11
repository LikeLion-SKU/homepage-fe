import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { patchDocumentResult, postInterviewResult } from '@/api/applicationResult';
//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';
import OptionBox from '@/components/common/Option/optionBox';

const TRACK_LABEL = {
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  PO: 'PO',
  PM: 'PM',
  DESIGN: '디자인',
  PM_DESIGN: 'PM & 디자인',
};

export default function ApplicantsTableCard({ index, cardData, cardCheckData }) {
  const navigate = useNavigate();
  const applicationOption = ['합격', '불합격'];
  const interviewOption = ['합격', '불합격'];
  const [applicationResult, setApplicationResult] = useState(null); // 서류 결과 상태 관리
  const [interviewResult, setInterviewResult] = useState(null); // 면접 결과 상태 관리

  const isChecked = cardCheckData.checkedList.includes(index);
  const isEditingThisCard = cardCheckData.isEdit === index;

  const handleToggle = () => {
    if (isChecked) {
      cardCheckData.setCheckedList(cardCheckData.checkedList.filter((item) => item !== index));
    } else {
      cardCheckData.setCheckedList((prev) => [...prev, index]);
    }
  };

  const getBgColor = () => {
    if (isEditingThisCard) {
      if (cardCheckData.isCopy === index) {
        return 'bg-[#DFEBB5]';
      }
      return 'bg-[#E7E7E7]';
    } else {
      return '';
    }
  };

  // 서류 합/불 표시값
  const docPassDisplay =
    cardData.isDocumentPassed === true
      ? '합격'
      : cardData.isDocumentPassed === false
        ? '불합격'
        : '선택';

  // 면접 합/불 표시값 -> 서류 결과 변경도 고려
  const interviewPassDisplay = useMemo(() => {
    if (applicationResult === '합격' || (applicationResult === null && cardData.isDocumentPassed)) {
      // 면접 결과가 이미 DB에 있으면 해당 값 표시
      if (cardData.isInterviewPassed === true) return '합격';
      if (cardData.isInterviewPassed === false) return '불합격';

      // 서류는 합격인데 면접 결과 데이터가 없으면 '선택' 표시
      return '선택';
    }
    return null;
  }, [applicationResult, cardData.isDocumentPassed, cardData.isInterviewPassed]);

  // 서류 결과 변경 시
  const handleDocumentResultChange = async (newResult) => {
    try {
      const response = await patchDocumentResult(cardData.applicationRecordId, newResult);
      setApplicationResult(newResult); // 화면 상의 서류 결과 상태 변경
      console.log('서류 결과 수정 성공');
      return response.data;
    } catch (error) {
      console.error('서류 결과 수정 실패', error);
    }
  };

  // 면접 결과 선택 시  -> 변경 X
  const handleInterviewResultChange = async (result) => {
    try {
      const response = await postInterviewResult(cardData.applicationRecordId, result);
      setInterviewResult(result); // 화면 상의 면접 결과 상태 관리
      console.log('면접 결과 수정 성공');
      return response.data;
    } catch (error) {
      console.error('면접 결과 수정 실패', error);
    }
  };

  return (
    <div
      className={`w-314 h-21 flex items-center pl-11 pr-5 text-[1.1rem] font-semibold gap-10 ${getBgColor()}`}
    >
      {isChecked ? (
        <Check onClick={() => handleToggle()} />
      ) : (
        <button onClick={() => handleToggle()} className="w-7 h-6.25 border-2" />
      )}
      <div className="flex w-full gap-15 items-center">
        <p className="mr-1 ml-5">{cardData.name}</p>
        <p>{cardData.department}</p>
        <p>{cardData.studentNumber}</p>
        <p className="ml-2 mr-7">{TRACK_LABEL[cardData.track] || cardData.track}</p>
        {/* 서류 결과 선택 */}
        <OptionBox
          initValue={docPassDisplay}
          optionData={applicationOption}
          selectedNum={applicationResult}
          setSelectedNum={handleDocumentResultChange}
        />
        {(applicationResult === '합격' ||
          (applicationResult === null && cardData.isDocumentPassed)) && (
          <OptionBox
            initValue={interviewPassDisplay}
            optionData={interviewOption}
            selectedNum={interviewResult}
            setSelectedNum={handleInterviewResultChange}
          />
        )}
        <button
          onClick={() =>
            navigate('/application', {
              state: { applicationRecordId: cardData.applicationRecordId },
            })
          }
          className="px-2 py-2 border ml-auto text-base"
        >
          지원서 보러가기
        </button>
      </div>
    </div>
  );
}

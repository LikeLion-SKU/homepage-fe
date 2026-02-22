import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/ConfirmModal';
import ApplyStep from '@/components/common/apply/ApplyStep';
import ApplyTitleSection from '@/components/common/apply/ApplyTitleSection';
import Input from '@/components/common/apply/Input';

export default function ApplyBasicInfo() {
  /** @type {any} */
  const { formData, _userInfoData, updateFormData } = useOutletContext();
  const navigate = useNavigate();
  const isTrackSelected = !!formData.track; // 트랙 데이터 존재 여부

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [pendingTrack, setPendingTrack] = useState(''); // 모달에서 확인/취소 버튼 눌렀을때 선택할 트랙 임시 상태 저장

  const parts = [
    { id: 'PO', name: 'PO' },
    { id: 'FRONTEND', name: '프론트엔드' },
    { id: 'BACKEND', name: '백엔드' },
  ];

  // 지원 트랙 새로 선택 시 formData 업데이트 로직
  const handleTrackSelect = (trackId) => {
    const currentTrack = formData.track;
    if (currentTrack === trackId) return;
    // 트랙을 변경 시 -> 모달
    if (currentTrack && currentTrack !== trackId) {
      setPendingTrack(trackId); // 바꿀 트랙 상태
      setIsModalOpen(true);
      return;
    }
    const nextFormData = {
      ...formData,
      track: trackId,
    };
    updateFormData(nextFormData);
  };

  // 모달에서 확인 눌렀을때 트랙 수정 함수
  const confirmTrackChange = () => {
    const nextFormData = {
      ...formData,
      track: pendingTrack, // 바꿀 트랙
    };
    updateFormData(nextFormData);
    setIsModalOpen(false);
  };

  // 다음 페이지 이동
  const handleNext = () => {
    const { name, department, studentNumber, phoneNumber, email, track } = formData;

    if (!name || !department || !studentNumber || !phoneNumber || !email || !track) {
      alert('모든 정보를 입력하고 트랙을 선택해주세요.');
      return;
    }
    navigate('/apply/common');
  };

  const getButtonStyle = (isSelected) => {
    const baseStyle =
      'h-12 w-full max-w-33 min-w-20 border py-2 text-lg font-semibold transition-all';
    // 선택 여부에 따른 버튼 색상
    const stateStyle = isSelected
      ? 'bg-button-green text-black'
      : 'bg-white text-black hover:bg-button-hover';
    return `${baseStyle} ${stateStyle}`;
  };

  // 트랙 선택 안될 시 다음단계 비활성
  const disabledStyle = `
    w-45 pad:w-47 web:w-53 h-11 pad:h-14 bg-expired-gray-button outline -outline-offset-1 outline-black 
    flex justify-center items-center 
    text-gray-800 text-lg font-semibold
    !drop-shadow-none !shadow-none
  `;
  // 트랙 선택 시 활성
  const buttonStyle = `
    w-45 pad:w-47 web:w-53 h-11 pad:h-14 bg-button-green outline -outline-offset-1 outline-black 
    flex justify-center items-center transition-all hover:bg-button-hover
  `;
  // 트랙 선택 여부에 따른 다음단계 버튼 스타일링
  const nextButtonStyle = isTrackSelected ? buttonStyle : disabledStyle;

  const inputStyle = `pad:w-full bg-white border border-black h-12 px-4 py-4 placeholder:font-medium`;

  return (
    <div className="pb-35">
      <div className="w-full flex flex-col pt-18 px-6 pad:px-15 web:px-45.5 gap-23">
        <div className="flex flex-col gap-20 pad:gap-31">
          <div className="flex flex-col gap-15 pad:gap-20">
            {/* 지원서 작성 페이지의 기본 정보 섹션 */}
            <ApplyTitleSection></ApplyTitleSection>
            {/* 지원서 작성 단계 부분 */}
            <div className="self-stretch inline-flex items-start gap-7">
              <ApplyStep
                step="STEP 1"
                stepName="기본 인적사항"
                lineStyle="self-stretch h-1 bg-button-green mb-5"
                stepStyle="self-stretch text-center text-button-green text-sm font-semibold pad:text-1xl pad:font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-button-green text-lg pad:text-2xl font-bold "
              ></ApplyStep>
              <ApplyStep
                step="STEP 2"
                stepName="공통 질문"
                lineStyle="self-stretch h-1 bg-navy-blue mb-5"
                stepStyle="self-stretch text-center text-navy-blue text-sm font-semibold pad:text-1xl pad:font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-navy-blue text-lg pad:text-2xl font-bold"
              ></ApplyStep>
              <ApplyStep
                step="STEP 3"
                stepName="트랙별 질문"
                lineStyle="self-stretch h-1 bg-navy-blue mb-5"
                stepStyle="self-stretch text-center text-navy-blue text-sm font-semibold pad:text-1xl pad:font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-navy-blue text-lg pad:text-2xl font-bold"
              ></ApplyStep>
            </div>
          </div>
          {/* 인적사항 기재 부분 */}
          <div>
            <div className="flex flex-col gap-4 pad:gap-10">
              <div className="self-stretch h-8 text-lg pad:text-2xl font-bold">인적사항</div>
              <div className="self-stretch web:min-h-103 pt-11 pb-13 items-center px-12 pad:px-17 web:px-25 border bg-button-gray">
                <div className="flex flex-col web:flex-row web:justify-between gap-x-5 gap-y-6">
                  {/* 왼쪽 이름, 학과, 학번 */}
                  <div className="web:flex-1 flex flex-col gap-6">
                    <Input
                      name="name"
                      label="이름"
                      placeholder=""
                      type=""
                      className={`max-w-57.75 pad:max-w-79 pad:min-w-48 ${inputStyle}`}
                      value={formData?.name || ''}
                      onChange={() => {}}
                      readOnly
                    ></Input>
                    <Input
                      name="major"
                      label="학과"
                      placeholder=""
                      type=""
                      className={`max-w-57.75 pad:max-w-79 pad:min-w-48 ${inputStyle}`}
                      value={formData?.department || ''}
                      onChange={() => {}}
                      readOnly
                    ></Input>
                    <Input
                      name="studentId"
                      label="학번"
                      placeholder=""
                      type=""
                      className={`max-w-57.75 pad:max-w-79 pad:min-w-48 ${inputStyle}`}
                      value={formData?.studentNumber || ''}
                      onChange={() => {}}
                      readOnly
                    ></Input>
                  </div>
                  {/* 오른쪽 전화번호, 이메일, 지원파트 */}
                  <div className="web:flex-1 flex flex-col gap-6">
                    <Input
                      name="phone"
                      label="전화번호"
                      placeholder=""
                      type=""
                      className={`max-w-57.75 pad:max-w-79 pad:min-w-48 ${inputStyle}`}
                      value={formData?.phoneNumber || ''} // 상태값 연결
                      onChange={() => {}} // 변경 함수 연결
                      readOnly
                    ></Input>
                    <div className="self-stretch flex flex-col">
                      <label className="pad:text-lg text-sm font-bold">이메일</label>
                      <div className="flex items-center justify-start gap-1.5 pad:gap-2.5">
                        <div className="">
                          <Input
                            name="email"
                            label=""
                            placeholder=""
                            type=""
                            className={`max-w-31.75 pad:max-w-50 pad:min-w-30 ${inputStyle}`}
                            value={formData?.email ? formData.email.split('@')[0] : ''}
                            onChange={() => {}}
                            readOnly
                          ></Input>
                        </div>
                        <div className="opacity-70 text-text-gray text-sm pad:text-lg font-semibold pad:font-medium pt-3 pr-4">
                          @skuniv.ac.kr
                        </div>
                      </div>
                    </div>
                    {/* 지원파트 부분 */}
                    <div className="self-stretch flex flex-col gap-3">
                      <label className="pad:text-lg text-sm font-bold">지원트랙</label>
                      <div>
                        <div className="flex flex-col pad:flex-row gap-2.5">
                          {parts.map((part) => (
                            <Button
                              key={part.id}
                              onClick={() => handleTrackSelect(part.id)}
                              data-variant=""
                              data-size=""
                              className={getButtonStyle(formData.track === part.id)}
                            >
                              {part.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start text-[0.71rem] font-semibold">
                      지원서를 이미 작성한 경우, 트랙 변경 시 작성했던 ‘트랙별 질문'의 답은
                      사라집니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 하단 버튼 부분 */}
        <div className="flex justify-center">
          <div className="flex justify-center items-center gap-5">
            <Button onClick={handleNext} className={nextButtonStyle}>
              <span className="opacity-70 text-black text-base font-semibold pad:text-lg pad:font-medium">
                다음단계
              </span>
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} cancel={() => setIsModalOpen(false)} confirm={confirmTrackChange}>
        지원서를 이미 작성한 경우, 트랙 변경 시 작성했던 ‘트랙별 질문'에 대한 답은 사라집니다. 정말
        변경하시겠습니까?
      </Modal>
    </div>
  );
}

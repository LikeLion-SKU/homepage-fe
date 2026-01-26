import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/ConfirmModal';
import ApplyStep from '@/components/common/apply/ApplyStep';
import ApplyTitleSection from '@/components/common/apply/ApplyTitleSection';
import Input from '@/components/common/apply/Input';
import { formatPhoneNumber } from '@/utils/Formatter';

export default function ApplyBasicInfo() {
  /** @type {any} */
  const { formData, updateFormData } = useOutletContext();
  const navigate = useNavigate();

  const inputStyle = `bg-white border border-black h-12 px-4 py-4 placeholder:font-medium`;
  const parts = [
    { id: 'po', name: 'PO' },
    { id: 'fe', name: '프론트엔드' },
    { id: 'be', name: '백엔드' },
  ];

  const getButtonStyle = (isSelected) => {
    const baseStyle = 'h-12 flex-1 outline py-2 text-lg font-semibold transition-all';

    // 선택 여부에 따른 버튼 색상
    const stateStyle = isSelected
      ? 'bg-button-green text-black'
      : 'bg-white text-black hover:bg-button-hover';

    return `${baseStyle} ${stateStyle}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    // 가공 로직
    if (name === 'studentId') {
      nextValue = value.replace(/[^\d]/g, '').slice(0, 10);
    } else if (name === 'phone') {
      nextValue = formatPhoneNumber(value);
    }

    // 새로운 데이터를 먼저 변수로 만듦
    const nextFormData = {
      ...formData,
      [name]: nextValue,
    };

    // Apply가 준 통합 함수로 상태 업데이트 + 로컬스토리지 저장 동시 진행
    updateFormData(nextFormData);
  };

  // 지원 트랙 선택 시 formData 업데이트 로직
  const handleTrackSelect = (trackId) => {
    const currentTrack = formData.track;

    // 이미 선택한 트랙이 있고, 그 트랙이 새로 누른 트랙이 아닐때 -> 모달이 열려야 함
    if (currentTrack && currentTrack !== trackId && trackId !== '') {
      setPendingTrack(trackId); // 바꿀 트랙을 임시 저장
      setIsModalOpen(true); // 모달 열기
      return;
    }

    updateFormData((prev) => ({
      ...prev,
      track: prev.track === trackId ? '' : trackId,
    }));
  };

  // 모달에서 확인 눌렀을때 트랙 바꾸는 함수
  const confirmTrackChange = () => {
    updateFormData((prev) => ({
      ...prev,
      track: pendingTrack,
    }));
    setIsModalOpen(false);
  };

  // 다음 단계 버튼 클릭 시 페이지 이동
  const handleNext = () => {
    // 간단한 유효성 검사 (선택 사항)
    const { name, major, studentId, phone, email, track } = formData;

    if (!name || !major || !studentId || !phone || !email || !track) {
      alert('모든 입력칸을 채워주세요!');
      return;
    }
    navigate('/apply/common'); // URL 이동
  };

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달에서 확인/취소 버튼 눌렀을때 선택할 트랙 임시 상태 저장
  const [pendingTrack, setPendingTrack] = useState('');

  return (
    <div className="pb-35">
      <div className="w-full flex flex-col pt-18 px-45.5 gap-23">
        <div className="flex flex-col gap-31">
          <div className="flex flex-col gap-20">
            {/* 지원서 작성 페이지의 기본 정보 섹션 */}
            <ApplyTitleSection></ApplyTitleSection>
            {/* 지원서 작성 단계 부분 */}
            <div className="self-stretch inline-flex items-center gap-7">
              <ApplyStep
                step="STEP 1"
                stepName="기본 인적사항"
                lineStyle="self-stretch h-1 bg-button-green mb-5"
                stepStyle="self-stretch text-center text-button-green text-1xl font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-button-green text-2xl font-bold "
              ></ApplyStep>
              <ApplyStep
                step="STEP 2"
                stepName="공통 질문"
                lineStyle="self-stretch h-1 bg-navy-blue mb-5"
                stepStyle="self-stretch text-center text-navy-blue text-1xl font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-navy-blue text-2xl font-bold "
              ></ApplyStep>
              <ApplyStep
                step="STEP 3"
                stepName="트랙별 질문"
                lineStyle="self-stretch h-1 bg-navy-blue mb-5"
                stepStyle="self-stretch text-center text-navy-blue text-1xl font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-navy-blue text-2xl font-bold "
              ></ApplyStep>
            </div>
          </div>
          {/* 인적사항 기재 부분 */}
          <div>
            <div className="flex flex-col gap-10">
              <div className="self-stretch h-8 opacity-70 text-2xl font-bold ">인적사항</div>
              <div className="self-stretch h-103 px-27 pt-11 border bg-button-gray">
                <div className="flex justify-between gap-48">
                  {/* 왼쪽 이름, 학과, 학번 */}
                  <div className="flex-1 flex flex-col gap-6">
                    <Input
                      name="name"
                      label="이름"
                      placeholder="김멋사"
                      type="text"
                      className={inputStyle}
                      value={formData?.name || ''}
                      onChange={handleChange}
                    ></Input>
                    <Input
                      name="major"
                      label="학과"
                      placeholder="소프트웨어학과"
                      type="text"
                      className={inputStyle}
                      value={formData?.major || ''}
                      onChange={handleChange}
                    ></Input>
                    <Input
                      name="studentId"
                      label="학번"
                      placeholder="2020202020"
                      type="text"
                      className={inputStyle}
                      value={formData?.studentId || ''}
                      onChange={handleChange}
                    ></Input>
                  </div>
                  {/* 오른쪽 전화번호, 이메일, 지원파트 */}
                  <div className="flex-1 flex flex-col gap-6">
                    <Input
                      name="phone"
                      label="전화번호"
                      placeholder="010-1234-5678"
                      type="text"
                      className={inputStyle}
                      value={formData?.phone || ''} // 상태값 연결
                      onChange={handleChange} // 변경 함수 연결
                    ></Input>
                    <div className="self-stretch flex flex-col">
                      <label>이메일</label>
                      <div className="flex items-center justify-between">
                        <div className="w-2/3">
                          <Input
                            name="email"
                            label=""
                            placeholder="likelion"
                            type="text"
                            className={inputStyle}
                            value={formData?.email || ''}
                            onChange={handleChange}
                          ></Input>
                        </div>
                        <div className="opacity-70 text-text-gray font-medium pt-3 pr-4">
                          @skuniv.ac.kr
                        </div>
                      </div>
                    </div>
                    {/* 지원파트 부분 */}
                    <div className="self-stretch flex flex-col gap-3">
                      <label>지원트랙</label>
                      <div className="flex gap-2.5">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 하단 버튼 부분 */}
        <div className="flex justify-center">
          <div className="flex justify-center items-center gap-5 w-1/3">
            <Button
              onClick={() => {}}
              className="flex-1 h-14 outline -outline-offset-1 text-text-gray flex justify-center items-center bg-white transition-all hover:bg-stone-100"
            >
              <span className="text-text-gray text-lg font-medium">임시저장</span>
            </Button>

            <Button
              onClick={handleNext}
              className="flex-1 h-14 bg-button-green outline -outline-offset-1 outline-black flex justify-center items-center transition-all hover:bg-button-hover"
            >
              <span className="opacity-70 text-black text-lg font-medium">다음단계</span>
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

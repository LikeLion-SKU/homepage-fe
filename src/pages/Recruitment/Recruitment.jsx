import { useState } from 'react';
import { useNavigate } from 'react-router';

import Toggle from '@/assets/icons/under_toggle.svg';
import ApplyStickyBox from '@/components/animation/ApplyStickyBox';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/ConfirmModal';
import { checkExpired } from '@/utils/Date';
import { formatDeadline } from '@/utils/Date';

export default function Recruitment() {
  // 열려있는 토글들의 인덱스 배열로 저장
  const [openToggle, setOpenToggle] = useState([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const navigate = useNavigate();
  const deadline = '2025-03-30T23:59:59';

  const handleToggle = (index) => {
    if (openToggle.includes(index)) {
      setOpenToggle(openToggle.filter((i) => i !== index)); // 누른 토글이 이미 열려있다면 -> 배열에서 제거
    } else {
      setOpenToggle([...openToggle, index]); // 누른 토글이 닫혀있다면 -> 배열에 추가
    }
  };

  // 마감일 지났는지 확인
  const isExpired = checkExpired(deadline);
  // 기수
  const generation = '14';

  const questionData = [
    {
      question: '비전공자도 참여 가능한가요?',
      answer:
        'A. 비전공자도 참여 가능합니다!\n멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '정기 세션은 언제 이루어지나요?',
      answer:
        'A. 비전공자도 참여 가능합니다!\n멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '누가 참여할 수 있나요?',
      answer:
        'A. 비전공자도 참여 가능합니다!\n멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '나이 제한이 있나요?',
      answer:
        'A. 비전공자도 참여 가능합니다!\n멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '지원서 제출 후 수정할 수 있나요?',
      answer:
        'A. 비전공자도 참여 가능합니다!\n멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '여러 트랙으로 중복 지원이 가능한가요?',
      answer:
        'A. 비전공자도 참여 가능합니다!\n멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
  ];
  const toggleButtonStyle = `
    w-212 h-14 pl-4 pr-7 py-5 bg-white border border-black
    flex items-center justify-between
    text-black text-base font-medium font-['Pretendard']
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[5px_5px_0px_rgba(var(--color-yellow-shadow-rgb),0.6)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;
  const buttonStyle = `
    w-full h-15 bg-button-green border border-black
    flex justify-center items-center 
    text-black text-lg font-semibold font-['Pretendard']
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[5px_5px_0px_var(--color-yellow-shadow)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;

  // 마감일 지났을때 지원하기 버튼 비활성화
  const disabledStyle = `
    w-full h-15 bg-expired-gray-button border border-black
    flex justify-center items-center 
    text-gray-800 text-lg font-semibold
    !drop-shadow-none !shadow-none
  `;

  return (
    <div className="flex pl-17.25 pt-18">
      {/* 왼쪽 부분은 패딩으로 자동 왼쪽 정렬 */}
      <div className="w-full bg-white flex flex-col items-start  gap-20">
        {/* 제목 부분 */}
        <div className="flex flex-col gap-7">
          <h1 className="text-black text-4xl font-extrabold font-['Pretendard']">
            {generation}기 아기사자 모집안내
          </h1>
          <p className="text-stone-900 text-lg font-medium font-['Pretendard']">
            서경대학교 멋쟁이사자처럼 {generation}기 아기사자를 모집해요!
          </p>
        </div>

        {/* 구분선 */}
        <div className="w-212 border-t border-black" />

        {/* 본문 내용들 */}
        <div className="flex flex-col gap-24 pb-20">
          <section>
            <h2 className="text-2xl font-bold mb-7">모집 일정</h2>
            <ul className="list-disc ml-5 flex flex-col gap-6 font-medium">
              <li>1차 서류 모집 : ○월 ○일 ~ ○월 ○일</li>
              <li>1차 합격자 발표 : ○월 ○일</li>
              <li>2차 면접 : ○월 ○일 ~ ○월 ○일</li>
              <li>2차 합격자 발표 : ○월 ○일</li>
              <li>서경대 멋사 OT : ○월 ○일</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-7">모집 대상</h2>
            <ul className="list-disc ml-5 flex flex-col gap-6 font-medium">
              <li>서경대학교 재학생 또는 휴학생</li>
              <li>멋사 활동에 적극적으로 참여할 학생</li>
              <li>개인 노트북 소유자</li>
              <li>
                주중 1일(트랙별 상이) 18시 30분부터 약 2시간 진행되는 대면 세션에 참여 가능한 학생
              </li>
              <li>지원 트랙에 대한 기본적인 역량을 갖춘 학생</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-7">유의 사항</h2>
            <ul className="list-disc ml-5 flex flex-col gap-6 font-medium">
              <li>서경대학교 재학생 또는 휴학생</li>
              <li>멋사 활동에 적극적으로 참여할 학생</li>
              <li>중복 제출은 불가합니다.</li>
              <li>
                주중 1일(트랙별 상이) 18시 30분부터 약 2시간 진행되는 대면 세션에 참여 가능한 학생
              </li>
              <li>지원 트랙에 대한 기본적인 역량을 갖춘 학생</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold mb-7">자주 묻는 질문</h2>
            {questionData.map((item, index) => {
              const isOpen = openToggle.includes(index);
              return (
                <div key={index}>
                  <Button
                    onClick={() => {
                      handleToggle(index);
                    }}
                    data-variant=""
                    data-size=""
                    className={toggleButtonStyle}
                  >
                    • {item.question}
                    <div className="w-3.5 h-3.5">
                      <img src={Toggle}></img>
                    </div>
                  </Button>
                  {isOpen && (
                    <div
                      className="
                        w-212 self-stretch px-6 py-5 bg-toggle-green 
                        border border-black border-t-0
                        flex items-center justify-between
                        text-black text-base font-medium font-['Pretendard']
                        whitespace-pre-wrap"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </div>
      <div className="flex justify-end w-full pr-15">
        {/* 추후 변경 필요 */}
        <ApplyStickyBox
          deadline={formatDeadline(deadline)}
          onClickModal={() => setIsApplyModalOpen(true)}
          isExpired={isExpired}
          buttonStyle={`${buttonStyle} ${isExpired ? disabledStyle : ''}`}
        />
      </div>
      <Modal
        isOpen={isApplyModalOpen}
        cancel={() => setIsApplyModalOpen(false)}
        confirm={() => {
          setIsApplyModalOpen(false);
          // 백엔드 연결 전 임시 로직
          const hasSubmitted = true; // 나중에 API 결과값으로 대체

          if (hasSubmitted) {
            navigate('/apply/complete'); // 이미 제출했으면 완료 페이지로
          } else {
            navigate('/application'); // 제출 안 했으면 신청 페이지로
          }
        }}
      >
        지원하러 가시겠습니까?
      </Modal>
    </div>
  );
}

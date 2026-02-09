import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLoaderData } from 'react-router';

import Toggle from '@/assets/icons/under_toggle.svg';
import ApplyStickyBox from '@/components/animation/ApplyStickyBox';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/ConfirmModal';
import useSemesterStore from '@/store/useSemesterStore';
import { checkExpired } from '@/utils/Date';
import { formatDeadline } from '@/utils/Date';

export default function Recruitment() {
  // 열려있는 토글들의 인덱스 배열로 저장
  const [openToggle, setOpenToggle] = useState([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { semesterData, fetchSemesterData } = useSemesterStore();
  const navigate = useNavigate();
  const [isLoggedIn, _setIsLoggedIn] = useState(true); // 임의로 로그인 여부
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const userData = useLoaderData();

  useEffect(() => {
    if (!semesterData) fetchSemesterData();
  }, [fetchSemesterData, semesterData]);

  const handleToggle = (index) => {
    if (openToggle.includes(index)) {
      setOpenToggle(openToggle.filter((i) => i !== index)); // 누른 토글이 이미 열려있다면 -> 배열에서 제거
    } else {
      setOpenToggle([...openToggle, index]); // 누른 토글이 닫혀있다면 -> 배열에 추가
    }
  };

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      // 1. 로그인 안 되어 있으면 로그인 유도 모달 오픈
      setIsLoginModalOpen(true);
    } else if (isExpired) {
      // 2. 마감되었으면 아무것도 안 함 (이미 disabled 처리됐겠지만)
      return;
    } else {
      // 3. 로그인 되어 있고 기간 내라면 신청 모달 오픈
      setIsApplyModalOpen(true);
    }
  };

  // 마감일 지났는지 확인
  const isExpired = checkExpired(semesterData?.semester);

  // 스크롤 시 지원하기 박스 고정 (body 스크롤에서도 동작하도록)
  const stickyBoxRef = useRef(null);
  const [stickyState, setStickyState] = useState({ isSticky: false, left: 0, width: 0 });
  const STICKY_TOP = 72; // top-18 = 4.5rem

  // 모바일이나 패드가 맞는지 여부 확인
  const isMobileOrPad = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

  useEffect(() => {
    const updateSticky = () => {
      const el = stickyBoxRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= STICKY_TOP) {
        setStickyState({ isSticky: true, left: rect.left, width: rect.width });
      } else {
        setStickyState((prev) => ({ ...prev, isSticky: false }));
      }
    };
    updateSticky();
    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);
    return () => {
      window.removeEventListener('scroll', updateSticky);
      window.removeEventListener('resize', updateSticky);
    };
  }, []);

  const questionData = [
    {
      question: '비전공자도 참여 가능한가요?',
      answer:
        'A. 비전공자도 참여 가능합니다!\n멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '나이 제한이 있나요?',
      answer: 'A. 없습니다.\n멋쟁이사자처럼은 나이와 학년과 무관하게 선발이 이루어집니다.',
    },
    {
      question: '선발기준은 무엇인가요?',
      answer:
        'A. 시간 투자를 많이 해야하는 멋대인만큼 아기사자들의 열정에 가장 중점을 두고,\n1년 동안 함께 즐겁게 활동할 수 있는 아기사자들을 선호합니다.',
    },
    {
      question: '지원서 제출 후 수정이 가능한가요?',
      answer:
        'A. 지원서 제출 후 수정이 불가합니다.\n중복 제출 또한 불가합니다.\n신중하게 지원서를 제출해주시길 바랍니다.',
    },
    {
      question: '여러 트랙으로 중복 지원이 가능한가요?',
      answer:
        'A. 여러 트랙으로 중복 지원은 불가합니다.\n중복 제출 또한 불가합니다.\n이미 제출된 지원서가 있을 시 더 이상 지원서를 제출할 수 없습니다.',
    },
    {
      question: '합격 이후 다른 트랙으로 이동할 수 있나요?',
      answer: 'A. 합격 이후 트랙 간 멤버 조정은 없습니다.\n이 점 참고해서 지원 트랙 지원해주세요.',
    },
    {
      question: '지원 절차는 어떻게 되나요?',
      answer:
        'A. 멋사홈페이지에서 지원서 작성 → 면접(서류 합격자 대상) → 최종 선발의 과정을 거칩니다.',
    },
  ];
  const toggleButtonStyle = `
    w-full web:w-xl h-14 pl-4 pr-7 py-5 bg-white border border-black
    flex items-center justify-between
    text-black text-xs pad:text-base font-medium
    transition-all duration-200
    hover:drop-shadow-[5px_5px_0px_rgba(var(--color-yellow-shadow-rgb),0.6)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;
  const buttonStyle = `
    w-56 h-9 pad:w-full pad:h-15 bg-button-green border border-black
    flex justify-center items-center 
    text-black text-sm pad:text-lg font-semibold 
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[5px_5px_0px_var(--color-yellow-shadow)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;

  // 마감일 지났을때 지원하기 버튼 비활성화
  const disabledStyle = `
    w-56 h-9 pad:w-full h-15 bg-expired-gray-button border border-black
    flex justify-center items-center 
    text-gray-800 text-lg font-semibold
    !drop-shadow-none !shadow-none
  `;

  return (
    <div className="w-full min-h-screen relative pb-50 max-w-full overflow-x-hidden">
      <div className="flex min-w-0 w-full px-4.5 pad:px-10 web:px-21 pt-18">
        {/* 왼쪽 부분은 패딩으로 자동 왼쪽 정렬 */}
        <div className="min-w-0 web:flex-1 flex flex-col items-stretch gap-20">
          {/* 제목 부분 */}
          <div className="flex flex-col gap-7">
            <h1 className="text-black text-xl font-bold pad:text-4xl pad:font-extrabold">
              {semesterData?.semester}기 아기사자 모집안내
            </h1>
            <p className="text-stone-900 text-sm font-semibold pad:text-lg pad:font-medium">
              서경대학교 멋쟁이사자처럼 {semesterData?.semester}기 아기사자를 모집해요!
            </p>
          </div>

          {/* 구분선 */}
          <div className="w-full web:w-212 border-t border-black" />

          {/* 본문 내용들 */}
          <div className="flex flex-col gap-24 pb-20">
            <section>
              <h2 className="text-lg pad:text-2xl font-bold mb-7">모집 일정</h2>
              <ul className="list-disc ml-5 flex flex-col gap-6 text-xs pad:text-base font-medium">
                <li>1차 서류 모집 : 2월 23일 ~ 3월 6일</li>
                <li>1차 합격자 발표 : 3월 7일 12:00</li>
                <li>면접 일정 제출 : 3월 7일 ~ 3월 8일</li>
                <li>2차 면접 : 3월 9일 ~ 3월 13일</li>
                <li>2차 합격자 발표 : 3월 14일 12:00</li>
                <li>서경대 멋사 OT : 3월 16일 18:00</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg pad:text-2xl font-bold mb-7">모집 대상</h2>
              <ul className="list-disc ml-5 flex flex-col text-xs pad:text-base gap-6 font-medium">
                <li>1년 활동이 가능한 2026년도 기준 재학생, 휴학생, 편입생, 졸업 유예생</li>
                <li>주중 1일(트랙별 상이) 18시 30분에 진행되는 대면 세션에 참여할 수 있는 분</li>
                <li>멋쟁이사자처럼 활동에 꾸준히, 적극적으로 함께할 분</li>
                <li>지원 트랙에 대한 기본적인 역량을 갖춘 분</li>
                <li>현실의 문제를 해결하는 프로덕트 빌딩 경험을 만들고 싶은 분</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg pad:text-2xl font-bold mb-7">유의 사항</h2>
              <ul className="list-disc ml-5 flex flex-col text-xs pad:text-base gap-6 font-medium">
                <li>활동 중 수료 조건을 충족해야 보증금 환급 및 수료증이 발급됩니다</li>
                <li>활동을 위해 개인 노트북을 반드시 지참해야 합니다</li>
                <li>트랙간의 지원서 중복 제출은 불가합니다</li>
                <li>불성실한 참여가 반복될 경우 활동 제한 또는 수료가 불가할 수 있습니다</li>
                <li>모든 활동은 팀 프로젝트 중심으로 진행되며, 원활한 소통과 협업이 필수입니다</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3 w-full">
              <h2 className="text-lg pad:text-2xl font-bold mb-7">자주 묻는 질문</h2>
              {questionData.map((item, index) => {
                const isOpen = openToggle.includes(index);
                return (
                  <div key={index} className="w-full">
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
                        w-full web:w-xl self-stretch px-6 py-5 bg-toggle-green 
                        border border-black border-t-0
                        flex items-center justify-between
                        text-black text-xs pad:text-base font-medium font-['Pretendard']
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
        <div
          ref={stickyBoxRef}
          className="absolute inset-x-4.5 pad:inset-x-10 top-[55vh] web:top-18 web:left-auto web:right-0 web:px-21 z-20"
        >
          {/* 웹에서만 더미 유지 */}
          {stickyState.isSticky && (
            <div className="hidden web:block w-full web:w-96 h-60 shrink-0" aria-hidden />
          )}

          <div
            className={
              // 웹이 아닐 때는 무조건 fixed로 화면 하단에 고정
              // 웹일 때는 기존 스티키 로직
              isMobileOrPad
                ? 'fixed bottom-10 left-4.5 right-4.5 pad:left-10 pad:right-10 z-50'
                : stickyState.isSticky
                  ? 'fixed z-10 flex justify-end web:right-21'
                  : 'w-full'
            }
            style={
              !isMobileOrPad && stickyState.isSticky
                ? {
                    left: 'auto',
                    width: stickyState.width,
                    top: STICKY_TOP,
                  }
                : undefined
            }
          >
            <ApplyStickyBox
              deadline={formatDeadline(semesterData?.closeAt)}
              onClickModal={handleButtonClick}
              isExpired={isExpired}
              buttonStyle={`${buttonStyle} ${isExpired ? disabledStyle : ''}`}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isApplyModalOpen}
        cancel={() => setIsApplyModalOpen(false)}
        confirm={() => {
          setIsApplyModalOpen(false);
          // 백엔드 연결 전 임시 로직
          const hasSubmitted = userData.documentSubmitted; // 지원서 제출 여부

          if (hasSubmitted) {
            navigate('/apply/complete'); // 이미 제출했으면 완료 페이지로
          } else {
            navigate('/apply/info'); // 제출 안 했으면 신청 페이지로
          }
        }}
      >
        지원하러 가시겠습니까?
      </Modal>
      <Modal
        isOpen={isLoginModalOpen}
        cancel={() => setIsLoginModalOpen(false)}
        confirm={() => {
          setIsLoginModalOpen(false);
          navigate('/login'); // 확인 누르면 로그인 페이지로 이동
        }}
      >
        로그인 후 지원 가능합니다.
      </Modal>
    </div>
  );
}

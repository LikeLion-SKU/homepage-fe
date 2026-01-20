import Toggle from '@/assets/icons/under_toggle.svg';
import Button from '@/components/common/Button/Button';

export default function Recruitment() {
  const questionData = [
    {
      question: '비전공자도 참여 가능한가요?',
      answer:
        'A. 비전공자도 참여 가능합니다! 멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '정기 세션은 언제 이루어지나요?',
      answer:
        'A. 비전공자도 참여 가능합니다! 멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '누가 참여할 수 있나요?',
      answer:
        'A. 비전공자도 참여 가능합니다! 멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '나이 제한이 있나요?',
      answer:
        'A. 비전공자도 참여 가능합니다! 멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '지원서 제출 후 수정할 수 있나요?',
      answer:
        'A. 비전공자도 참여 가능합니다! 멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
    {
      question: '여러 트랙으로 중복 지원이 가능한가요?',
      answer:
        'A. 비전공자도 참여 가능합니다! 멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로 하는 코딩 연합 동아리입니다.',
    },
  ];
  const toggleButtonStyle = `
    w-212 h-14 mb-3 pl-4 pr-7 py-5 bg-white border border-black
    flex items-center justify-between
    text-black text-base font-medium font-['Pretendard']
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;
  const buttonStyle = `
    w-full h-15 bg-buttongreen border border-black
    flex justify-center items-center 
    text-black text-lg font-semibold font-['Pretendard']
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;

  return (
    <div className="flex">
      {/* 왼쪽 부분은 패딩으로 자동 왼쪽 정렬 */}
      <div className="w-full bg-white flex flex-col items-start pl-21 pt-24.25 gap-20">
        {/* 제목 부분 */}
        <div className="flex flex-col gap-7">
          <h1 className="text-black text-4xl font-extrabold font-['Pretendard']">
            14기 아기사자 모집안내
          </h1>
          <p className="text-stone-900 text-lg font-medium font-['Pretendard']">
            서경대학교 멋쟁이사자처럼 14기 아기사자를 모집해요!
          </p>
        </div>

        {/* 구분선 */}
        <div className="w-212 border-t border-black" />

        {/* 본문 내용들 */}
        <div className="flex flex-col gap-24 pb-20">
          <section>
            <h2 className="text-2xl font-bold mb-7">모집 일정</h2>
            <ul className="list-disc ml-5 font-medium">
              <li>
                1차 서류 모집 &gt; 1차 합격자 발표 &gt; 2차 면접 &gt; 2차 합격자 발표 &gt; 서경대
                멋사 OT
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-7">모집 대상</h2>
            <ul className="list-disc ml-5 flex flex-col gap-6 font-medium">
              <li>서경대학교 재학생 또는 휴학생</li>
              <li>멋사 활동에 적극적으로 참여할 학생</li>
              <li>개인 노트북 소유자</li>
              <li>매주 월요일 18시 30분 세션 대면 참가 가능한 학생</li>
              <li>지원 파트에 대한 기본적인 역량을 갖춘 학생</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-7">유의 사항</h2>
            <ul className="list-disc ml-5 flex flex-col gap-6 font-medium">
              <li>서경대학교 재학생 또는 휴학생</li>
              <li>멋사 활동에 적극적으로 참여할 학생</li>
              <li>중복 제출은 불가합니다.</li>
              <li>매주 월요일 18시 30분 세션 대면 참가 가능한 학생</li>
              <li>지원 파트에 대한 기본적인 역량을 갖춘 학생</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-7">자주 묻는 질문</h2>
            {questionData.map((item, index) => (
              <Button
                key={index}
                onClick={() => {}}
                data-variant=""
                data-size=""
                className={toggleButtonStyle}
              >
                • {item.question}
                <div className="w-3.5 h-3.5">
                  <img src={Toggle}></img>
                </div>
              </Button>
            ))}
          </section>
        </div>
      </div>
      <div className="flex justify-end w-full pt-45.5 pr-15">
        {/* 오른쪽 지원 상자 */}
        <div className="w-96 h-60 px-7 py-9 outline">
          <div className="w-80 flex flex-col justify-start items-start gap-6">
            <div className="w-52 flex flex-col gap-3">
              <div className="self-stretch h-4 justify-center text-stone-500 text-sm font-medium font-['Pretendard']">
                마감일
              </div>
              <div className="self-stretch h-7 justify-center text-black text-xl font-bold font-['Pretendard']">
                2026.03.30 오후 5:00
              </div>
            </div>
            <div className="w-80 border-t border-black"></div>
            <Button onClick={() => {}} data-variant="" data-size="" className={buttonStyle}>
              지원하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

import Navy from '@/assets/icons/navy-left.svg';
import Button from '@/components/common/Button/Button';
import { QUESTION_LIST } from '@/constants/QuestionData';

export default function Application() {
  const navigate = useNavigate();
  const TRACK_NAMES = {
    fe: '프론트엔드',
    be: '백엔드',
    po: 'PO',
  };

  const APPICATION_DATA = {
    name: '김멋사',
    major: '소프트웨어학과',
    studentId: '2020202020',
    phone: '010-0000-0000',
    email: 'likelion@skuniv.ac.kr',
    track: 'fe',
    answers: {},
  };

  return (
    <div className="pb-35">
      <div className="w-full flex flex-col pt-18 px-45.5 gap-23">
        <div className="flex flex-col gap-10">
          <div>
            <div className="relative inline-block">
              {/* 네 모서리의 검은색 박스 점들 - z-10 추가로 버튼보다 위로 올림 */}
              {/* 좌상단 */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-navy-blue z-10" />
              {/* 우상단 */}
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-navy-blue z-10" />
              {/* 좌하단 */}
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-navy-blue z-10" />
              {/* 우하단 */}
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-navy-blue z-10" />

              <Button
                onClick={() => navigate(-1)}
                className="relative w-12 h-12 bg-button-green hover:bg-button-hover p-0 flex justify-center items-center outline"
              >
                <img src={Navy} className="w-10 h-8 object-contain" alt="navy icon" />
              </Button>
            </div>
          </div>
          {/* 개인 정보 부분 */}
          <div className="flex flex-col gap-6">
            <div className="flex items-end gap-2">
              <div className="text-4xl font-bold">{APPICATION_DATA.name || '-'}</div>
              <div className="text-3xl font-semibold text-gray-800">님의 지원서</div>
            </div>
            <div className="text-lg font-medium ">멋쟁이사자처럼 14기 아기사자 지원서</div>
          </div>
        </div>
        <div className="flex flex-col gap-31">
          {/* 인적사항 기재 부분 */}
          <div>
            <div className="flex flex-col gap-10">
              <div className="self-stretch h-8 text-2xl font-bold ">인적사항</div>
              <div className="self-stretch h-103 px-27 pt-11 border bg-button-gray">
                <div className="flex justify-between gap-48">
                  {/* 왼쪽 이름, 학과, 학번 */}
                  <div className="flex-1 flex flex-col gap-11">
                    <div className="flex flex-col gap-4">
                      <label className="text-lg font-semi-bold">이름</label>
                      <div>{APPICATION_DATA.name || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-lg font-semi-bold">학과</label>
                      <div>{APPICATION_DATA.major || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-lg font-semi-bold">학번</label>
                      <div>{APPICATION_DATA.studentId || '-'}</div>
                    </div>
                  </div>
                  {/* 오른쪽 전화번호, 이메일, 지원파트 */}
                  <div className="flex-1 flex flex-col gap-11">
                    <div className="flex flex-col gap-4">
                      <label className="text-lg font-semi-bold">전화번호</label>
                      <div>{APPICATION_DATA.phone || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-lg font-semi-bold">이메일</label>
                      <div>{APPICATION_DATA.email || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-lg font-semi-bold">지원트랙</label>
                      <div className="h-12 w-1/3 outline py-2.5 flex justify-center text-lg font-semibold transition-all bg-button-green text-black">
                        {TRACK_NAMES[APPICATION_DATA.track] || '미선택'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 공통 질문 답변 부분 */}
          <div className="flex flex-col gap-10">
            <div className="self-stretch h-8 text-2xl font-bold font-['Pretendard']">공통 질문</div>
            {/* 공통질문 상자 */}
            <div className="flex flex-col px-20 py-18 border bg-button-gray gap-15">
              {/* 공통질문 내용 */}
              {QUESTION_LIST.filter((item) => item.track === 'COMMON').map(
                (
                  item // 공통질문만 map 돌면서 보여주기
                ) => (
                  <div key={item.id} className="flex flex-col gap-4">
                    {/* 질문 제목 */}
                    <div className="text-lg font-bold text-zinc-800">
                      {item.order_number}. {item.question}
                    </div>
                    {/* 답변 부분 */}
                    <div className="w-full min-h-32 p-5 text-zinc-700 whitespace-pre-wrap">
                      {APPICATION_DATA.answers?.[item.id] || '작성된 내용이 없습니다.'}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          {/* 트랙별 질문 답변 부분 */}
          <div className="flex flex-col gap-10">
            <div className="self-stretch h-8 text-2xl font-bold font-['Pretendard']">
              트랙별 질문
            </div>
            {/* 트랙별 질문 상자 */}
            <div className="flex flex-col px-20 py-18 border bg-button-gray gap-15">
              {/* formData의 track에 따라 필터링하여 답변 보여주기 */}
              {QUESTION_LIST.filter((item) => item.track === APPICATION_DATA.track).map((item) => (
                <div key={item.id} className="flex flex-col gap-4">
                  {/* 질문 제목 */}
                  <div className="text-lg font-bold text-zinc-800">
                    {item.order_number}. {item.question}
                  </div>

                  {/* 줄바꿈 유지하도록*/}
                  <div className="w-full min-h-32 p-5 text-zinc-700 whitespace-pre-wrap">
                    {APPICATION_DATA.answers?.[item.id] || '작성된 내용이 없습니다.'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

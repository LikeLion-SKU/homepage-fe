import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import Navy from '@/assets/icons/navy-left.svg';
import Button from '@/components/common/Button/Button';
import useSemesterStore from '@/store/useSemesterStore';

export default function Application() {
  /** @type {any} */
  const { userInfo, commonQuestions, trackQuestions } = useLoaderData();
  const { semesterData, fetchSemesterData } = useSemesterStore();
  const navigate = useNavigate();
  const TRACK_NAMES = {
    FRONTEND: '프론트엔드',
    BACKEND: '백엔드',
    PO: 'PO',
  };

  useEffect(() => {
    if (!semesterData) fetchSemesterData();
  }, [fetchSemesterData, semesterData]);

  return (
    <div className="pb-35">
      <div className="w-full flex flex-col pt-18 px-6 pad:px-15 web:px-45.5 gap-23">
        <div className="flex flex-col gap-6 pad:gap-10">
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
                className="relative w-9 h-9 pad:w-12 pad:h-12 bg-button-green hover:bg-button-hover p-0 flex justify-center items-center outline"
              >
                <img src={Navy} className="w-10 h-8 object-contain" alt="navy icon" />
              </Button>
            </div>
          </div>
          {/* 개인 정보 부분 */}
          <div className="flex flex-col gap-4 pad:gap-6">
            <div className="flex items-end gap-2">
              <div className="text-xl pad:text-4xl font-bold">{userInfo.name || '-'}</div>
              <div className="text-lg pad:text-3xl font-semibold text-gray-800">님의 지원서</div>
            </div>
            <div className="text-sm pad:text-lg font-medium ">
              멋쟁이사자처럼 {semesterData?.semester}기 아기사자 지원서
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-31">
          {/* 인적사항 기재 부분 */}
          <div>
            <div className="flex flex-col gap-4 pad:gap-10">
              <div className="self-stretch h-8 text-lg pad:text-2xl font-bold">인적사항</div>
              <div className="self-stretch web:min-h-103 pt-11 pb-13 items-center px-6 pad:px-25 web:px-25 border bg-button-gray">
                <div className="flex justify-between gap-x-5 gap-y-6">
                  {/* 왼쪽 이름, 학과, 학번 */}
                  <div className="web:flex-1 flex flex-col gap-6 pad:gap-11">
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">이름</label>
                      <div className="text-xs pad:text-base">{userInfo.name || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">학과</label>
                      <div className="text-xs pad:text-base">{userInfo.department || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">학번</label>
                      <div className="text-xs pad:text-base">{userInfo.studentNumber || '-'}</div>
                    </div>
                  </div>
                  {/* 오른쪽 전화번호, 이메일, 지원파트 */}
                  <div className="web:flex-1 flex flex-col gap-6 pad:gap-11">
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">전화번호</label>
                      <div className="text-xs pad:text-base">{userInfo.phoneNumber || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">이메일</label>
                      <div className="text-xs pad:text-base">{userInfo.email || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">지원트랙</label>
                      <div className="h-7 pad:h-11 web:h-12 min-w-14 pad:w-31 web:w-32 outline flex items-center justify-center text-sm pad:text-lg font-semibold transition-all bg-button-green text-black">
                        {TRACK_NAMES[userInfo.track] || '미선택'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 공통 질문 답변 부분 */}
          <div className="flex flex-col gap-4 pad:gap-10">
            <div className="self-stretch h-8 text-lg pad:text-2xl font-bold">공통 질문</div>
            {/* 공통질문 상자 */}
            <div className="flex flex-col px-6 py-7 pad:px-10 web:px-20 pad:py-18 web:py-18.5 border bg-button-gray gap-15">
              {/* 공통질문 내용 */}
              {commonQuestions.map(
                (
                  item // 공통질문만 map 돌면서 보여주기
                ) => (
                  <div key={item.questionId} className="flex flex-col gap-4">
                    {/* 질문 제목 */}
                    <div className="text-sm pad:text-lg font-bold text-zinc-800">
                      {item.orderNumber}. {item.question}
                    </div>
                    {/* 답변 부분 */}
                    <div className="w-full min-h-32 p-5 text-xs pad:text-base font-medium text-zinc-700 whitespace-pre-wrap">
                      {item.answer || '작성된 내용이 없습니다.'}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          {/* 트랙별 질문 답변 부분 */}
          <div className="flex flex-col gap-4 pad:gap-10">
            <div className="self-stretch h-8 text-lg pad:text-2xl font-bold">트랙별 질문</div>
            {/* 트랙별 질문 상자 */}
            <div className="flex flex-col px-6 py-7 pad:px-10 web:px-20 pad:py-18 web:py-18.5 border bg-button-gray gap-15">
              {/* formData의 track에 따라 필터링하여 답변 보여주기 */}
              {trackQuestions.map((item) => (
                <div key={item.questionId} className="flex flex-col gap-4">
                  {/* 질문 제목 */}
                  <div className="text-sm pad:text-lg font-bold text-zinc-800">
                    {item.orderNumber}. {item.question}
                  </div>

                  {/* 줄바꿈 유지하도록*/}
                  <div className="w-full min-h-32 p-5 text-xs pad:text-base font-medium text-zinc-700 whitespace-pre-wrap">
                    {item.answer || '작성된 내용이 없습니다.'}
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

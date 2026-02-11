import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getResumeForm } from '@/api/applicationQuestionApi';
import Navy from '@/assets/icons/navy-left.svg';
import ApplicationScheduleSection from '@/components/admin/Application/ApplicationScheduleSection';
import QuestionManager from '@/components/admin/Application/QuestionManager';
import Button from '@/components/common/Button/Button';

export default function AdminQuestion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id); // id 존재 여부에 따라 모드 결정

  const [selectedTab, setSelectedTab] = useState('공통질문');

  const [questions, setQuestions] = useState(() => [{ id: Date.now(), text: '' }]);

  const tabs = ['공통질문', 'PO', '프론트엔드', '백엔드'];

  // 지원서 데이터를 관리할 상태
  const [title, setTitle] = useState('');

  // 질문 미등록 모집 공고 목록 (지원 일정 불러오기용)
  const [resumeForms, setResumeForms] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      const timer = setTimeout(() => {
        setTitle(`${id}번 기존 지원서 제목`);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [id, isEditMode]);

  useEffect(() => {
    const fetchResumeForms = async () => {
      const data = await getResumeForm();
      setResumeForms(Array.isArray(data) ? data : (data?.content ?? []));
    };
    if (!isEditMode) fetchResumeForms();
  }, [isEditMode]);

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
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex justify-end">
            <button
              onClick={() => {}}
              className="flex w-30 h-10 justify-center items-center text-[1rem] border bg-white hover:bg-stone-50 transition-all px-"
            >
              저장
            </button>
          </div>
          <div>
            {/* 지원 일정 불러오기 드롭다운 or 그냥 텍스트*/}
            {isEditMode ? (
              /* 수정 모드 -> 드롭다운 대신 이미지처럼 제목 텍스트 표시 */
              <div className="h-12 flex items-center text-2xl font-bold mb-5">{title}</div>
            ) : (
              /* 생성 모드 -> 기존 드롭다운 섹션 표시 */
              <ApplicationScheduleSection resumeForms={resumeForms} />
            )}
            {/* 질문 분류 탭 */}
            <div className="flex items-center gap-4 mt-5">
              <span className="font-bold text-lg">질문 분류</span>
              <div className="flex border">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-6 py-2 border-r last:border-r-0 font-semibold ${
                      selectedTab === tab ? 'bg-stone-300' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* 상자 */}
          <div className="flex flex-col px-20 py-18 border bg-button-gray gap-15">
            {/* 질문 리스트 상자 */}

            <QuestionManager questions={questions} setQuestions={setQuestions} />
          </div>
        </div>
      </div>
    </div>
  );
}

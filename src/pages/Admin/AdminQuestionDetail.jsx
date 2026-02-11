import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  TAB_TO_TRACK,
  TRACK_TO_TAB,
  getResumeForm,
  getSemesterQuestion,
  postResumeQuestions,
  putSemesterQuestion,
} from '@/api/applicationQuestionApi';
import Navy from '@/assets/icons/navy-left.svg';
import ApplicationScheduleSection from '@/components/admin/Application/ApplicationScheduleSection';
import QuestionManager from '@/components/admin/Application/QuestionManager';
import Button from '@/components/common/Button/Button';

const TABS = ['공통질문', 'PO', '프론트엔드', '백엔드'];

export default function AdminQuestion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id); // id 존재 여부에 따라 모드 결정

  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  // 탭별로 질문 상태 분리 (탭 전환 시 기존 작성 내용 유지)
  const [questionsByTab, setQuestionsByTab] = useState(() => {
    const base = Date.now();
    return Object.fromEntries(TABS.map((tab, i) => [tab, [{ id: base + i, text: '' }]]));
  });

  const currentQuestions = questionsByTab[selectedTab] ?? [];
  const setCurrentTabQuestions = (valueOrUpdater) => {
    setQuestionsByTab((prev) => {
      const base = prev[selectedTab] ?? [{ id: crypto.randomUUID(), text: '' }];
      const newQuestions =
        typeof valueOrUpdater === 'function' ? valueOrUpdater(base) : valueOrUpdater;
      return { ...prev, [selectedTab]: newQuestions };
    });
  };

  // 지원서 데이터를 관리할 상태
  const [title, setTitle] = useState('');

  // 질문 미등록 모집 공고 목록 (지원 일정 불러오기용)
  const [resumeForms, setResumeForms] = useState([]);

  // 생성 모드: forms/summaries에서 선택한 지원서 (semester 사용)
  const [selectedForm, setSelectedForm] = useState(null);

  // 수정 모드: getSemesterQuestion 응답의 applicationFormId (putSemesterQuestion 파라미터용)
  const [applicationFormId, setApplicationFormId] = useState(null);

  const handleSave = async () => {
    const groups = TABS.map((tab) => {
      const track = TAB_TO_TRACK[tab];
      const questions = (questionsByTab[tab] ?? [])
        .filter((q) => q.text?.trim())
        .map((q, i) => ({ orderNumber: i + 1, content: q.text.trim() }));
      return { track, questions };
    }).filter((g) => g.questions.length > 0);

    if (groups.length === 0) {
      alert('저장할 질문이 없습니다.');
      return;
    }

    try {
      if (isEditMode) {
        if (!applicationFormId) {
          alert('지원서 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
          return;
        }
        await putSemesterQuestion(applicationFormId, { groups });
      } else {
        const semester = selectedForm?.semester;
        if (!semester) {
          alert('저장할 지원 일정을 선택해주세요.');
          return;
        }
        await postResumeQuestions(semester, { groups });
      }
      alert('저장되었습니다.');
      navigate('/admin/resume');
    } catch {
      alert('저장에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchSemesterQuestions = async () => {
      try {
        const data = await getSemesterQuestion(id);
        setTitle(`${data?.semester ?? id}기 지원서`);
        if (data?.applicationFormId) setApplicationFormId(data.applicationFormId);
        if (data?.groups) {
          const next = Object.fromEntries(
            TABS.map((tab) => [tab, [{ id: Date.now() + Math.random(), text: '' }]])
          );
          data.groups.forEach((group) => {
            const tab = TRACK_TO_TAB[group.track];
            if (tab) {
              const questions = (group.questions ?? []).map((q) => ({
                id: q.questionId ?? q.orderNumber ?? Math.random(),
                text: q.content ?? '',
              }));
              next[tab] = questions.length > 0 ? questions : [{ id: Math.random(), text: '' }];
            }
          });
          setQuestionsByTab(next);
        }
      } catch {
        setTitle(`${id}기 지원서`);
      }
    };
    if (isEditMode && id) fetchSemesterQuestions();
  }, [id, isEditMode]);

  useEffect(() => {
    const fetchResumeForms = async () => {
      const data = await getResumeForm();
      const forms = Array.isArray(data) ? data : (data?.content ?? []);
      setResumeForms(forms);
      // 지원 일정이 1개뿐이면 자동 선택
      if (forms.length === 1) {
        setSelectedForm(forms[0]);
      }
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
              onClick={handleSave}
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
              <ApplicationScheduleSection
                resumeForms={resumeForms}
                selectedForm={selectedForm}
                onSelect={setSelectedForm}
              />
            )}
            {/* 질문 분류 탭 */}
            <div className="flex items-center gap-4 mt-5">
              <span className="font-bold text-lg">질문 분류</span>
              <div className="flex border">
                {TABS.map((tab) => (
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

            <QuestionManager questions={currentQuestions} setQuestions={setCurrentTabQuestions} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

import plusIcon from '@/assets/icons/plus_icon.svg';

export default function QuestionManager({ questions, setQuestions }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleTextChange = (id, newText) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, text: newText } : q)));
  };

  const handleCheck = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === questions.length && questions.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map((q) => q.id));
    }
  };

  const deleteSelected = () => {
    setQuestions((prev) => prev.filter((q) => !selectedIds.includes(q.id)));
    setSelectedIds([]);
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '' }]);
  };

  return (
    <div className="relative flex flex-col p-10 border bg-[#EEEEEE] min-h-150 gap-6">
      {/* 1. 안내 박스 (컴포넌트 안에 포함시키는 것이 관리하기 편합니다) */}
      <div className="absolute top-8 right-8 p-4 border bg-white text-sm font-semibold leading-relaxed z-10 shadow-sm">
        <p>• 질문 등록 순서에 따라 자동으로 넘버링 됩니다.</p>
        <p>• 질문 등록 완료 후 저장 누르고 나가면 저장됩니다.</p>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={toggleSelectAll}
          className="w-24 h-10 border bg-white font-semibold hover:bg-gray-50 transition-colors"
        >
          {selectedIds.length === questions.length && questions.length > 0
            ? '선택취소'
            : '전체선택'}
        </button>

        {selectedIds.length > 0 && (
          <button
            onClick={deleteSelected}
            className="w-24 h-10 border bg-white font-semibold hover:bg-gray-50 animate-fade-in"
          >
            삭제({selectedIds.length})
          </button>
        )}
      </div>

      {/* 질문 리스트 */}
      <div className="flex flex-col gap-4">
        {questions.map((q, index) => (
          <div key={q.id} className="flex items-start gap-6 w-full group">
            <input
              type="checkbox"
              checked={selectedIds.includes(q.id)}
              onChange={() => handleCheck(q.id)}
              className="w-8 h-8 mt-4 border-2 cursor-pointer accent-navy-blue shrink-0"
            />

            <div className="flex-1 relative">
              <span className="absolute left-6 top-5 font-semibold text-lg z-10">{index + 1}.</span>

              <textarea
                value={q.text}
                onChange={(e) => handleTextChange(q.id, e.target.value)}
                placeholder="질문 내용을 입력하세요."
                className="w-full min-h-16 bg-white border flex items-center pl-14 pr-6 py-5 text-[1rem] font-medium focus:outline-none focus:ring-1 focus:ring-black resize-none leading-normal shadow-sm"
                rows={1}
                onInput={(e) => {
                  const target = e.currentTarget;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 질문 추가 버튼*/}
      <button
        onClick={addQuestion}
        className="w-full h-16 border bg-white flex justify-center items-center hover:bg-gray-50 mt-4 transition-all shadow-sm group"
      >
        <img className="w-8 h-8 flex justify-center items-center" src={plusIcon}></img>
      </button>
    </div>
  );
}

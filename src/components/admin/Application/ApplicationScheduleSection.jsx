import { useState } from 'react';

export default function ApplicationScheduleSection({ resumeForms = [], selectedForm, onSelect }) {
  const [isImportOpen, setIsImportOpen] = useState(false);

  // forms/summaries API에서 받은 질문 미등록 모집 공고 목록 (semester 사용)
  const importOptions = resumeForms.map((form) => ({
    ...form,
    id: form.applicationFormId ?? form.id,
    label: form.title ?? form.semester ?? `${form.semester}기 지원서`,
  }));

  const selectedOption = importOptions.find(
    (opt) =>
      selectedForm &&
      (String(opt.id) === String(selectedForm.id) || opt.semester === selectedForm.semester)
  );

  return (
    <div className="relative w-150">
      <button
        onClick={() => setIsImportOpen(!isImportOpen)}
        className="w-full h-12 border bg-white flex items-center px-4 justify-between font-bold text-lg"
      >
        <div className="flex items-center gap-2">
          <span className={`transition-transform ${isImportOpen ? 'rotate-180' : ''}`}>⌵</span>
          <span>{selectedOption ? selectedOption.label : '지원 일정 불러오기'}</span>
        </div>
      </button>

      {isImportOpen && (
        <ul className="absolute top-12 left-0 w-full bg-white border z-20 shadow-lg">
          {importOptions.length > 0 ? (
            importOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  setIsImportOpen(false);
                  onSelect?.(option);
                }}
                className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer font-semibold"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="p-4 text-stone-500">불러올 지원 일정이 없습니다</li>
          )}
        </ul>
      )}
    </div>
  );
}

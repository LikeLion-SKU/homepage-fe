import { useState } from 'react';

export default function ApplicationScheduleSection({ resumeForms = [] }) {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [selectedImport, setSelectedImport] = useState(null);

  // getResumeForm API에서 받은 질문 미등록 모집 공고 목록
  const importOptions = resumeForms.map((form) => ({
    id: form.applicationFormId ?? form.id,
    label: form.title ?? form.semester ?? `${form.applicationFormId ?? form.id}번 지원서`,
  }));

  return (
    // ... 상단 생략
    <div className="relative w-150">
      <button
        onClick={() => setIsImportOpen(!isImportOpen)}
        className="w-full h-12 border bg-white flex items-center px-4 justify-between font-bold text-lg"
      >
        <div className="flex items-center gap-2">
          {/* 화살표 방향 제어 */}
          <span className={`transition-transform ${isImportOpen ? 'rotate-180' : ''}`}>⌵</span>

          <span>{selectedImport ? selectedImport.label : '지원 일정 불러오기'}</span>
        </div>
      </button>

      {isImportOpen && (
        <ul className="absolute top-12 left-0 w-full bg-white border z-20 shadow-lg">
          {importOptions.length > 0 ? (
            importOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  setSelectedImport(option);
                  setIsImportOpen(false);
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

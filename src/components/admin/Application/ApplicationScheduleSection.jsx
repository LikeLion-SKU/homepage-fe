import { useState } from 'react';

export default function ApplicationScheduleSection() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  // 1. 선택된 값을 저장할 상태 추가 (기본값은 null 또는 빈 문자열)
  const [selectedImport, setSelectedImport] = useState(null);

  const importOptions = [
    '14기 아기사자 모집 지원서',
    '13기 아기사자 모집 지원서',
    '12기 아기사자 모집 지원서',
    '11기 아기사자 모집 지원서',
  ];

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

          {/* 2. 조건부 텍스트: 선택된 값이 있으면 그 값을, 없으면 기본 문구를 출력 */}
          <span>{selectedImport ? selectedImport : '지원 일정 불러오기'}</span>
        </div>
      </button>

      {isImportOpen && (
        <ul className="absolute top-12 left-0 w-full bg-white border z-20 shadow-lg">
          {importOptions.map((option) => (
            <li
              key={option}
              onClick={() => {
                // 3. 클릭 시 선택된 값 저장하고 드롭다운 닫기
                setSelectedImport(option);
                setIsImportOpen(false);
              }}
              className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer font-semibold"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

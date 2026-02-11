import { useState } from 'react';
import { useNavigate } from 'react-router';

import Calender from '@/assets/icons/calender_icon.svg';

export default function ApplicationItem({ item, onClickDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 w-full relative">
      {/* 제목 박스 */}
      <div className="flex-1 h-12 bg-white border flex items-center px-5 font-semibold">
        {item.title}
      </div>

      {/* 마감일 박스 */}
      <div className="flex items-center border bg-white h-12 px-4 gap-4">
        <span className="font-bold text-sm">마감일</span>
        <span className="text-stone-400 text-sm">{item.closeAt}</span>
        <img className="text-lg" src={Calender}></img>
      </div>

      {/* 더보기 버튼 (점 세개) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-10 h-12 border bg-white flex justify-center items-center text-xl font-bold hover:bg-gray-50"
      >
        ⋮
      </button>
      {/* 우측 수정/삭제 팝업 메뉴 */}
      {isMenuOpen && (
        <div className="absolute -right-15 top-0  bg-white border flex flex-col z-30 shadow-sm">
          <button
            onClick={() => {
              navigate(`/admin/resume/${item.id ?? item.applicationFormId}`);
              setIsMenuOpen(false);
            }}
            className=" px-3 py-2 border-b flex justify-center items-center hover:bg-gray-50"
          >
            수정
          </button>
          <button
            onClick={() => {
              onClickDelete();
              setIsMenuOpen(false);
            }}
            className=" px-3 py-2 flex justify-center items-center hover:bg-gray-50 "
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

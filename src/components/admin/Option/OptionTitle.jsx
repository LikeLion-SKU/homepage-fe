export default function OptionTitle() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center gap-5">
        <p className="text-[2.25rem] font-bold">기수 / 대회명 관리</p>
        <p className="text-[1.1rem] font-semibold">
          기수 / 대회명을 추가 또는 수정하는 페이지입니다.
        </p>
      </div>
      <div className="flex flex-col justify-center px-5 text-[1rem] font-semibold border bg-[#F9F9F9]">
        <p>1. 추가할 기수 / 대회명을 섹션에 맞게 입력</p>
        <p>2. 추가 버튼 클릭</p>
        <p>3. 추가 및 삭제 후 저장 버튼 누르기</p>
      </div>
    </div>
  );
}

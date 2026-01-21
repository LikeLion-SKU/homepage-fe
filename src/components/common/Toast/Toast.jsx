export default function Toast({ isToast }) {
  return (
    <div
      className={`fixed z-10 inset-0 flex items-center justify-center transition-all duration-500 ease-in-out
        ${
          isToast
            ? 'opacity-100  pointer-events-auto' /*토스트 온이면 배경 화이트에 투명도 적용, 블러처리,마우스 이멘트 를 토스트가 받음*/
            : 'opacity-0  pointer-events-none' /*부드럽게 가기위해 초기값을 다 0으로 설정,안보일 때는 마우스 이벤트 안 먹음 */
        }`}
    >
      <div className="flex w-97 h-13 bg-white justify-center items-center text-[1.1rem] font-bold border shadow-lg">
        마지막 프로젝트입니다.
      </div>
    </div>
  );
}

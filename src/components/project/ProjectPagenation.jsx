export default function ProjectPagenation({ props }) {
  const handlePage = (num) => {
    if (num == -1) {
      if (props.pageOn - 1 > 0) props.setPageOn(props.pageOn - 1);
    } else if (num == -2) {
      if (props.pageOn + 1 < props.maxPage) props.setPageOn(props.pageOn + 1);
    } else {
      props.setPageOn(num);
    }
  };

  const pageListChange = (isNext) => {
    if (isNext) {
      // 1. 다음 그룹의 첫 번째 페이지 계산 (현재 0~4라면 5, 5~9라면 10)
      const nextGroupPage = Math.floor(props.pageOn / 5) * 5 + 5;

      if (nextGroupPage < props.maxPage) {
        // 다음 그룹으로 갈 수 있으면 이동
        props.setPageOn(nextGroupPage);
      } else {
        // 다음 그룹이 없다면, 전체의 마지막 페이지로 이동 (maxPage - 1)
        // 현재 페이지가 이미 마지막 페이지가 아닐 때만 실행하는 것이 효율적
        if (props.pageOn < props.maxPage - 1) {
          props.setPageOn(props.maxPage - 1);
        }
      }
    } else {
      // 이전 그룹으로 가는 로직 (0 미만으로 내려가지 않게 처리)
      const prevGroupPage = Math.floor(props.pageOn / 5) * 5 - 1;
      if (prevGroupPage >= 0) {
        props.setPageOn(prevGroupPage);
      } else {
        // 이전 그룹이 없다면 첫 페이지(0)로 이동
        if (props.pageOn > 0) {
          props.setPageOn(0);
        }
      }
    }
  };

  return (
    <div className="flex gap-3 pad:gap-7 text-[0.9rem] pad:text-[1.1rem] font-semibold justify-center mt-15">
      <button onClick={() => pageListChange(false)} className="w-7 h-7">
        &lt;&lt;
      </button>
      <button onClick={() => handlePage(-1)} className="w-7 h-7">
        &lt;
      </button>
      {props.pageArray.map((num) => (
        <button
          onClick={() => handlePage(num)}
          className={`${props.pageOn == num ? 'font-bold' : 'font-medium'} w-7 h-7`}
        >
          {num + 1}
        </button>
      ))}
      <button onClick={() => handlePage(-2)} className="w-7 h-7">
        &gt;
      </button>
      <button onClick={() => pageListChange(true)} className="w-7 h-7">
        &gt;&gt;
      </button>
    </div>
  );
}

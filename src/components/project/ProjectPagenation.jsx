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

  const pageListChange = (plus) => {
    if (plus) {
      if (props.pageArray[0] + 5 < props.maxPage) {
        props.setPageArray((prev) => {
          // 1. 모든 요소에 5를 더함 (map 사용)
          const nextArray = prev.map((num) => num + 5);

          // 2. maxPage를 넘어가는 번호는 없애줌 (filter 사용)
          return nextArray.filter((num) => num < props.maxPage);
        });
        props.setPageOn(props.pageArray[0] + 5);
      } else {
        props.setPageOn(props.maxPage - 1);
      }
    } else {
      if (props.pageOn - 5 > 0) {
        if (props.pageArray.length < 5) {
          props.setPageArray((prev) => [
            prev[0] - 5,
            prev[0] - 4,
            prev[0] - 3,
            prev[0] - 2,
            prev[0] - 1,
          ]);
        } else {
          props.setPageArray((prev) => prev.map((num) => num - 5));
        }
        props.setPageOn(props.pageArray[0] - 1);
      } else {
        props.setPageOn(0);
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

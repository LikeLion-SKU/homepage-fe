export default function ProjectPagenation({ props }) {
  const handlePage = (num) => {
    if (num == -1) {
      if (props.pageOn - 1 > 0) props.setPageOn(props.pageOn - 1);
    } else if (num == 0) {
      if (props.pageOn + 1 <= props.maxPage) props.setPageOn(props.pageOn + 1);
    } else {
      props.setPageOn(num);
    }
  };
  const pageChange = (plus) => {
    if (plus) {
      if (props.pageArray[0] + 5 <= props.maxPage) {
        props.setPageArray((prev) =>
          prev.map((num) => {
            if (num + 5 <= props.maxPage) return num + 5;
          })
        );
      } else {
        if (props.pageOn - 5 > 0) {
          if (props.pageArray.length < 5) {
            props.setPageArray([
              props.pageOn - 5,
              props.pageOn - 4,
              props.pageOn - 3,
              props.pageOn - 2,
              props.pageOn - 1,
            ]);
          } else {
            props.setPageArray((prev) => prev.map((num) => num + 5));
          }
        }
      }
    }
  };

  return (
    <div className="flex gap-5 text-[1.1rem] font-semibold justify-center mt-15">
      <button onClick={() => pageChange(false)} className="w-7 h-7">
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
          {num}
        </button>
      ))}
      <button onClick={() => handlePage(0)} className="w-7 h-7">
        &gt;
      </button>
      <button onClick={() => pageChange(true)} className="w-7 h-7">
        &gt;&gt;
      </button>
    </div>
  );
}

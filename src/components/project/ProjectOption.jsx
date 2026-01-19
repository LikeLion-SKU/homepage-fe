export default function ProjectOption() {
  const ordirnalNum = ['전체', '14기', '13기', '12기', '11기'];
  const contestName = [
    '전체',
    '중앙해커톤',
    '아이디어톤',
    '4호선톤',
    '트렌디톤',
    '블라블라',
    '블블라',
  ];
  return (
    <div className="flex gap-15">
      <details className="relative z-50 group">
        <summary className="flex w-28 h-10 list-none bg-[#D9D9D9] border justify-center items-center text-[1rem] font-bold">
          기수별<span className="mb-2 ml-2">⌵</span>
        </summary>
        <ul className="flex flex-col absolute items-center w-28 px-3 bg-[#D9D9D9] mt-2 text-[1rem] font-bold divide-y divide-black border">
          {ordirnalNum.map((num) => (
            <li className="w-22 text-[1rem] text-center py-3">{num}</li>
          ))}
        </ul>
      </details>
      <div className="flex w-180 text-[1rem] font-bold gap-15 items-center overflow-x-auto no-scrollbar">
        {contestName.map((name) => (
          <div className="flex shrink-0">{name}</div>
        ))}
      </div>
    </div>
  );
}

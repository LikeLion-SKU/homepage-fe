export default function ProjectCard({ props }) {
  return (
    <div className="flex flex-col w-101 h-86 border">
      <img src={props.imgUrl} className="h-55 w-101" />
      <div className="flex flex-col gap-3 w-101 h-29 p-5 ">
        <div className="flex justify-between items-center   ">
          <p className="text-[1.1rem] font-bold">{props.projectName}</p>
          <div className="flex gap-1">
            <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center">
              수상작
            </div>
            <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center">
              {props.ordinalNumber}기
            </div>
            <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center">
              {props.contestName}
            </div>
          </div>
        </div>
        <p className="text-[0.9rem]">{props.explanation}</p>
      </div>
    </div>
  );
}

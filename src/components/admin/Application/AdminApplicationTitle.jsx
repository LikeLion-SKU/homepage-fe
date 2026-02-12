export default function AdminApplicationTitle({ props, children = null }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex items-center ">
          <p className="text-[2rem] font-bold">{props.title}</p>
          {props.button && <div className="pl-6">{props.button}</div>}
        </div>

        <p className="w-100 h-15 text-[1.1rem] font-semibold">{props.explain}</p>
        {children}
      </div>
      {props.rule.length > 0 && (
        <div className="flex flex-col justify-center pl-5 w-80 h-26 bg-[#F9F9F9] border">
          {props.rule.map((string) => (
            <p key={string} className="text-[1rem] font-semibold">
              {string}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

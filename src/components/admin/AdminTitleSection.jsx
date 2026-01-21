export default function AdminTitleSection({ props, children }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5.5">
          <p className="text-[2rem] font-bold">{props.title}</p>
          {children}
        </div>
        <p className="w-100 h-15 text-[1.1rem] font-semibold">{props.explain}</p>
      </div>
      {props.rule.length > 0 && (
        <div className="flex flex-col items-center justify-center w-92 h-26 bg-[#F9F9F9] border">
          {props.rule.map((string) => (
            <p className="text-[1rem] font-semibold">{string}</p>
          ))}
        </div>
      )}
    </div>
  );
}

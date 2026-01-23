export default function PageTitle({ title, width = '156px', color = 'black' }) {
  return (
    <div
      style={{ width: width, borderColor: color, color: color }}
      className="relative h-15 border-[1.5px] text-[2.25rem] font-bold text-center"
    >
      {title}
      <span style={{ backgroundColor: color }} className="absolute -top-1 -left-1 w-2 h-2"></span>
      <span style={{ backgroundColor: color }} className="absolute -top-1 -right-1 w-2 h-2"></span>
      <span
        style={{ backgroundColor: color }}
        className="absolute -bottom-1 -left-1 w-2 h-2"
      ></span>
      <span
        style={{ backgroundColor: color }}
        className="absolute -bottom-1 -right-1 w-2 h-2"
      ></span>
    </div>
  );
}

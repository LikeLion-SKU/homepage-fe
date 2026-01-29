export default function PageTitle({ title, color = 'black' }) {
  return (
    <div
      style={{ borderColor: color, color: color }}
      className="flex w-fit relative items-center px-3.5 pad:px-4.5 h-8 pad:h-15 border-[1.5px] text-[1.4rem] pad:text-[2.25rem] font-bold text-center"
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

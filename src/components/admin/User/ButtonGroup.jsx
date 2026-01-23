export default function ButtonGroup({ buttonData }) {
  return (
    <div className="flex gap-3">
      {buttonData.map((name) => (
        <button className="h-9.5 text-[1.1rem] text-center items-center border px-6">{name}</button>
      ))}
    </div>
  );
}

export default function MemberOption({ optionData }) {
  return (
    <div className="flex gap-4.5">
      {optionData.map((string) => (
        <button className="w-23 h-11 border text-center items-center text-[1.1rem]">
          {string}
        </button>
      ))}
    </div>
  );
}

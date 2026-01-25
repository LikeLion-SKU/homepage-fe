export default function MemberOption({ optionData, selectedOption, setSelectedOption }) {
  return (
    <div className="flex gap-4.5">
      {optionData.map((name, index) => (
        <button
          onClick={() => setSelectedOption(name)}
          key={index}
          className={`w-23 h-11 border text-center items-center text-[1.1rem] 
        ${selectedOption == name ? 'bg-[#D8D8D8]' : 'bg-white'}`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

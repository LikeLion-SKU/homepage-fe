export default function ButtonGroup({ buttonData, isCheck, setIsCheck }) {
  const handleCheck = (name) => {
    if (isCheck == name) {
      setIsCheck('');
    } else {
      setIsCheck(name);
    }
  };
  return (
    <div className="flex gap-3">
      {buttonData.map((name, index) => (
        <button
          key={index}
          onClick={() => handleCheck(name)}
          className={`h-9.5 text-[1.1rem] text-center items-center border px-6 ${isCheck == name ? 'bg-[#CBCBCB]' : 'bg-white'}`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

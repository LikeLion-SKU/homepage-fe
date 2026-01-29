export default function TextTile({ children }) {
  return (
    <div
      className="flex py-10 px-11 text-center justify-center items-center bg-[#F9F9F9] 
        whitespace-pre-line test-[0.8rem] pad:text-[1rem] pad:font-semibold drop-shadow-[5px_5px_0px_#E1E1E1]"
    >
      {children}
    </div>
  );
}

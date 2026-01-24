export default function TextTile({ children, width = '744px', height = '360px' }) {
  return (
    <div
      style={{ width: width, height: height }}
      className="flex justify-center items-center bg-[#F9F9F9] 
        whitespace-pre-line text-[1rem] drop-shadow-[5px_5px_0px_#E1E1E1]"
    >
      {children}
    </div>
  );
}

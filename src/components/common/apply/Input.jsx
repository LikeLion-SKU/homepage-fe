export default function Input({ label, placeholder, type, className }) {
  return (
    <div className="self-stretch flex flex-col gap-3">
      <label className="font-['Pretendard']">{label}</label>
      <input type={type} placeholder={placeholder} className={className}></input>
    </div>
  );
}

export default function Input({ name, label, placeholder, type, className, value, onChange }) {
  return (
    <div className="self-stretch flex flex-col gap-3">
      <label className="text-lg font-semi-bold">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
}

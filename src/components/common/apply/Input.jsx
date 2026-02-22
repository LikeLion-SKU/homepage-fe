export default function Input({
  name,
  label,
  placeholder,
  type,
  className,
  value,
  onChange,
  ...props
}) {
  return (
    <div className="self-stretch flex flex-col gap-3">
      <label className="pad:text-lg text-sm font-bold">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        {...props}
      ></input>
    </div>
  );
}

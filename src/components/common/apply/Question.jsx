export default function Question({ question, className, value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="self-stretch text-lg font-semibold">{question}</div>

      <textarea className={className} value={value} onChange={onChange}></textarea>

      <div>{value?.length || 0}/500</div>
    </div>
  );
}

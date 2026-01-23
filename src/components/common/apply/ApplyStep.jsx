export default function ApplyStep({ step, stepName, lineStyle, stepStyle, stepNameStyle }) {
  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className={lineStyle} />
          <div className={stepStyle}>{step}</div>
          <div className={stepNameStyle}>{stepName}</div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectMember({ memberData }) {
  return (
    <div className="flex flex-col px-8 py-9 border w-84 h-58 gap-3">
      {Object.entries(memberData).map(([track, names]) => (
        <div key={track} className="flex w-68 text-[1rem] font-semibold">
          <p>{track}</p>
          <div className="flex gap-x-5 w-46 ml-auto flex-wrap">
            {names.map((name, idx) => (
              <p key={idx}>{name}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

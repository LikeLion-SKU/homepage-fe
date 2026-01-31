export default function ProjectMember({ memberData }) {
  return (
    <div className="flex flex-col w-full pad:w-58 web:w-84 px-4 pad:px-6 web:px-8 py-3 pad:py-5 web:py-9 border gap-3">
      {Object.entries(memberData).map(([track, names]) => (
        <div key={track} className="flex gap-3 pad:gap-5 web:gap-9">
          <p className="text-[0.7rem] w-20  web:text-[1rem] font-semibold pad:font-medium web:font-semibold">
            {track}
          </p>
          <div className="flex gap-x-5 w-full flex-wrap text-[0.7rem] web:text-[1rem]">
            {names.map((name, idx) => (
              <p key={idx}>{name}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

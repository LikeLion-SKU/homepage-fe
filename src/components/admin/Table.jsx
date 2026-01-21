import TableCard from '@/components/admin/TableCard';

export default function Table({ option, cardData, width, isChecked }) {
  return (
    <div style={{ width: width }} className="flex flex-col border">
      <div className="flex pl-40 pr-16 h-20 justify-between items-center font-semibold border-b">
        {option.map((name) => (
          <p>{name}</p>
        ))}
      </div>
      <div className="flex flex-col ">
        {cardData.length > 0 &&
          cardData.map((data, index) => (
            <>
              <TableCard data={data} width={width} isChecked={isChecked} />
              {index <= data.length - 1 && <hr className="divider border-[#BDBDBD]" />}
            </>
          ))}
      </div>
    </div>
  );
}

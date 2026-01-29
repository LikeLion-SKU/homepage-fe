import { useState } from 'react';

//@ts-ignore
import Check from '@/assets/icons/check_icon.svg?react';
import PageTitle from '@/components/common/PageTitle';
import TextTile from '@/components/result/TextTile';
import TimeBar from '@/components/result/TimeBar';

export default function InterviewTime({ setAllChecked }) {
  const money = `멋쟁이사자처럼 12기 부원들께서는 
  장소 대관, 행사 운영 등을 위해
  5만원(회비 45000원 + 보증금 5000원)의
  운영비를 납부하셔야 합니다.

  운영비 사용 내역은 투명하게 공개됩니다.

  보증금은 1년이 지난 후 돌려드리며 ( 세션 참석 장려용 )
  세션 3회 불참 시 보증금은 돌려드리지 않습니다.`;
  const contents = `매주 월요일 18시30분~20시30분 세션 필참

  3월 21일(목) 18시 : 전체 OT 참여 권장

  3월 11일(월) 교내 OT 필참
  5월 중 진행될 아이디어톤 필참
  8월 중 진행될 중앙해커톤 필참

  위 활동 불참 시 불이익이 있을 수 있습니다.`;
  const [isCheck, setIsCheck] = useState([false, false]);
  const isAllCheck = (num) => {
    let nextCheck0 = isCheck[0];
    let nextCheck1 = isCheck[1];
    if (num === 1) {
      nextCheck0 = !isCheck[0];
    } else {
      nextCheck1 = !isCheck[1];
    }
    setIsCheck([nextCheck0, nextCheck1]);

    if (nextCheck0 && nextCheck1) {
      setAllChecked((prev) => prev.map((item, index) => (index === 1 ? true : item)));
    } else {
      setAllChecked((prev) => prev.map((item, index) => (index === 1 ? false : item)));
    }
  };
  const interviewTimeData = [
    {
      date: '3월 10일 [월요일]',
      startTime: ['6:00', '6:30', '7:00', '7:30'],
      endTime: ['6:30', '7:00', '7:30', '8:00'],
      available: [0, 1, 1, 1],
    },
    {
      date: '3월 11일 [화요일]',
      startTime: ['6:00', '6:30', '7:00', '7:30'],
      endTime: ['6:30', '7:00', '7:30', '8:00'],
      available: [0, 1, 1, 0],
    },
  ];
  const [selectedTime, setSelectedTime] = useState({ date: '', starTime: '' });

  return (
    <div className="flex flex-col gap-20 items-center mt-30 px-8">
      <div className="flex">
        <PageTitle title="면접 날짜 선택" color="Navy" />
      </div>
      <div className="flex flex-col gap-13 ">
        {interviewTimeData.map((data) => (
          <TimeBar
            setAllChecked={setAllChecked}
            data={data}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        ))}
      </div>
      <div className="flex gap-13 mt-25 flex-wrap justify-center">
        <TextTile>
          <div className="flex flex-col gap-10">
            <p className="text-[1rem] pad:text-[1.5rem] font-bold text-start">
              회비 및 보증금 제도 동의 여부
            </p>
            <div className="flex text-start text-[0.7rem] pad:text-[1rem] pad:mr-20">{money}</div>
            <button onClick={() => isAllCheck(1)} className="flex items-center gap-3 h-10">
              <div className="flex w-4 h-4 pad:w-5 pad:h-5 border items-center justify-center">
                {isCheck[0] && <Check className="w-2 h-2 pad:w-3 pad:h-3" />}
              </div>
              <p className="text-[0.8rem] pad:text-[1.1rem]">회비 및 보증금 제도에 동의합니다.</p>
            </button>
          </div>
        </TextTile>
        <TextTile>
          <div className="flex flex-col gap-10">
            <p className="text-[1rem] pad:text-[1.5rem] font-bold text-start">
              회비 및 보증금 제도 동의 여부
            </p>
            <div className="flex text-start text-[0.7rem] pad:text-[1rem] pad:mr-20">
              {contents}
            </div>
            <button onClick={() => isAllCheck(2)} className="flex items-center gap-3 h-10">
              <div className="flex w-4 h-4 pad:w-5 pad:h-5 border items-center justify-center">
                {isCheck[1] && <Check className="w-2 h-2 pad:w-3 pad:h-3" />}
              </div>
              <p className="text-[0.8rem] pad:text-[1.1rem]">회비 및 보증금 제도에 동의합니다.</p>
            </button>
          </div>
        </TextTile>
      </div>
    </div>
  );
}

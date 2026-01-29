import { useState } from 'react';

import scheduleBlahIcon from '@/assets/icons/main/schedule/2026-blah.svg';
import aprilIcon from '@/assets/icons/main/schedule/april.svg';
import augustIcon from '@/assets/icons/main/schedule/august.svg';
import decemberIcon from '@/assets/icons/main/schedule/december.svg';
import dinoIcon from '@/assets/icons/main/schedule/dino.svg';
import doteC5Icon from '@/assets/icons/main/schedule/dote-c5.svg';
import doteC7Icon from '@/assets/icons/main/schedule/dote-c7.svg';
import doteC9Icon from '@/assets/icons/main/schedule/dote-c9.svg';
import doteC11Icon from '@/assets/icons/main/schedule/dote-c11.svg';
import doteLIcon from '@/assets/icons/main/schedule/dote-l.svg';
import doteM1Icon from '@/assets/icons/main/schedule/dote-m1.svg';
import doteM2Icon from '@/assets/icons/main/schedule/dote-m2.svg';
import doteM3Icon from '@/assets/icons/main/schedule/dote-m3.svg';
import doteM4Icon from '@/assets/icons/main/schedule/dote-m4.svg';
import doteM5Icon from '@/assets/icons/main/schedule/dote-m5.svg';
import doteSIcon from '@/assets/icons/main/schedule/dote-s.svg';
import dotSquareIcon from '@/assets/icons/main/schedule/dote-square.svg';
import julyIcon from '@/assets/icons/main/schedule/july.svg';
import juneIcon from '@/assets/icons/main/schedule/june.svg';
import marchIcon from '@/assets/icons/main/schedule/march.svg';
import mayIcon from '@/assets/icons/main/schedule/may.svg';
import novemberIcon from '@/assets/icons/main/schedule/november.svg';
import octoberIcon from '@/assets/icons/main/schedule/october.svg';
import sebtemberIcon from '@/assets/icons/main/schedule/sebtember.svg';
import umbrellaIcon from '@/assets/icons/main/schedule/umbrella.svg';
import useScale from '@/components/main/hooks/useScale';
import MainSectionLayout from '@/components/main/layout';
import ScheduleModal from '@/components/main/schedule/modal/ScheduleModal';
import { scheduleMonthData } from '@/components/main/schedule/scheduleModalData';

function Schedule() {
  const scale = useScale();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMonthClick = (monthName) => {
    setSelectedMonth(monthName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMonth(null);
  };

  // 현재 선택된 월의 데이터 (배열 형태)
  const currentMonthData = selectedMonth
    ? scheduleMonthData[selectedMonth] || []
    : scheduleMonthData['3월'] || [];

  // 월별 아이콘 데이터
  const months = [
    { icon: marchIcon, name: '3월' },
    { icon: aprilIcon, name: '4월' },
    { icon: mayIcon, name: '5월' },
    { icon: juneIcon, name: '6월' },
    { icon: julyIcon, name: '7월' },
    { icon: augustIcon, name: '8월' },
    { icon: sebtemberIcon, name: '9월' },
    { icon: octoberIcon, name: '10월' },
    { icon: novemberIcon, name: '11월' },
    { icon: decemberIcon, name: '12월' },
  ];

  return (
    <MainSectionLayout title="2026 연간 일정" showTopBorder={false} paddingBottomScale={0.2}>
      <div className="relative" style={{ minHeight: `${(800 / 16) * scale}rem` }}>
        {/* 타이틀 옆 장식 아이콘 (개별 위치 조정 가능) */}
        <img
          src={scheduleBlahIcon}
          alt="schedule blah"
          className="absolute pointer-events-none"
          style={{
            left: `${(210 / 16) * scale}rem`,
            top: `${(-225 / 16) * scale}rem`,
            width: `${(159 / 16) * scale}rem`,
            height: 'auto',
            zIndex: 30,
          }}
        />
        {/* 프레임 텍스트 아래 40px에 가로로 나열 */}
        <div
          className="flex items-center"
          style={{
            marginTop: `${(55 / 16) * scale}rem`,
            marginLeft: `${(-5 / 16) * scale}rem`,
            gap: `${(16 / 16) * scale}rem`,
          }}
        >
          <img
            src={doteSIcon}
            alt="dote-s"
            className="h-auto"
            style={{
              width: `${(80 / 16) * scale}rem`,
              marginRight: `${(65 / 16) * scale}rem`,
            }}
          />
          <img
            src={doteM2Icon}
            alt="dote-m2"
            className="h-auto"
            style={{
              width: `${(250 / 16) * scale}rem`,
              marginLeft: `${(20 / 16) * scale}rem`,
            }}
          />
          <img
            src={aprilIcon}
            alt="april"
            className="cursor-pointer"
            onClick={() => handleMonthClick('4월')}
            style={{
              width: `${(65 / 16) * scale}rem`,
              height: `${(60 / 16) * scale}rem`,
              marginRight: `${(10 / 16) * scale}rem`,
            }}
          />
          <img
            src={doteM5Icon}
            alt="dote-m5"
            className="h-auto"
            style={{
              width: `${(300 / 16) * scale}rem`,
              marginRight: `${(-6 / 16) * scale}rem`,
            }}
          />
        </div>
        {/* march, may 높이에서 50px 아래에 가로로 나열 */}
        <div
          className="flex items-center"
          style={{
            marginTop: `${(5 / 16) * scale}rem`,
            marginLeft: `${(-55 / 16) * scale}rem`,
            gap: `${(16 / 16) * scale}rem`,
          }}
        >
          <img
            src={doteC7Icon}
            alt="dote-c7"
            className="h-auto"
            style={{
              width: `${(350 / 16) * scale}rem`,
              marginTop: `${(95 / 16) * scale}rem`,
            }}
          />
          <img
            src={julyIcon}
            alt="july"
            className="cursor-pointer"
            onClick={() => handleMonthClick('7월')}
            style={{
              width: `${(60 / 16) * scale}rem`,
              height: `${(60 / 16) * scale}rem`,
              marginTop: `${(-100 / 16) * scale}rem`,
            }}
          />
          <img
            src={doteM3Icon}
            alt="dote-m3"
            className="h-auto"
            style={{
              width: `${(270 / 16) * scale}rem`,
              marginTop: `${(-110 / 16) * scale}rem`,
            }}
          />
        </div>
        {/* june, july 높이에서 50px 아래에 가로로 나열 */}
        <div
          className="flex items-center"
          style={{
            marginTop: `${(-75 / 16) * scale}rem`,
            marginLeft: `${(105 / 16) * scale}rem`,
            gap: `${(16 / 16) * scale}rem`,
          }}
        >
          <img
            src={augustIcon}
            alt="august"
            className="cursor-pointer"
            onClick={() => handleMonthClick('8월')}
            style={{
              width: `${(60 / 16) * scale}rem`,
              height: `${(60 / 16) * scale}rem`,
            }}
          />
          <img
            src={doteM5Icon}
            alt="dote-m5"
            className="h-auto"
            style={{
              width: `${(280 / 16) * scale}rem`,
            }}
          />
          <img
            src={sebtemberIcon}
            alt="september"
            className="cursor-pointer"
            onClick={() => handleMonthClick('9월')}
            style={{
              width: `${(60 / 16) * scale}rem`,
              height: `${(60 / 16) * scale}rem`,
            }}
          />
        </div>
        {/* august 높이에서 60px 아래에 가로로 나열 */}
        <div
          className="flex items-center"
          style={{
            marginTop: `${(60 / 16) * scale}rem`,
            marginLeft: `${(25 / 16) * scale}rem`,
            gap: `${(16 / 16) * scale}rem`,
          }}
        ></div>
        {/* november 아이콘 독립적으로 배치 */}
        <img
          src={novemberIcon}
          alt="november"
          className="absolute cursor-pointer"
          onClick={() => handleMonthClick('11월')}
          style={{
            width: `${(100 / 16) * scale}rem`,
            height: `${(70 / 16) * scale}rem`,
            left: `${(215 / 16) * scale}rem`,
            top: `${(440 / 16) * scale}rem`,
          }}
        />
        {/* november 높이에서 50px 아래에 가로로 나열 */}
        <div
          className="flex items-center"
          style={{
            marginTop: `${(52 / 16) * scale}rem`,
            marginLeft: `${(525 / 16) * scale}rem`,
            gap: `${(16 / 16) * scale}rem`,
          }}
        >
          <img
            src={doteLIcon}
            alt="dote-l"
            className="h-auto"
            style={{
              width: `${(380 / 16) * scale}rem`,
              marginTop: `${(112 / 16) * scale}rem`,
            }}
          />
        </div>
        {/* dot-square 아이콘 독립적으로 배치 (dote-s 왼쪽) */}
        <img
          src={dotSquareIcon}
          alt="dot-square"
          className="absolute"
          style={{
            width: `${(60 / 16) * scale}rem`,
            height: `${(60 / 16) * scale}rem`,
            left: `${(-74 / 16) * scale}rem`,
            top: `${(2 / 16) * scale}rem`,
          }}
        />
        {/* umbrella 아이콘 독립적으로 배치 (august 왼쪽) */}
        <img
          src={umbrellaIcon}
          alt="umbrella"
          className="absolute"
          style={{
            width: `${(40 / 16) * scale}rem`,
            height: `${(60 / 16) * scale}rem`,
            left: `${(-70 / 16) * scale}rem`,
            top: `${(230 / 16) * scale}rem`,
          }}
        />
        {/* dino 아이콘 독립적으로 배치 (dote-l 왼쪽) */}
        <img
          src={dinoIcon}
          alt="dino"
          className="absolute"
          style={{
            width: `${(45 / 16) * scale}rem`,
            height: `${(60 / 16) * scale}rem`,
            left: `${(460 / 16) * scale}rem`,
            top: `${(570 / 16) * scale}rem`,
          }}
        />
        {/* march 아이콘 독립적으로 배치 */}
        <img
          src={marchIcon}
          alt="march"
          className="absolute cursor-pointer"
          onClick={() => handleMonthClick('3월')}
          style={{
            width: `${(100 / 16) * scale}rem`,
            height: `${(100 / 16) * scale}rem`,
            left: `${(90 / 16) * scale}rem`, // doteSIcon(-20) + doteSIcon width(80) + marginRight(10)
            top: `${(-4 / 16) * scale}rem`,
          }}
        />
        {/* may 아이콘 독립적으로 배치 */}
        <img
          src={mayIcon}
          alt="may"
          className="absolute cursor-pointer"
          onClick={() => handleMonthClick('5월')}
          style={{
            width: `${(100 / 16) * scale}rem`,
            height: `${(100 / 16) * scale}rem`,
            left: `${(820 / 16) * scale}rem`, // doteM5Icon 위치 계산
            top: `${(-35 / 16) * scale}rem`,
            zIndex: 10,
            pointerEvents: 'auto',
          }}
        />
        {/* june 아이콘 독립적으로 배치 */}
        <img
          src={juneIcon}
          alt="june"
          className="absolute cursor-pointer"
          onClick={() => handleMonthClick('6월')}
          style={{
            width: `${(100 / 16) * scale}rem`,
            height: `${(100 / 16) * scale}rem`,
            left: `${(675 / 16) * scale}rem`, // doteM3Icon 위치 계산
            top: `${(105 / 16) * scale}rem`, // marginTop(5) + marginTop(-100)
          }}
        />
        {/* october 아이콘 독립적으로 배치 */}
        <img
          src={octoberIcon}
          alt="october"
          className="absolute cursor-pointer"
          onClick={() => handleMonthClick('10월')}
          style={{
            width: `${(160 / 16) * scale}rem`,
            height: `${(100 / 16) * scale}rem`,
            left: `${(550 / 16) * scale}rem`, // marginLeft(25) + marginLeft(535)
            top: `${(420 / 16) * scale}rem`, // marginTop(60) + marginTop(33)
            zIndex: 10,
            pointerEvents: 'auto',
          }}
        />
        {/* december 아이콘 독립적으로 배치 */}
        <img
          src={decemberIcon}
          alt="december"
          className="absolute cursor-pointer"
          onClick={() => handleMonthClick('12월')}
          style={{
            width: `${(100 / 16) * scale}rem`,
            height: `${(100 / 16) * scale}rem`,
            left: `${(927 / 16) * scale}rem`, // marginLeft(525) + doteLIcon width(380) + gap(16) + gap(4)
            top: `${(532 / 16) * scale}rem`,
          }}
        />
        {/* dote-m1 아이콘 독립적으로 배치 */}
        <img
          src={doteM1Icon}
          alt="dote-m1"
          className="absolute h-auto"
          style={{
            width: `${(230 / 16) * scale}rem`,
            left: `${(320 / 16) * scale}rem`,
            top: `${(450 / 16) * scale}rem`,
          }}
        />
        {/* dote-c11 아이콘 독립적으로 배치 */}
        <img
          src={doteC11Icon}
          alt="dote-c11"
          className="absolute h-auto"
          style={{
            width: `${(380 / 16) * scale}rem`,
            left: `${(60 / 16) * scale}rem`,
            top: `${(480 / 16) * scale}rem`,
          }}
        />
        {/* dote-c9 아이콘 독립적으로 배치 */}
        <img
          src={doteC9Icon}
          alt="dote-c9"
          className="absolute h-auto"
          style={{
            width: `${(280 / 16) * scale}rem`,
            left: `${(560 / 16) * scale}rem`,
            top: `${(300 / 16) * scale}rem`,
          }}
        />
        {/* dote-c5 아이콘 독립적으로 배치 */}
        <img
          src={doteC5Icon}
          alt="dote-c5"
          className="absolute h-auto"
          style={{
            width: `${(300 / 16) * scale}rem`,
            left: `${(755 / 16) * scale}rem`,
            top: `${(10 / 16) * scale}rem`,
          }}
        />
        {/* 월별 아이콘들을 세로로 배치 - 기존 아이콘들 제거 */}
        <div
          className="flex flex-col"
          style={{
            paddingLeft: `${(100 / 16) * scale}rem`,
            marginTop: `${(80 / 16) * scale}rem`,
            gap: `${(32 / 16) * scale}rem`,
          }}
        >
          {months.map((month, index) => {
            // 가로 레이아웃으로 이동한 아이콘들 제외
            if (index === 0 && month.name === '3월') return null;
            if (index === 1 && month.name === '4월') return null;
            if (index === 2 && month.name === '5월') return null;
            if (index === 3 && month.name === '6월') return null;
            if (index === 4 && month.name === '7월') return null;
            if (index === 5 && month.name === '8월') return null;
            if (index === 6 && month.name === '9월') return null;
            if (index === 7 && month.name === '10월') return null;
            if (index === 8 && month.name === '11월') return null;
            if (index === 9 && month.name === '12월') return null;

            return (
              <div
                key={month.name}
                className="relative flex items-center"
                style={{ gap: `${(40 / 16) * scale}rem` }}
              >
                {/* 월 아이콘 */}
                <img
                  src={month.icon}
                  alt={month.name}
                  style={{
                    width: `${(60 / 16) * scale}rem`,
                    height: `${(60 / 16) * scale}rem`,
                  }}
                />
                {/* 점 아이콘들 - 위치에 따라 다른 크기 사용 */}
                <div className="flex items-center" style={{ gap: `${(16 / 16) * scale}rem` }}>
                  {index === 6 && (
                    <img
                      src={doteM4Icon}
                      alt="dot"
                      className="h-auto"
                      style={{ width: `${(150 / 16) * scale}rem` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalData={currentMonthData}
        modalGap={40}
        overlayBgColor="rgba(0, 0, 0, 0.5)"
        overlayOpacity={0.7}
        titleBarBgColor="#FFFFFF"
        titleBarIconBoxColor="#00156A"
        titleBarTitleBoxColor="#B3B3B3"
        titleBarBoxSize={1}
        placeholderBgColor="#636363"
        placeholderHeight="280px"
        placeholderPaddingHorizontal="29.3px"
        placeholderPaddingTop="20px"
        textTitleColor="#1a1a1a"
        textDescriptionColor="#1a1a1a"
        textBgColor="#FFFFFF"
        windowBgColor="#FFFFFF"
        windowBorderColor="#A8A8A8"
        windowBorderWidth={2.5}
        scale={scale}
      />
    </MainSectionLayout>
  );
}

export default Schedule;

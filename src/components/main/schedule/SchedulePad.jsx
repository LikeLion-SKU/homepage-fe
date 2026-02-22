import scheduleBlahIcon from '@/assets/icons/main/schedule/2026-blah.svg';
import aprilIcon from '@/assets/icons/main/schedule/april.svg';
import augustIcon from '@/assets/icons/main/schedule/august.svg';
import decemberIcon from '@/assets/icons/main/schedule/december.svg';
import dinoIcon from '@/assets/icons/main/schedule/dino.svg';
import doteP5Icon from '@/assets/icons/main/schedule/dote-p5.svg';
import dotePc7Icon from '@/assets/icons/main/schedule/dote-p7.svg';
import doteP9Icon from '@/assets/icons/main/schedule/dote-p9.svg';
import doteP11Icon from '@/assets/icons/main/schedule/dote-p11.svg';
import doteP3Icon from '@/assets/icons/main/schedule/dote-p-3.svg';
import doteP6Icon from '@/assets/icons/main/schedule/dote-p-6.svg';
import doteP7Icon from '@/assets/icons/main/schedule/dote-p-7.svg';
import doteP10Icon from '@/assets/icons/main/schedule/dote-p-10.svg';
import doteP13Icon from '@/assets/icons/main/schedule/dote-p-13.svg';
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
import ClickBox from '@/components/main/schedule/ClickBox';

function SchedulePad({ onMonthClick }) {
  // ScheduleDesktop과 동일한 baseWidth 사용하여 일관된 스케일 계산
  const scale = useScale();
  const CLICKBOX_OFFSET = {
    '3월': { x: -30, y: -10 },
    '4월': { x: 0, y: 0 },
    '5월': { x: 20, y: 45 },
    '6월': { x: -35, y: 30 },
    '7월': { x: 0, y: -5 },
    '8월': { x: 0, y: 0 },
    '9월': { x: 0, y: -5 },
    '10월': { x: -50, y: 55 },
    '11월': { x: -5, y: -5 },
    '12월': { x: -5, y: -5 },
  };

  return (
    <div className="relative" style={{ minHeight: `${(800 / 16) * scale}rem` }}>
      {/* 타이틀 옆 장식 아이콘 (개별 위치 조정 가능) */}
      <img
        src={scheduleBlahIcon}
        alt="schedule blah"
        className="absolute pointer-events-none"
        style={{
          left: `${(210 / 16) * scale}rem`,
          top: `${(-275 / 16) * scale}rem`,
          width: `${(140 / 16) * scale}rem`,
          height: 'auto',
          zIndex: 30,
        }}
      />
      {/* 모든 요소를 하나의 섹션으로 묶어서 아래로 이동 */}
      <div
        className="relative"
        style={{ marginTop: `${(75 / 16) * scale}rem`, marginLeft: `${(-30 / 16) * scale}rem` }}
      >
        {/* dot-square 아이콘 독립적으로 배치 (dote-s 왼쪽) */}
        <img
          src={dotSquareIcon}
          alt="dot-square"
          className="absolute"
          style={{
            width: `${(70 / 16) * scale}rem`,
            height: `${(70 / 16) * scale}rem`,
            left: `${(-90 / 16) * scale}rem`,
            top: `${(45 / 16) * scale}rem`,
          }}
        />
        {/* dote-p-3 독립적으로 배치 */}
        <img
          src={doteP3Icon}
          alt="dote-p-3"
          className="absolute h-auto"
          style={{
            width: `${(100 / 16) * scale}rem`,
            left: `${(-10 / 16) * scale}rem`,
            top: `${(60 / 16) * scale}rem`,
          }}
        />
        {/* march 아이콘과 click-box를 하나의 섹션으로 묶어서 배치 */}
        <div
          className="absolute group"
          style={{
            left: `${(105 / 16) * scale}rem`,
            top: `${(40 / 16) * scale}rem`,
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['3월'].x}
            offsetYPx={CLICKBOX_OFFSET['3월'].y}
          />
          {/* march 아이콘 */}
          <img
            src={marchIcon}
            alt="march"
            className="relative cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('3월')}
            style={{
              width: `${(120 / 16) * scale}rem`,
              height: `${(120 / 16) * scale}rem`,
            }}
          />
        </div>
        {/* dote-p-6 독립적으로 배치 */}
        <img
          src={doteP6Icon}
          alt="dote-p-6"
          className="absolute h-auto"
          style={{
            width: `${(220 / 16) * scale}rem`,
            left: `${(210 / 16) * scale}rem`, // -5 + 95 + 65 + 16(gap) - 5
            top: `${(58 / 16) * scale}rem`,
          }}
        />
        {/* april */}
        <div
          className="absolute group"
          style={{
            width: `${(85 / 16) * scale}rem`,
            height: `${(85 / 16) * scale}rem`,
            left: `${(460 / 16) * scale}rem`, // -5 + 95 + 65 + 16 + 60 + 250 + 16 - 5
            top: `${(40 / 16) * scale}rem`,
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['4월'].x}
            offsetYPx={CLICKBOX_OFFSET['4월'].y}
          />
          <img
            src={aprilIcon}
            alt="april"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('4월')}
          />
        </div>
        {/* dote-p-10 (dote-m5) 독립적으로 배치 */}
        <img
          src={doteP10Icon}
          alt="dote-p-10"
          className="absolute h-auto"
          style={{
            width: `${(350 / 16) * scale}rem`,
            left: `${(580 / 16) * scale}rem`, // -5 + 95 + 65 + 16 + 60 + 250 + 16 + 20 + 75 + 16 - 5
            top: `${(55 / 16) * scale}rem`,
          }}
        />
        {/* may */}
        <div
          className="absolute group"
          style={{
            width: `${(125 / 16) * scale}rem`,
            height: `${(125 / 16) * scale}rem`,
            left: `${(900 / 16) * scale}rem`,
            top: `${(1 / 16) * scale}rem`,
            zIndex: 10,
            pointerEvents: 'auto',
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['5월'].x}
            offsetYPx={CLICKBOX_OFFSET['5월'].y}
          />
          <img
            src={mayIcon}
            alt="may"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('5월')}
          />
        </div>
        {/* dote-c5 */}
        <img
          src={doteP5Icon}
          alt="dote-p5"
          className="absolute h-auto"
          style={{
            width: `${(360 / 16) * scale}rem`,
            left: `${(826 / 16) * scale}rem`,
            top: `${(58 / 16) * scale}rem`,
          }}
        />
        {/* june */}
        <div
          className="absolute group"
          style={{
            width: `${(120 / 16) * scale}rem`,
            height: `${(120 / 16) * scale}rem`,
            left: `${(720 / 16) * scale}rem`,
            top: `${(288 / 16) * scale}rem`,
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['6월'].x}
            offsetYPx={CLICKBOX_OFFSET['6월'].y}
          />
          <img
            src={juneIcon}
            alt="june"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('6월')}
          />
        </div>
        {/* dote-p-6  독립적으로 배치 */}
        <img
          src={doteP6Icon}
          alt="dote-p-6"
          className="absolute h-auto"
          style={{
            width: `${(230 / 16) * scale}rem`,
            left: `${(466 / 16) * scale}rem`,
            top: `${(345 / 16) * scale}rem`,
          }}
        />
        {/* july */}
        <div
          className="absolute group"
          style={{
            width: `${(80 / 16) * scale}rem`,
            height: `${(80 / 16) * scale}rem`,
            left: `${(360 / 16) * scale}rem`,
            top: `${(330 / 16) * scale}rem`,
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['7월'].x}
            offsetYPx={CLICKBOX_OFFSET['7월'].y}
          />
          <img
            src={julyIcon}
            alt="july"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('7월')}
          />
        </div>
        {/* dote-p7 아이콘 독립적으로 배치 */}
        <img
          src={dotePc7Icon}
          alt="dote-p7"
          className="absolute h-auto"
          style={{
            width: `${(365 / 16) * scale}rem`,
            left: `${(-18 / 16) * scale}rem`,
            top: `${(310 / 16) * scale}rem`,
          }}
        />
        {/* umbrella 아이콘 독립적으로 배치 (august 왼쪽) */}
        <img
          src={umbrellaIcon}
          alt="umbrella"
          className="absolute"
          style={{
            width: `${(65 / 16) * scale}rem`,
            height: `${(65 / 16) * scale}rem`,
            left: `${(-30 / 16) * scale}rem`,
            top: `${(528 / 16) * scale}rem`,
          }}
        />
        {/* august */}
        <div
          className="absolute group"
          style={{
            width: `${(83 / 16) * scale}rem`,
            height: `${(83 / 16) * scale}rem`,
            left: `${(160 / 16) * scale}rem`,
            top: `${(640 / 16) * scale}rem`,
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['8월'].x}
            offsetYPx={CLICKBOX_OFFSET['8월'].y}
          />
          <img
            src={augustIcon}
            alt="august"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('8월')}
          />
        </div>
        {/* dote-p-7(8월 옆)*/}
        <img
          src={doteP7Icon}
          alt="dote-p-7"
          className="absolute h-auto"
          style={{
            width: `${(270 / 16) * scale}rem`,
            left: `${(285 / 16) * scale}rem`,
            top: `${(660 / 16) * scale}rem`,
          }}
        />
        {/* september */}
        <div
          className="absolute group"
          style={{
            width: `${(80 / 16) * scale}rem`,
            height: `${(80 / 16) * scale}rem`,
            left: `${(565 / 16) * scale}rem`,
            top: `${(640 / 16) * scale}rem`,
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['9월'].x}
            offsetYPx={CLICKBOX_OFFSET['9월'].y}
          />
          <img
            src={sebtemberIcon}
            alt="september"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('9월')}
          />
        </div>
        {/* dote-p9 */}
        <img
          src={doteP9Icon}
          alt="dote-p9"
          className="absolute h-auto"
          style={{
            width: `${(490 / 16) * scale}rem`,
            left: `${(672 / 16) * scale}rem`,
            top: `${(659 / 16) * scale}rem`,
          }}
        />
        {/* october */}
        <div
          className="absolute group"
          style={{
            width: `${(180 / 16) * scale}rem`,
            height: `${(180 / 16) * scale}rem`,
            left: `${(655 / 16) * scale}rem`,
            top: `${(835 / 16) * scale}rem`,
            zIndex: 10,
            pointerEvents: 'auto',
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['10월'].x}
            offsetYPx={CLICKBOX_OFFSET['10월'].y}
          />
          <img
            src={octoberIcon}
            alt="october"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('10월')}
          />
        </div>
        {/* dote-p-7(11월 옆) */}
        <img
          src={doteP7Icon}
          alt="dote-p-7"
          className="absolute h-auto"
          style={{
            width: `${(260 / 16) * scale}rem`,
            left: `${(385 / 16) * scale}rem`,
            top: `${(915 / 16) * scale}rem`,
          }}
        />

        {/* november */}
        <div
          className="absolute group"
          style={{
            width: `${(120 / 16) * scale}rem`,
            height: `${(80 / 16) * scale}rem`,
            left: `${(260 / 16) * scale}rem`,
            top: `${(900 / 16) * scale}rem`,
            zIndex: 10,
            pointerEvents: 'auto',
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['11월'].x}
            offsetYPx={CLICKBOX_OFFSET['11월'].y}
          />
          <img
            src={novemberIcon}
            alt="november"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('11월')}
          />
        </div>
        {/* dote-p11 */}
        <img
          src={doteP11Icon}
          alt="dote-p11"
          className="absolute h-auto pointer-events-none"
          style={{
            width: `${(570 / 16) * scale}rem`,
            left: `${(0 / 16) * scale}rem`,
            top: `${(883 / 16) * scale}rem`,
          }}
        />
        {/* dino 아이콘 독립적으로 배치 (dote-l 왼쪽) */}
        <img
          src={dinoIcon}
          alt="dino"
          className="absolute"
          style={{
            width: `${(70 / 16) * scale}rem`,
            height: `${(70 / 16) * scale}rem`,
            left: `${(580 / 16) * scale}rem`,
            top: `${(1165 / 16) * scale}rem`,
          }}
        />
        {/* dote-p-13 독립적으로 배치 */}
        <img
          src={doteP13Icon}
          alt="dote-p-13"
          className="absolute h-auto"
          style={{
            width: `${(450 / 16) * scale}rem`,
            left: `${(675 / 16) * scale}rem`,
            top: `${(1170 / 16) * scale}rem`,
          }}
        />
        {/* december */}
        <div
          className="absolute group"
          style={{
            width: `${(110 / 16) * scale}rem`,
            height: `${(110 / 16) * scale}rem`,
            left: `${(1123 / 16) * scale}rem`,
            top: `${(1120 / 16) * scale}rem`,
          }}
        >
          <ClickBox
            scale={scale}
            left="60%"
            offsetXPx={CLICKBOX_OFFSET['12월'].x}
            offsetYPx={CLICKBOX_OFFSET['12월'].y}
          />
          <img
            src={decemberIcon}
            alt="december"
            className="w-full h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
            onClick={() => onMonthClick('12월')}
          />
        </div>
      </div>
    </div>
  );
}

export default SchedulePad;

import { useState } from 'react';

import aprilIcon from '@/assets/icons/main/schedule/april.svg';
import augustIcon from '@/assets/icons/main/schedule/august.svg';
import decemberIcon from '@/assets/icons/main/schedule/december.svg';
import julyIcon from '@/assets/icons/main/schedule/july.svg';
import juneIcon from '@/assets/icons/main/schedule/june.svg';
import marchIcon from '@/assets/icons/main/schedule/march.svg';
import mayIcon from '@/assets/icons/main/schedule/may.svg';
import novemberIcon from '@/assets/icons/main/schedule/november.svg';
import octoberIcon from '@/assets/icons/main/schedule/october.svg';
import sebtemberIcon from '@/assets/icons/main/schedule/sebtember.svg';
import MainSectionLayout from '@/components/main/layout';
import ScheduleModal from '@/components/main/schedule/modal/ScheduleModal';
import { scheduleMonthData } from '@/components/main/schedule/scheduleModalData';
import useMediaQuery from '@/hooks/useMediaQuery';

import ScheduleDesktop from './ScheduleDesktop';
import ScheduleMobile from './ScheduleMobile';

function Schedule() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 460px)');

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
    <MainSectionLayout
      title="2026 연간 일정"
      showTopBorder={false}
      paddingBottomScale={0.2}
      overflowVisible={true}
    >
      {isMobile ? (
        <ScheduleMobile onMonthClick={handleMonthClick} />
      ) : (
        <ScheduleDesktop months={months} onMonthClick={handleMonthClick} />
      )}
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
        placeholderBgColor="#B0B0B0"
        placeholderPaddingHorizontal="25px"
        placeholderPaddingTop="15px"
        textTitleColor="#1a1a1a"
        textDescriptionColor="#1a1a1a"
        textBgColor="#FFFFFF"
        windowBgColor="#FFFFFF"
        windowBorderColor="#A8A8A8"
        windowBorderWidth={2.5}
      />
    </MainSectionLayout>
  );
}

export default Schedule;

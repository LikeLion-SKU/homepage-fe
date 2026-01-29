import { useState } from 'react';

import BackgroundImg1 from '@/assets/images/member_background1.svg';
import BackgroundImg2 from '@/assets/images/member_background2.svg';
import BackgroundImg3 from '@/assets/images/member_background3.svg';
import MemberOption from '@/components/Member/MemberOption';
import MemberSection from '@/components/Member/MemberSection';
import TitleSection from '@/components/common/TitleSection';
import { memberData1, memberData2 } from '@/pages/Member/memberDummyData';

export default function Member() {
  const optionData = ['14기', '13기', '12기', '11기'];
  const [selectedOption, setSelectedOption] = useState('14기');
  return (
    <div className="flex flex-col py-14 px-5 pad:px-7  web:px-14 relative mb-70">
      <TitleSection
        title="구성원"
        pageExplanation="서경대학교 멋쟁이사자처럼의 구성원들을 살펴보세요."
        onSearch={false}
      >
        <MemberOption
          optionData={optionData}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </TitleSection>
      <div className="flex flex-col gap-32 pad:pl-3.25 web:pl-7 pt-20">
        <MemberSection title="운영진" data={memberData1} />
        <MemberSection title="아기사자" data={memberData2} />
      </div>
      <img src={BackgroundImg1} className="absolute w-191 left-auto right-0 -z-1" />
      <img src={BackgroundImg2} className="absolute w-191 top-400 left-0 -z-1" />
      <img src={BackgroundImg3} className="absolute w-191 top-1000 left-50 -z-1" />
    </div>
  );
}

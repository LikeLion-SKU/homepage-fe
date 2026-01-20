import birdImage from '@/assets/images/bird-image.png';
import MainSectionLayout from '@/components/main/layout';

import Card from './card/card.jsx';

function Track() {
  const description =
    '우리 삶 속 Pain Point를 찾아내고 이를 해결하기 위한 서비스를 출시해요. 이를 위해 와이어프레임 Flowchart를 배워요. 사용자 경험을 고려한 UI를 디자인하고 서비스의 의도에 맞게 사용자들을 유도해요. 이를 위해 Figma라는 디자인 툴을 배워요.';

  return (
    <MainSectionLayout title="트랙 소개">
      <div className="flex gap-4 w-[120%] -ml-[10%] mt-[42px]">
        <div className="flex-1">
          <Card title="PROJECT OWNER (PO)" description={description} image={birdImage} />
        </div>
        <div className="flex-1 relative top-5">
          <Card title="FRONTEND" description={description} />
        </div>
        <div className="flex-1 relative top-10">
          <Card title="BACKEND" description={description} />
        </div>
      </div>
    </MainSectionLayout>
  );
}

export default Track;

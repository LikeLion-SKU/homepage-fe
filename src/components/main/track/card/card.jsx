import useMediaQuery from '@/hooks/useMediaQuery';

import GridPattern from './GridPattern';
import CardContent from './content.jsx';
import CardHeader from './header';
import CardPlaceholder from './placeholder';

function Card({ title, description, image = null }) {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 1199px)');

  return (
    <GridPattern
      className="w-full border border-[#00156A] flex flex-col bg-[#FAFBF8] relative overflow-hidden"
      style={{
        aspectRatio: isMobile ? '3/4' : undefined,
        height: isMobile ? undefined : '100%',
      }}
    >
      {/* 카드 전체 격자 위에 콘텐츠 배치 */}
      <div className="relative z-10 flex flex-col w-full h-full overflow-hidden">
        <CardHeader title={title} />
        {/* 461px~1199px 구간: 이미지 좌측, 텍스트 우측 */}
        {isTablet ? (
          <div className="flex flex-row flex-1 min-h-0">
            <div className="flex-1 min-w-0">
              <CardPlaceholder image={image} />
            </div>
            <div className="flex-1 min-w-0">
              <CardContent description={description} />
            </div>
          </div>
        ) : (
          <>
            <CardPlaceholder image={image} />
            <CardContent description={description} />
          </>
        )}
      </div>
    </GridPattern>
  );
}

export default Card;

import GridPattern from './GridPattern';
import CardContent from './content.jsx';
import CardHeader from './header';
import CardPlaceholder from './placeholder';

function Card({ title, description, image = null }) {
  return (
    <GridPattern className="w-full h-full border border-[#00156A] flex flex-col bg-white relative overflow-hidden">
      {/* 카드 전체 격자 위에 콘텐츠 배치 */}
      <div className="relative z-10 flex flex-col w-full h-full overflow-hidden">
        <CardHeader title={title} />
        <CardPlaceholder image={image} />
        <CardContent description={description} />
      </div>
    </GridPattern>
  );
}

export default Card;

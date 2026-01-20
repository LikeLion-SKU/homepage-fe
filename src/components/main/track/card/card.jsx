import GridPattern from './GridPattern';
import CardContent from './content.jsx';
import CardHeader from './header';
import CardPlaceholder from './placeholder';

function Card({ title, description, image = null }) {
  return (
    <div className="w-full h-full border border-[#00156A] flex flex-col bg-white">
      <CardHeader title={title} />
      <CardPlaceholder image={image} />
      <CardContent description={description} />
    </div>
  );
}

export default Card;

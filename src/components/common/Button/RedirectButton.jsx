import Navy from '@/assets/icons/right_navy_icon.svg';
import Button from '@/components/common/Button/Button';

export default function RedirectButton({ buttonName, onClick }) {
  return (
    <div className="flex w-54 justify-start items-center z-10">
      <Button
        onClick={onClick}
        data-variant=""
        data-size=""
        className="w-12 h-12 bg-button-green hover:bg-button-hover px-3 py-3.5 outline flex-col justify-center items-center gap-2.5"
      >
        <img src={Navy} className="w-6 h-5" alt="navy icon" />
      </Button>
      <div className="self-stretch h-12 px-4 py-3 outline bg-button-gray relative z-10">
        <div className="justify-center text-zinc-900 text-lg font-medium font-['Pretendard']">
          {buttonName}
        </div>
      </div>
    </div>
  );
}

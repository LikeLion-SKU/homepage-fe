import Navy from '@/assets/icons/right_navy_icon.svg';
import Button from '@/components/common/Button/Button';

export default function RedirectButton({ buttonName, onClick }) {
  return (
    <div className="flex justify-center items-center z-10">
      <Button
        onClick={onClick}
        data-variant=""
        data-size=""
        className="w-10 h-10 pad:w-12 pad:h-12 bg-button-green hover:bg-button-hover outline flex flex-col justify-center items-center gap-2.5"
      >
        <img src={Navy} className="w-4 h-4 pad:w-6 pad:h-5" alt="navy icon" />
      </Button>
      <div className="self-stretch h-10 pad:h-12 px-4 py-3 outline bg-button-gray relative z-10 flex items-center justify-center">
        <div className="justify-center text-zinc-900 text-sm font-semibold pad:text-lg pad:font-medium font-['Pretendard']">
          {buttonName}
        </div>
      </div>
    </div>
  );
}

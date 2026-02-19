import { useState } from 'react';

import Toggle from '@/assets/icons/under_toggle.svg';

function ModalToggle({ items = [], scale = 1 }) {
  const [openToggle, setOpenToggle] = useState([]);

  const handleToggle = (index) => {
    if (openToggle.includes(index)) {
      setOpenToggle(openToggle.filter((i) => i !== index));
    } else {
      setOpenToggle([...openToggle, index]);
    }
  };

  return (
    <div
      className="flex flex-col relative"
      style={{
        gap: `${(12 / 16) * scale}rem`,
        zIndex: 10,
      }}
    >
      {items.map((item, index) => {
        const isOpen = openToggle.includes(index);
        return (
          <div key={index} className="w-full" style={{ paddingRight: `${(50 / 16) * scale}rem` }}>
            <button
              onClick={() => handleToggle(index)}
              className="h-14 pl-4 pr-7 py-5 bg-white border border-[#686868] flex items-center justify-between text-black text-xs pad:text-base font-medium transition-all duration-200  active:translate-x-[0.5px] active:translate-y-[0.5px]"
              style={{
                borderRadius: `${(20 / 16) * scale}rem`,
                width: '100%',
              }}
            >
              <div className="flex items-center gap-3">
                {item.badge && (
                  <span
                    className="px-3 py-1 rounded-full text-xs pad:text-sm font-semibold"
                    style={{
                      backgroundColor: item.badgeColor || '#C6E400',
                      color: '#FFFFFF',
                      borderRadius: `${(15 / 16) * scale}rem`,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <span>{item.text}</span>
              </div>
              <div
                className="w-3.5 h-3.5 flex items-center justify-center transition-transform duration-200"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <img src={Toggle} alt="toggle" />
              </div>
            </button>
            {isOpen && item.content && (
              <div
                className="px-6 py-5 bg-toggle-green border border-black border-t-0 flex items-center justify-between text-black text-xs pad:text-base font-medium font-['Pretendard'] whitespace-pre-wrap"
                style={{
                  borderRadius: `0 0 ${(20 / 16) * scale}rem ${(20 / 16) * scale}rem`,
                  width: '100%',
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ModalToggle;

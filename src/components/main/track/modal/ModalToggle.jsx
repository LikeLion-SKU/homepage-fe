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
          <div key={index} className="w-full" style={{ paddingRight: `${(30 / 16) * scale}rem` }}>
            <button
              onClick={() => handleToggle(index)}
              className="h-14 pl-4 pr-7 py-5 flex items-center justify-between text-black text-xs pad:text-base font-medium active:translate-x-[0.5px] active:translate-y-[0.5px]"
              style={{
                borderRadius: isOpen
                  ? `${(20 / 16) * scale}rem ${(20 / 16) * scale}rem 0 0`
                  : `${(20 / 16) * scale}rem`,
                width: '100%',
                backgroundColor: isOpen ? '#F8FBE7' : '#FFFFFF',
                border: isOpen
                  ? `${(2 / 16) * scale}rem solid #686868`
                  : `${(1 / 16) * scale}rem solid #686868`,
                transition: 'background-color 0s, border-width 0s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FBE7';
                e.currentTarget.style.borderWidth = `${(2 / 16) * scale}rem`;
              }}
              onMouseLeave={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderWidth = `${(1 / 16) * scale}rem`;
                }
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
              <div className="w-3.5 h-3.5 flex items-center justify-center">
                <img src={Toggle} alt="toggle" />
              </div>
            </button>
            {isOpen && item.explainText && (
              <div
                className="px-6 py-3"
                style={{
                  backgroundColor: '#F8FBE7',
                  borderRadius: `0 0 ${(15 / 16) * scale}rem ${(15 / 16) * scale}rem`,
                  width: '100%',
                  marginTop: `-${(2 / 16) * scale}rem`,
                  border: `${(2 / 16) * scale}rem solid #686868`,
                  borderTop: 'none',
                }}
              >
                <p
                  style={{
                    fontFamily:
                      'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: `${(14 / 16) * scale}rem`,
                    fontWeight: 400,
                    color: '#686868',
                    lineHeight: `${(10 / 16) * scale}rem`,
                    marginLeft: `${(-5 / 16) * scale}rem`,
                    marginTop: `${(-5 / 16) * scale}rem`,
                    marginBottom: `${(10 / 16) * scale}rem`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.explainText}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ModalToggle;

// @ts-ignore
import Skon from '@/assets/icons/SKON_icon.svg?react';
//@ts-ignore
import Text from '@/assets/icons/footer_text.svg?react';

export default function Footer() {
  return (
    <footer className="w-full h-40 flex items-center justify-between bg-[#F9F9F9] gap-5 mt-auto px-12 pt-15">
      <Text />
      {/* <div>
        <p>
          SKU SK U LIKELION. ALL RIGHTS RESERVED.
        </p>
        <p>
          Seokyeong University, 124 Seokyeong-ro, Seongbuk-gu, Seoul, 02726, Republic of Korea
        </p>
      </div> */}
      <Skon />
    </footer>
  );
}

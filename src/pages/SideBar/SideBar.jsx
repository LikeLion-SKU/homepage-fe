import github from '@/assets/icons/github_logo_icon.svg';
import instagram from '@/assets/icons/instagram_logo_icon.svg';
import kakao from '@/assets/icons/kakaotalk_logo_icon.svg';
import MenuButton from '@/components/sideBar/MenuButton';
import OutLinkButton from '@/components/sideBar/OutLinkButton';

export default function SideBar() {
  const token = true;
  const getLastMenu = () => {
    if (token) {
      return { name: '마이페이지', path: '/mypage' };
    } else {
      return { name: '로그인 / 회원가입', path: '/login' };
    }
  };
  const menuName = [
    { name: '지원하기', path: '/recruit' },
    { name: '프로젝트', path: '/project' },
    { name: '구성원', path: '/member' },
    getLastMenu(),
  ];
  const outLinkName = [
    { name: 'kakao talk', imgUrl: kakao, link: 'http://pf.kakao.com/_SpMTn' },
    { name: 'instaram', imgUrl: instagram, link: 'https://www.instagram.com/likelion_skuniv/' },
    { name: 'github', imgUrl: github, link: 'https://github.com/LikeLion-SKU' },
  ];
  return (
    <div className="flex flex-col h-full pt-15 gap-16.5 mb-34 pad:mb-72 bg-[#FAFBF8]">
      <div className="border-y divide-y divide-black">
        {menuName.map((data) => (
          <MenuButton key={data.name} name={data.name} path={data.path} />
        ))}
      </div>
      <div className="border-y divide-y divide-black">
        {outLinkName.map((data) => (
          <OutLinkButton key={data.name} name={data.name} imgUrl={data.imgUrl} link={data.link} />
        ))}
      </div>
    </div>
  );
}

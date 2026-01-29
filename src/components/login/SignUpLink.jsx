import { useNavigate } from 'react-router';

export default function SignupLink({
  questionText = '계정이 없으신가요?',
  linkText = '회원가입',
  linkPath = '/signup',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkPath);
  };

  return (
    <div className="flex flex-col items-center mt-1">
      <p className="text-black text-base max-[380px]:text-xs font-['Pretendard'] text-center">
        {questionText}{' '}
        <button
          type="button"
          onClick={handleClick}
          className="text-black text-base max-[380px]:text-xs font-['Pretendard Medium'] underline hover:opacity-80 transition-opacity"
          style={{ textDecoration: 'underline', textDecorationThickness: '1px' }}
        >
          {linkText}
        </button>
      </p>
      <p className="text-[#B0B0B0] text-center text-sm max-[380px]:text-xs font-['Pretendard medium'] mt-1">
        학교 포탈 계정이 아닌, 학교 이메일로 별도 회원가입이 필요합니다.
      </p>
    </div>
  );
}

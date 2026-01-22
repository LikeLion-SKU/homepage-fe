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
    <div className="flex flex-col items-center mt-6">
      <p className="text-black text-base font-['Pretendard'] text-center">
        {questionText}{' '}
        <button
          type="button"
          onClick={handleClick}
          className="text-black text-base font-['Pretendard'] underline hover:opacity-80 transition-opacity"
          style={{ textDecoration: 'underline', textDecorationThickness: '1px' }}
        >
          {linkText}
        </button>
      </p>
    </div>
  );
}

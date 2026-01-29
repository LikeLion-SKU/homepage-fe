import { useNavigate } from 'react-router';

export default function ForgotPasswordLink({ text = '비밀번호 찾기' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/password/find');
  };

  return (
    <div className="flex justify-end mb-6">
      <button
        type="button"
        onClick={handleClick}
        className="text-black text-sm max-[380px]:text-xs font-medium font-['Pretendard'] underline hover:opacity-80 transition-opacity focus:outline-none"
        style={{ textDecoration: 'underline', textDecorationThickness: '1px' }}
      >
        {text}
      </button>
    </div>
  );
}

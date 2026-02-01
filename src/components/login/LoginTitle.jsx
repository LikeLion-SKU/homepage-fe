export default function LoginTitle({ title = '로그인' }) {
  return (
    <h1 className="flex justify-center text-black text-3xl max-[480px]:text-2xl font-extrabold font-['Pretendard'] mb-8">
      {title}
    </h1>
  );
}

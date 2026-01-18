export default function MyPage() {
  const userData = {
    name: '김멋사',
    email: 'likelion@example.com',
    profileImage: 'https://www.nongmin.com/article/20230814500020',
  };

  return (
    <div>
      <div>
        <img src={userData.profileImage}></img>
        <span>{userData.name}님, 안녕하세요</span>
        <span>{userData.email}</span>
      </div>
    </div>
  );
}

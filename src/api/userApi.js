import { APIService, privateAPI } from '@/api/api';

//기수별 구성원 조회
export const getClubMember = async (semester, parameter) => {
  try {
    const res = await APIService.public.get(`/v1/users/club-members/${semester}`, {
      params: {
        'next-position-cursor': parameter['next-position-cursor'],
        'next-track-cursor': parameter['next-track-cursor'],
      },
    });

    return res.data;
  } catch (error) {
    console.log('구성원 조회 실패:', error);
  }
};

// 비밀번호 변경
export const changePassword = ({ currentPassword, newPassword, newPasswordConfirmation }) =>
  privateAPI
    .patch('/v1/users/me/password', {
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    })
    .then((r) => r.data);

export const getUserRole = async () => {
  try {
    const res = await APIService.private.get('/v1/users/role');

    return res.data.userRole;
  } catch (error) {
    console.log('권한 조회 실패:', error);
  }
};

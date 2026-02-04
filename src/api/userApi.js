import { privateAPI } from '@/api/api';

export const getClubMember = () => {
  // try{
  //     const res=APIService.public.get()
  // }
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

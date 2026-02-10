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

export const getClubMemberAdmin = async (parameter = {}) => {
  try {
    const res = await APIService.private.get('/v1/admin/club-members', {
      params: {
        semester: parameter.semester,
        position: parameter.position,
        track: parameter.track,
        keyword: parameter.keyword,
      },
    });

    return res.data;
  } catch (error) {
    console.log('구성원 관리자 조회 실패:', error);
  }
};

export const deleteClubMember = async (clubMemberIds) => {
  try {
    const res = await APIService.private.delete('/v1/admin/club-members/bulk', {
      data: { clubMemberIds: clubMemberIds },
    });

    return res.data;
  } catch (error) {
    console.log('구성원 삭제 실패:', error);
  }
};

export const postCopyClubMember = async (parameter = {}) => {
  try {
    const res = await APIService.private.post(
      `/v1/admin/users/${parameter.userId}/club-members`,
      null,
      {
        params: {
          semester: parameter.semester,
          position: parameter.position,
          track: parameter.track,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('구성원 복사 실패:', error);
  }
};

export const patchClubMember = async (parameter) => {
  try {
    const res = await APIService.private.patch(
      `/v1/admin/club-members/${parameter.clubMemberId}`,
      null,
      {
        params: {
          semester: parameter.semester,
          position: parameter.position,
          track: parameter.track,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('구성원 정보 수정 실패:', error);
  }
};

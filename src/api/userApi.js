import { APIService } from '@/api/api';

export const getClubMember = async (semester, parameter) => {
  try {
    const res = await APIService.public.get(`/v1/users/club-members/${semester}`, {
      params: {
        'next-position-cursor': parameter.nextPositionCursor,
        'next-track-cursor': parameter?.nextTrackCursor,
      },
    });

    return res.data;
  } catch (error) {
    console.log('구성원 조회 실패:', error);
  }
};

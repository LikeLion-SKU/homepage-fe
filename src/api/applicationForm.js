import { APIService } from '@/api/api';

export const getCurrentForm = async () => {
  try {
    const res = await APIService.public.get('/v1/applications/current-forms');

    return res.data;
  } catch (error) {
    console.log('진행중인 지원 일정 조회 실패:', error);
  }
};

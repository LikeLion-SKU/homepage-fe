import { APIService } from '@/api/api';

export const getSemester = async () => {
  try {
    const res = await APIService.public.get('/v1/semesters');

    return res.data.map((item) => `${item.semester}기`);
  } catch (error) {
    console.log('기수 목록 조회 실패:', error);
  }
};

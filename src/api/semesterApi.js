import { APIService } from '@/api/api';

export const getSemester = async () => {
  try {
    const res = await APIService.public.get('/v1/semesters');

    return res.data.map((item) => `${item.semester}기`);
  } catch (error) {
    console.log('기수 목록 조회 실패:', error);
    return [];
  }
};

export const postSemester = async (semester) => {
  try {
    const res = await APIService.private.post('/v1/admin/semesters', {
      semester: parseInt(semester),
    });

    return res.data;
  } catch (error) {
    console.log('기수 추가 실패:', error);
    return [];
  }
};

export const deleteSemester = async (semester) => {
  try {
    const res = await APIService.private.delete(`/v1/admin/semesters/${parseInt(semester)}`);

    return res.data;
  } catch (error) {
    console.log('기수 삭제 실패:', error);
    return [];
  }
};

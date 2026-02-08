import { APIService } from '@/api/api';

export const getCurrentForm = async () => {
  try {
    const res = await APIService.public.get('/v1/applications/current-forms');

    return res.data;
  } catch (error) {
    console.log('진행중인 지원 일정 조회 실패:', error);
    return null;
  }
};

// 관리자용 모든 지원 일정 목록 조회
export const getAllAdminForms = async () => {
  try {
    const res = await APIService.private.get('/v1/admin/applications/forms');

    return res.data || [];
  } catch (error) {
    console.log('지원 일정 목록 조회 실패', error);
    return [];
  }
};

// 관리자용 지원 일정 생성
export const getAdminForm = async (formData) => {
  try {
    const res = await APIService.private.post('/v1/admin/applications/forms', formData);

    return res.data;
  } catch (error) {
    console.log('지원 일정 생성 실패', error);
    return null;
  }
};

// 관리자용 지원 일정 수정
export const putAdminForm = async (applicationFormId, formData) => {
  try {
    const res = await APIService.private.put(
      `/v1/admin/applications/forms/${applicationFormId}`,
      formData
    );

    return res.data;
  } catch (error) {
    console.log('지원 일정 수정 실패', error);
    return null;
  }
};

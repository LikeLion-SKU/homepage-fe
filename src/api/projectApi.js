import { APIService } from '@/api/api';

export const getProjectList = async (parameter) => {
  try {
    const res = await APIService.public.get('/v1/projects', {
      params: {
        page: parameter.page || 0,
        semester: parameter.semester,
        projectTypeId: parameter.projectTypeId,
        search: parameter.search,
      },
    });
    return res.data;
  } catch (error) {
    console.error('프로젝트 목록 조회 실패:', error);
  }
};

export const getFilterProjectList = async ({ request }) => {
  const url = new URL(request.url);

  // URL에서 파라미터 추출 (?page=1&search=멋사 등)
  const params = {
    page: url.searchParams.get('page') || 0,
    semester: url.searchParams.get('semester'),
    projectTypeId: url.searchParams.get('projectTypeId'),
    search: url.searchParams.get('search'),
  };

  // 기존에 만든 API 호출 함수 사용
  return await getProjectList(params);
};

export const getProjectType = async () => {
  try {
    const res = await APIService.public.get('/v1/project-types');

    return res.data;
  } catch (error) {
    console.error('프로젝트 타입 조회 실패:', error);
  }
};

export const getProjectDetail = async (projectId) => {
  try {
    const res = await APIService.public.get(`/v1/projects/${projectId}`);

    return res.data;
  } catch (error) {
    console.log('프로젝트 상세조회 실패:', error);
  }
};

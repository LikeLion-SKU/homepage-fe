import { APIService } from '@/api/api';

export const getProjectList = async (parameter) => {
  //프로젝트 필터 미적용
  try {
    const res = await APIService.public.get('/v1/projects', {
      params: {
        pageNum: parameter.pageNum || 0,
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
  //프로젝트 조회 필터 적용
  const url = new URL(request.url);

  // URL에서 파라미터 추출 (?page=1&search=멋사 등)
  const params = {
    pageNum: url.searchParams.get('pageNum') || 0,
    semester: url.searchParams.get('semester'),
    projectTypeId: url.searchParams.get('projectTypeId'),
    search: url.searchParams.get('search'),
  };

  // 기존에 만든 API 호출 함수 사용
  return await getProjectList(params);
};

export const getProjectType = async () => {
  //대회명 조회
  try {
    const res = await APIService.public.get('/v1/project-types');

    return res.data;
  } catch (error) {
    console.error('프로젝트 타입 조회 실패:', error);
  }
};

export const getProjectDetail = async (projectId) => {
  //프로젝트 상세조회
  try {
    const res = await APIService.public.get(`/v1/projects/${projectId}`);

    return res.data;
  } catch (error) {
    console.log('프로젝트 상세조회 실패:', error);
  }
};

export const postProjectType = async (projectTypeName) => {
  try {
    const res = await APIService.private.post('/v1/admin/project-types', {
      projectTypeName: projectTypeName,
    });

    return res.data;
  } catch (error) {
    console.log('대회명 추가 실패:', error);
  }
};

export const deleteProjectType = async (projectTypeId) => {
  try {
    const res = await APIService.private.delete(`/v1/admin/project-types/${projectTypeId}`);

    return res.data;
  } catch (error) {
    console.log('프로젝트 타입 삭제 실패:', error);
  }
};

export const deleteProject = async (projectId) => {
  try {
    const res = await APIService.private.delete(`/v1/admin/projects/${projectId}`);

    return res.data;
  } catch (error) {
    console.log('프로젝트 삭제 실패:', error);
  }
};

export const putProject = async (projectId, updateData, files) => {
  try {
    const formData = new FormData();

    // 1. 이미지 파일들을 FormData에 추가
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('projectImages', file);
      });
    }
    const blob = new Blob([JSON.stringify(updateData)], {
      type: 'application/json',
    });
    formData.append('request', blob);
    const res = await APIService.private.put(`/v1/admin/projects/${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.log('프로젝트 수정 실패:', error);
  }
};

export const postProject = async (updateData, files) => {
  try {
    const formData = new FormData();

    // 1. 이미지 파일들을 FormData에 추가
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('projectImages', file);
      });
    }
    const blob = new Blob([JSON.stringify(updateData)], {
      type: 'application/json',
    });
    formData.append('request', blob);
    const res = await APIService.private.post(`/v1/admin/projects`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.log('프로젝트 수정 실패:', error);
  }
};

export const getAwardList = async () => {
  // 수상작 목록 조회
  try {
    const res = await APIService.public.get('/v1/projects/awards', {
      params: {
        size: 10, // 모든 수상작을 가져오기 위해 큰 값 설정
      },
    });
    return res.data;
  } catch (error) {
    console.error('수상작 목록 조회 실패:', error);
    throw error;
  }
};

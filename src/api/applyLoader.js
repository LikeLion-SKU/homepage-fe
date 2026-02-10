import { APIService } from '@/api/api';

// basicInfoLoader 수정
export const basicInfoLoader = async () => {
  try {
    const response = await APIService.private.get('/v1/applications/records/personal-info');
    return { userInfoData: response.data || {} }; // const{userInfoData} = useLoaderData(); 라고 가져오려면 키를 지정해야함
  } catch (error) {
    console.log('기본 인적사항 정보 조회 실패:', error);
    return [];
  }
};

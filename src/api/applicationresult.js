import { APIService } from '@/api/api';
import { getCurrentForm } from '@/api/applicationForm';

export const getResult = async () => {
  try {
    const nowDate = new Date().getTime();
    const resultDate = await getCurrentForm();
    const applicationResultAt = new Date(resultDate.applicationResultAt).getTime();
    const interviewScheduleConfirmedAt = new Date(
      resultDate.interviewScheduleConfirmedAt
    ).getTime();
    const finalResultAt = new Date(resultDate.finalResultAt).getTime();

    if (applicationResultAt <= nowDate && nowDate <= interviewScheduleConfirmedAt) {
      return { type: 'document', result: await getDocumentResult() };
    } else if (nowDate > finalResultAt) {
      //최종 결과 얻기 api
    } else {
      console.log('결과 확인 기간이 아닙니다');
      return;
    }
  } catch (error) {
    console.log('결과 조회 실패:', error);
  }
};

export const getDocumentResult = async () => {
  try {
    const res = await APIService.private.get('/v1/interviews/schedules');

    return res.data.documentPassed;
  } catch (error) {
    console.log('서류 결과 조회 실패:', error);
  }
};

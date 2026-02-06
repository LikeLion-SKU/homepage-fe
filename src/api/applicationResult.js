import { APIService } from '@/api/api';
import { getCurrentForm } from '@/api/applicationForm';

export const getResult = async () => {
  //기간에 따라 맞는 결과 받아오기
  try {
    const nowDate = new Date().getTime();
    const resultDate = await getCurrentForm();
    const applicationResultAt = new Date(resultDate.applicationResultAt).getTime();
    const interviewScheduleConfirmedAt = new Date(
      resultDate.interviewScheduleConfirmedAt
    ).getTime();
    const finalResultAt = new Date(resultDate.finalResultAt).getTime();

    if (applicationResultAt <= nowDate && nowDate <= interviewScheduleConfirmedAt) {
      const resultData = await getDocumentResult();
      return {
        test: 'document',
        semester: resultData.semester,
        result: resultData.documentPassed,
        track: resultData.track,
      };
    } else if (nowDate > finalResultAt) {
      const resultData = await getInterviewResult();
      return {
        test: 'interview',
        semester: resultData.semester,
        result: resultData.interviewPassed,
        track: resultData.track,
      };
    } else {
      console.log('결과 확인 기간이 아닙니다');
      return { test: 'document', semester: 0, interviewPassed: false, track: 'oo' };
    }
  } catch (error) {
    console.log('결과 조회 실패:', error);
  }
};

export const getDocumentResult = async () => {
  try {
    const res = await APIService.private.get('/v1/interviews/schedules');

    return res.data;
  } catch (error) {
    console.log('서류 결과 조회 실패:', error);
  }
};

export const getInterviewResult = async () => {
  try {
    const res = await APIService.private.get('/v1/users/interview-result');

    return res.data;
  } catch (error) {
    console.log('면접 결과 조회 실패:', error);
  }
};

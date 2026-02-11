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

// 관리자 - 서류합격 여부 수정 (초깃값: null)
export const patchDocumentResult = async (applicationRecordId, newResult) => {
  try {
    const isDocumentPassed = newResult === '합격'; // 합격만 true, 불합격은 false
    const response = await APIService.private.patch(
      `/v1/admin/applications/${applicationRecordId}/document-result`,
      { isDocumentPassed: isDocumentPassed }
    );
    return response.data;
  } catch (error) {
    console.error('서류 합격 여부 수정 실패', error);
    throw error;
  }
};

// 관리자 - 면접합격 여부 결정
export const postInterviewResult = async (applicationRecordId, result) => {
  try {
    const passed = result === '합격'; // 합격만 true, 불합격은 false
    const response = await APIService.private.post(
      `/v1/admin/applications/${applicationRecordId}/application-result`,
      { passed: passed }
    );
    return response.data;
  } catch (error) {
    console.error('면접 합격 여부 수정 실패', error);
    throw error;
  }
};

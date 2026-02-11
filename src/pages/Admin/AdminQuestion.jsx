import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLoaderData } from 'react-router';

import { deleteResume } from '@/api/applicationQuestionApi';
import Navy from '@/assets/icons/navy-left.svg';
import ApplicationItem from '@/components/admin/Application/ApplicationItem';
import Button from '@/components/common/Button/Button';

export default function AdminQuestion() {
  const navigate = useNavigate();
  const applicationData = useLoaderData();

  // 진행 중인 것과 완료된 것을 분리 (loader는 response.data를 반환하므로 applicationData가 이미 API 응답 본문)
  const [ongoingList, setOngoingList] = useState(applicationData?.inProgress ?? []);
  const [completedList, setCompletedList] = useState(applicationData?.completed ?? []);

  // 지원서 삭제 핸들러
  const handleDeleteResume = async (applicationFormId) => {
    const isDeleted = await deleteResume(applicationFormId);

    if (isDeleted) {
      const matchId = (item) => (item.applicationFormId ?? item.id) === applicationFormId;
      setOngoingList((prev) => prev.filter((item) => !matchId(item)));
      setCompletedList((prev) => prev.filter((item) => !matchId(item)));
    }
  };

  const getItemId = (item) => item.applicationFormId ?? item.id;

  return (
    <div className="pb-35">
      <div className="w-full flex flex-col pt-18 px-45.5 gap-23">
        <div className="flex flex-col gap-10">
          <div>
            <div className="relative inline-block">
              {/* 네 모서리의 검은색 박스 점들 - z-10 추가로 버튼보다 위로 올림 */}
              {/* 좌상단 */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-navy-blue z-10" />
              {/* 우상단 */}
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-navy-blue z-10" />
              {/* 좌하단 */}
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-navy-blue z-10" />
              {/* 우하단 */}
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-navy-blue z-10" />

              <Button
                onClick={() => navigate(-1)}
                className="relative w-12 h-12 bg-button-green hover:bg-button-hover p-0 flex justify-center items-center outline"
              >
                <img src={Navy} className="w-10 h-8 object-contain" alt="navy icon" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-row justify-between">
            <div className="self-stretch h-8 text-2xl font-bold ">지원서 관리</div>
            <button
              onClick={() => {
                navigate('/admin/resume/new');
              }}
              className="flex w-30 h-10 justify-center items-center text-[1rem] border bg-white hover:bg-stone-50 transition-all px-"
            >
              새로 만들기
            </button>
          </div>
          {/* 상자 */}
          <div className="flex flex-col px-20 py-18 border bg-button-gray gap-15">
            {/* 파트 1: 진행 중인 지원서 */}
            <section className="flex flex-col gap-5">
              <h2 className="text-xl font-bold">진행 중인 지원서</h2>
              <div className="flex flex-col gap-3">
                {ongoingList.map((item) => (
                  <ApplicationItem
                    key={getItemId(item)}
                    item={item}
                    onClickDelete={() => handleDeleteResume(getItemId(item))}
                  />
                ))}
              </div>
            </section>

            {/* 파트 2: 진행 완료 지원서 */}
            <section className="flex flex-col gap-5 mt-5">
              <h2 className="text-xl font-bold">진행 완료 지원서</h2>
              <div className="flex flex-col gap-3">
                {completedList.map((item) => (
                  <ApplicationItem
                    key={getItemId(item)}
                    item={item}
                    onClickDelete={() => handleDeleteResume(getItemId(item))}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

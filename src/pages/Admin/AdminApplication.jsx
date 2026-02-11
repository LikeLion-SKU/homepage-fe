import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getApplicationsLoader } from '@/api/applicationRecordApi';
import AdminApplicationTitle from '@/components/admin/Application/AdminApplicationTitle';
import ApplicantsList from '@/components/admin/Application/ApplicantsList';
import ButtonGroup from '@/components/admin/User/ButtonGroup';

const TRACK_API_MAP = {
  PO: 'PO',
  PM: 'PM',
  Design: 'DESIGN',
  'PM & Design': 'PM_DESIGN',
  Frontend: 'FRONTEND',
  Backend: 'BACKEND',
};

export default function AdminApplication() {
  const navigate = useNavigate();

  const propsData = {
    title: '지원서/지원자 관리',
    explain: '지원서 / 지원자 관리 페이지입니다.',
    rule: [
      '1. 지원서 합불 입력 시 면접 합불 선택 가능',
      '2. 지원서 삭제 가능',
      '3. 필터 및 검색으로 찾기 가능',
    ],
    button: (
      <button
        onClick={() => navigate('/admin/application/questions')}
        className="flex w-40 h-10 justify-center items-center text-[1rem] border bg-white hover:bg-stone-50 transition-all"
      >
        지원서 추가&수정
      </button>
    ),
  };

  const semesterData = ['14기', '13기', '12기', '11기'];
  const trackData = ['PO', 'PM', 'Design', 'PM & Design', 'Frontend', 'Backend'];

  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [search, setSearch] = useState('');

  const initialApplications = useLoaderData();

  // UI 상태 → API 파라미터 변환
  const semesterParam = selectedSemester ? parseInt(selectedSemester) : null;
  const trackParam = selectedTrack ? TRACK_API_MAP[selectedTrack] || null : null;
  const searchParam = search || null;

  const isDefaultFilter = semesterParam === null && trackParam === null && searchParam === null;

  // 무한 스크롤
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['applications', semesterParam, trackParam, searchParam],
    queryFn: ({ pageParam }) =>
      getApplicationsLoader(semesterParam, trackParam, searchParam, pageParam, 10),
    initialPageParam: null,
    initialData: isDefaultFilter ? { pages: [initialApplications], pageParams: [null] } : undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.hasNext) return undefined;
      return lastPage.lastCursor;
    },
  });

  // 모든 페이지의 content를 하나의 배열로 합침
  const applicants = data?.pages?.flatMap((page) => page?.content ?? []) ?? [];

  return (
    <div className="relative flex flex-col p-21 gap-14">
      <AdminApplicationTitle props={propsData}>
        <div className="flex flex-col gap-5">
          <ButtonGroup
            buttonData={semesterData}
            isCheck={selectedSemester}
            setIsCheck={setSelectedSemester}
          />
          <ButtonGroup
            buttonData={trackData}
            isCheck={selectedTrack}
            setIsCheck={setSelectedTrack}
          />
        </div>
      </AdminApplicationTitle>
      <div className="flex border-t">
        <ApplicantsList
          applicants={applicants}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          search={search}
          onSearch={setSearch}
        />
      </div>
    </div>
  );
}

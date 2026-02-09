import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { getProjectList } from '@/api/projectApi';
import TitleSection from '@/components/common/TitleSection';
import ProjectOption from '@/components/project/ProjectOption';
import ProjectPagenation from '@/components/project/ProjectPagenation';
import ProjectSection from '@/components/project/ProjectSection';
import useProjectListStore from '@/store/useProjectListStore';

export default function AdminProject() {
  const [projectListData, setProjectListData] = useState({
    content: [],
    first: true,
    last: false,
    pageNum: 0,
    pageSize: 6,
    totalElements: 0,
    totalPages: 0,
  }); //loader로 가져온 데이터
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [filterParams, setFilterParams] = useSearchParams({}); //파라미터 관리
  const pageOn = Number(filterParams.get('pageNum') || 1);
  const semester = filterParams.get('semester');
  const projectTypeId = filterParams.get('projectTypeId');
  const search = filterParams.get('search');
  const { setProjectIdList } = useProjectListStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const params = {
          pageNum: pageOn,
          semester,
          projectTypeId,
          search,
        };
        const data = await getProjectList(params);
        setProjectListData(data.projectPageResponse);
        setProjectIdList(data.allProjectIdsByFilters);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생', error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchData();
    // 의존성 배열에 파라미터들을 넣어주어 값이 바뀔 때마다 실행되게 함
  }, [pageOn, semester, projectTypeId, search]);

  const maxPage = projectListData?.totalPages || 1;

  const pageArray = useMemo(() => {
    if (maxPage === 0) return [1];
    const startPage = Math.floor((pageOn - 1) / 5) * 5 + 1;
    console.log(maxPage);
    // startPage부터 5개를 생성하되, maxPage를 넘지 않는 것만 필터링
    return Array.from({ length: 5 }, (_, i) => startPage + i).filter((num) => num <= maxPage);
  }, [pageOn, maxPage]);

  // 페이지 변경 함수: URL의 쿼리 파라미터를 변경함
  const handlePageChange = useCallback(
    (newPage) => {
      setFilterParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set('pageNum', String(newPage));
          return params;
        },
        { replace: true }
      );
    },
    [setFilterParams]
  );
  const handleProjectType = useCallback(
    (newProjectTypeId) => {
      setFilterParams((prev) => {
        const params = new URLSearchParams(prev);
        if (newProjectTypeId === 0) {
          params.delete('projectTypeId');
        } else {
          params.set('projectTypeId', String(newProjectTypeId));
        }
        params.set('pageNum', '1');
        return params;
      });
    },
    [setFilterParams]
  );
  const handleSemester = useCallback(
    (newSemester) => {
      setFilterParams((prev) => {
        const params = new URLSearchParams(prev);
        if (newSemester === 0) {
          params.delete('semester');
        } else {
          params.set('semester', newSemester);
        }
        params.set('pageNum', '1');
        console.log('최종 파라미터:', params.toString());
        return params;
      });
    },
    [setFilterParams]
  );
  const handleSearch = useCallback(
    (keyword) => {
      setFilterParams((prev) => {
        const params = new URLSearchParams(prev);
        if (!keyword) {
          params.delete('search'); // 검색어 없으면 파라미터 삭제
        } else {
          params.set('search', keyword);
        }
        params.set('pageNum', '1'); // 검색 시 페이지 초기화는 필수!
        return params;
      });
    },
    [setFilterParams]
  );

  const pageData = {
    pageArray, // 계산된 배열
    pageOn, // 현재 페이지 번호
    setPageOn: handlePageChange, // 페이지 변경 함수
    maxPage, // 최대 페이지 수
  };

  return (
    <>
      <div className=" flex flex-col px-4 pad:px-14.5 py-12 ">
        <TitleSection
          title="프로젝트"
          pageExplanation="서경대학교 멋쟁이사자처럼에서 탄생한 다양한 서비스를 둘러보세요!"
          searchApi={handleSearch}
        >
          <ProjectOption handleSemester={handleSemester} handleProjectType={handleProjectType} />
        </TitleSection>
        <ProjectSection data={projectListData} isLoading={isLoading} />
        {!(projectListData.content.length > 0) && (
          <p className="flex h-90 justify-center items-center text-[1.1rem] font-bold">
            검색 결과가 없습니다.
          </p>
        )}
        {projectListData.content.length > 0 && <ProjectPagenation props={pageData} />}
      </div>
    </>
  );
}

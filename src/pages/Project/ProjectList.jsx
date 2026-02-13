import { useEffect, useMemo } from 'react';

import TitleSection from '@/components/common/TitleSection';
import GridSection from '@/components/layout/background/GridSection';
import ProjectOption from '@/components/project/ProjectOption';
import ProjectPagenation from '@/components/project/ProjectPagenation';
import ProjectSection from '@/components/project/ProjectSection';
import useProjectListStore from '@/store/useProjectListStore';

export default function Project() {
  const { projectListData, isLoading, fetchProjectList, filterParams, setFilterParams } =
    useProjectListStore();

  const maxPage = projectListData?.totalPages || 1;

  const pageArray = useMemo(() => {
    if (maxPage === 0) return [1];
    const startPage = Math.floor((filterParams.pageNum - 1) / 5) * 5 + 1;
    return Array.from({ length: 5 }, (_, i) => startPage + i).filter((num) => num <= maxPage);
  }, [filterParams.pageNum, maxPage]);

  // 필터가 바뀔 때마다 데이터 패칭
  useEffect(() => {
    fetchProjectList();
  }, [filterParams, fetchProjectList]);

  // 페이지 변경 함수: URL의 쿼리 파라미터를 변경함
  const handlePageChange = (newPage) => {
    setFilterParams({ pageNum: newPage });
  };
  const handleProjectType = (newProjectTypeId) => {
    setFilterParams({ pageNum: 1, projectTypeId: newProjectTypeId });
  };
  const handleSemester = (newSemester) => {
    setFilterParams({ pageNum: 1, semester: newSemester });
  };
  const handleSearch = (keyword) => {
    setFilterParams({ pageNum: 1, search: keyword });
  };

  const pageData = {
    pageArray, // 계산된 배열
    pageOn: filterParams.pageNum, // 현재 페이지 번호
    setPageOn: handlePageChange, // 페이지 변경 함수
    maxPage, // 최대 페이지 수
  };
  const initOptionValue = {
    projectTypeId: filterParams.projectTypeId ? filterParams.projectTypeId : '전체',
    semester: filterParams.semester ? filterParams.semester : '전체',
  };

  return (
    <GridSection>
      <div className=" flex flex-col px-4 pad:px-14.5 py-12 ">
        <TitleSection
          title="프로젝트"
          pageExplanation="서경대학교 멋쟁이사자처럼에서 탄생한 다양한 서비스를 둘러보세요!"
          searchApi={handleSearch}
          initSearch={filterParams.search}
        >
          <ProjectOption
            handleSemester={handleSemester}
            handleProjectType={handleProjectType}
            initValue={initOptionValue}
          />
        </TitleSection>
        <ProjectSection data={projectListData} isLoading={isLoading} />
        {!(projectListData.content.length > 0) && (
          <p className="flex h-90 justify-center items-center text-[1.1rem] font-bold">
            검색 결과가 없습니다.
          </p>
        )}
        {projectListData.content.length > 0 && <ProjectPagenation props={pageData} />}
      </div>
    </GridSection>
  );
}

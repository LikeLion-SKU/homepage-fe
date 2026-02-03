import { useCallback, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';

import TitleSection from '@/components/common/TitleSection';
import GridSection from '@/components/layout/background/GridSection';
import ProjectOption from '@/components/project/ProjectOption';
import ProjectPagenation from '@/components/project/ProjectPagenation';
import ProjectSection from '@/components/project/ProjectSection';

export default function Project() {
  const projectListdata = useLoaderData(); //loader로 가져온 데이터
  const [filterParams, setFilterParams] = useSearchParams({}); //파라미터 관리
  const pageOn = Number(filterParams.get('page') || 0);
  const maxPage = projectListdata.totalPages;
  const [pageArray, setPageArray] = useState(() => {
    return [0, 1, 2, 3, 4].filter((num) => num < maxPage); // API가 0부터 시작할 때 예시
  });

  // 페이지 변경 함수: URL의 쿼리 파라미터를 변경함
  const handlePageChange = useCallback(
    (newPage) => {
      setFilterParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set('page', String(newPage));
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
        params.set('page', '0');
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
        params.delete('page');
        console.log('최종 파라미터:', params.toString());
        return params;
      });
    },
    [setFilterParams]
  );

  const pageData = {
    pageArray: pageArray,
    setPageArray: setPageArray,
    pageOn: pageOn,
    setPageOn: handlePageChange,
    maxPage: maxPage,
  };

  return (
    <GridSection>
      <div className=" flex flex-col px-4 pad:px-14.5 py-12 ">
        <TitleSection
          title="프로젝트"
          pageExplanation="서경대학교 멋쟁이사자처럼에서 탄생한 다양한 서비스를 둘러보세요!"
        >
          <ProjectOption handleSemester={handleSemester} handleProjectType={handleProjectType} />
        </TitleSection>
        <ProjectSection data={projectListdata} />
        {!(projectListdata.content.length > 0) && (
          <p className="flex h-90 justify-center items-center text-[1.1rem] font-bold">
            검색 결과가 없습니다.
          </p>
        )}
        {projectListdata.content.length > 0 && <ProjectPagenation props={pageData} />}
      </div>
    </GridSection>
  );
}

import { useCallback, useMemo } from 'react';
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
  const pageArray = useMemo(() => {
    // 5개씩 끊어서 보여주기 위한 시작 인덱스 (0, 5, 10...)
    const startPage = Math.floor(pageOn / 5) * 5;

    // startPage부터 5개를 생성하되, maxPage를 넘지 않는 것만 필터링
    return Array.from({ length: 5 }, (_, i) => startPage + i).filter((num) => num < maxPage);
  }, [pageOn, maxPage]);

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
  const handleSearch = useCallback(
    (keyword) => {
      setFilterParams((prev) => {
        const params = new URLSearchParams(prev);
        if (!keyword) {
          params.delete('search'); // 검색어 없으면 파라미터 삭제
        } else {
          params.set('search', keyword);
        }
        params.set('page', '0'); // 검색 시 페이지 초기화는 필수!
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
    <GridSection>
      <div className=" flex flex-col px-4 pad:px-14.5 py-12 ">
        <TitleSection
          title="프로젝트"
          pageExplanation="서경대학교 멋쟁이사자처럼에서 탄생한 다양한 서비스를 둘러보세요!"
          searchApi={handleSearch}
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

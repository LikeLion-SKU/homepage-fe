import { useState } from 'react';

import TitleSection from '@/components/common/TitleSection';
import GridSection from '@/components/layout/background/GridSection';
import ProjectOption from '@/components/project/ProjectOption';
import ProjectPagenation from '@/components/project/ProjectPagenation';
import ProjectSection from '@/components/project/ProjectSection';
import { projectData } from '@/components/project/projectDummyData';

export default function Project() {
  const [pageOn, setPageOn] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const maxPage = Math.ceil(projectData.length / 6);
  const [pageArray, setPageArray] = useState(() => {
    if (maxPage > 5) {
      return [1, 2, 3, 4, 5];
    } else {
      return [1, 2, 3, 4, 5].filter((num) => {
        if (num <= maxPage) return num;
      });
    }
  });
  const currentItems = projectData.slice((pageOn - 1) * ITEMS_PER_PAGE, pageOn * ITEMS_PER_PAGE);

  const pageData = {
    pageArray: pageArray,
    setPageArray: setPageArray,
    pageOn: pageOn,
    setPageOn: setPageOn,
    maxPage: maxPage,
  };

  return (
    <GridSection>
      <div className=" flex flex-col px-14.5 py-12 ">
        <TitleSection
          title="프로젝트"
          pageExplanation="서경대학교 멋쟁이사자처럼에서 탄생한 다양한 서비스를 둘러보세요!"
        >
          <ProjectOption />
        </TitleSection>
        <ProjectSection data={currentItems} />
        <ProjectPagenation props={pageData} />
        {!(projectData.length > 0) && (
          <div className="flex w-330 h-40 justify-center items-center text-[1.1rem] font-bold">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </GridSection>
  );
}

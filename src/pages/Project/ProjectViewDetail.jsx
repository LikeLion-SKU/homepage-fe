import { useEffect, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router';

import { getProjectDetail } from '@/api/projectApi';
//@ts-ignore
import Left from '@/assets/icons/left_anglebraket_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_anglebraket_icon.svg?react';
import GridSection from '@/components/layout/background/GridSection';
import ProjectDetailCard from '@/components/project/ProjectDetailCard';
import useProjectListStore from '@/store/useProjectListStore';

export default function ProjectViewDetail() {
  //@ts-ignore
  const { showToast } = useOutletContext();
  const [projectData, setProjectData] = useState({
    award: false,
    content: '프로젝트 설명',
    id: 0,
    projectImageResponses: [
      {
        imageUrl: '',
        projectImageId: 1,
      },
    ],
    projectMembers: [],
    projectTypeName: '내 이름은 톤',
    semester: 0,
    title: '프로젝트 타이틀',
  });
  const location = useLocation();
  const projectId = location.state.projectId;
  const { allProjectIdsByFilters } = useProjectListStore();

  const handleProjectId = async (value) => {
    const nextIndex = allProjectIdsByFilters.indexOf(projectData.id) + value;
    const newId = allProjectIdsByFilters[nextIndex];
    if (nextIndex < 0) {
      showToast('첫번째 프로젝트입니다.');
    } else if (!newId) {
      showToast('마지막 프로젝트입니다.');
    } else {
      try {
        const data = await getProjectDetail(newId);

        if (data) {
          setProjectData(data);
        }
      } catch (error) {
        console.error('데이터 없음:', error);
      }
    }
  };
  useEffect(() => {
    const getProjectData = async () => {
      try {
        const data = await getProjectDetail(projectId);
        setProjectData(data);
      } catch (error) {
        console.log('프로젝트 불러오기 실패:', error);
      }
    };
    getProjectData();
  }, []);

  return (
    <GridSection>
      <div className="flex px-8 pad:px-10 web:px-15 pt-18 pb-41">
        <div className="flex flex-col ">
          <button
            onClick={() => handleProjectId(-1)}
            className="flex px-3 py-3 pad:py-5 web:px-6.5 web:py-8 rounded-l-2xl mt-50 pad:mt-85 bg-[#F9F9F9] ml-auto"
          >
            <Left className="web:w-9 pad:w-7 w-5" />
          </button>
          <p className="text-[0.3rem] pad:text-[0.5rem] web:text-[0.7rem] text-[#B0B0B0] font-bold tracking-tighter">
            이전 프로젝트 보기
          </p>
        </div>
        <ProjectDetailCard data={projectData} />
        <div className="flex flex-col ">
          <button
            onClick={() => handleProjectId(1)}
            className="flex px-3 py-3 pad:py-5 web:px-6.5 web:py-8 rounded-r-2xl mt-50 pad:mt-85 bg-[#F9F9F9] mr-auto relative z-1"
          >
            <Right className="web:w-9 pad:w-7 w-5" />
          </button>
          <p className="text-[0.3rem] pad:text-[0.5rem] web:text-[0.7rem] text-[#B0B0B0] font-bold tracking-tighter text-end">
            다음 프로젝트 보기
          </p>
        </div>
      </div>
    </GridSection>
  );
}

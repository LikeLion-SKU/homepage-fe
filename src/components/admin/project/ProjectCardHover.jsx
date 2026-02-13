import { useNavigate, useOutletContext } from 'react-router';

import { deleteProject } from '@/api/projectApi';
//@ts-ignore
import Right from '@/assets/icons/right_icon.svg?react';
import useProjectListStore from '@/store/useProjectListStore';

export default function ProjectCardHover({ projectId }) {
  const navigate = useNavigate();
  //@ts-ignore
  const { openModal } = useOutletContext();
  const { fetchProjectList } = useProjectListStore();

  const deleteProjectData = async () => {
    await deleteProject(projectId);
    fetchProjectList();
  };
  return (
    <>
      <div className="flex w-41 h-12 bg-[#F8F8F8]">
        <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12 border-r-[0.5px] border-[#8C8C8C]">
          <Right />
        </div>
        <div
          onClick={() =>
            navigate(`/admin/project/edit`, { state: { projectId: projectId, isEdit: true } })
          }
          className="flex w-29 h-12 text-[1.1rem] justify-center items-center"
        >
          수정하기
        </div>
      </div>
      <div
        onClick={() => openModal('프로젝트를 삭제하시겠습니까?', () => deleteProjectData())}
        className="flex w-41 h-12 bg-[#F8F8F8]"
      >
        <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12 border-r-[0.5px] border-[#8C8C8C]">
          <Right />
        </div>
        <div className="flex w-29 h-12 text-[1.1rem] justify-center items-center">삭제하기</div>
      </div>
    </>
  );
}

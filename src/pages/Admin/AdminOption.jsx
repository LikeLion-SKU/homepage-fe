import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import { deleteProjectType, getProjectType, postProjectType } from '@/api/projectApi';
import { deleteSemester, postSemester } from '@/api/semesterApi';
import OptionAdminTable from '@/components/admin/Option/OptionAdminTable';
import OptionTitle from '@/components/admin/Option/OptionTitle';
import useSemesterListStore from '@/store/useSemesterListStore';

export default function AdminOption() {
  const [projectType, setProjectType] = useState([]);
  const [projectTypeId, setProjectTypeId] = useState([]);
  //@ts-ignore
  const { showToast } = useOutletContext();
  const { semesterData, fetchSemesters } = useSemesterListStore();
  useEffect(() => {
    const getOption = async () => {
      const projectTypeData = await getProjectType();
      setProjectType([...projectTypeData.map((item) => item.projectTypeName)]);
      setProjectTypeId([...projectTypeData.map((item) => item.projectTypeId)]);
    };
    getOption();
  }, []);

  const plusSemester = async (semesterNum) => {
    try {
      await postSemester(semesterNum);
    } catch (error) {
      console.log('기수 추가 실패:', error);
    } finally {
      fetchSemesters();
    }
  };
  const deleteSemesterNum = async (semesterNum) => {
    try {
      await deleteSemester(semesterNum);
    } catch (error) {
      console.log('기수 삭제 실패:', error);
      if (error.response && error.response.status === 409) {
        showToast('해당 기수를 사용 중인 데이터가 있어 삭제할 수 없습니다.');
      } else {
        showToast('기수 삭제 중 오류가 발생했습니다.');
      }
      throw error;
    } finally {
      fetchSemesters();
    }
  };
  const plusType = async (typeName) => {
    try {
      await postProjectType(typeName);
    } catch (error) {
      console.log('프로젝트 타입 추가 실패:', error);
    } finally {
      const projectTypeData = await getProjectType();
      setProjectType([...projectTypeData.map((item) => item.projectTypeName)]);
      setProjectTypeId([...projectTypeData.map((item) => item.projectTypeId)]);
    }
  };
  const deleteType = async (projectTypeName) => {
    try {
      const nameIndex = projectType.indexOf(projectTypeName);
      await deleteProjectType(projectTypeId[nameIndex]);
    } catch (error) {
      console.log('프로젝트 타입 삭제 실패:', error);
    } finally {
      const projectTypeData = await getProjectType();
      setProjectType([...projectTypeData.map((item) => item.projectTypeName)]);
      setProjectTypeId([...projectTypeData.map((item) => item.projectTypeId)]);
    }
  };

  return (
    <div className="flex flex-col gap-20 px-21 py-30">
      <OptionTitle />
      <div className="flex gap-4 mt-10">
        <OptionAdminTable
          title="기수"
          optionData={semesterData}
          handlePlus={plusSemester}
          handleDelete={deleteSemesterNum}
        />
        <OptionAdminTable
          title="대회명"
          optionData={projectType}
          handlePlus={plusType}
          handleDelete={deleteType}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

import { deleteProjectType, getProjectType, postProjectType } from '@/api/projectApi';
import { deleteSemester, getSemester, postSemester } from '@/api/semesterApi';
import OptionAdminTable from '@/components/admin/Option/OptionAdminTable';
import OptionTitle from '@/components/admin/Option/OptionTitle';

export default function AdminOption() {
  const [semester, setSemester] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [projectTypeId, setProjectTypeId] = useState([]);
  useEffect(() => {
    const getOption = async () => {
      setSemester(await getSemester());
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
      setSemester(await getSemester());
    }
  };
  const deleteSemesterNum = async (semesterNum) => {
    try {
      await deleteSemester(semesterNum);
    } catch (error) {
      console.log('기수 삭제 실패:', error);
      throw error;
    } finally {
      setSemester(await getSemester());
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
          optionData={semester}
          setOptionData={setSemester}
          handlePlus={plusSemester}
          handleDelete={deleteSemesterNum}
        />
        <OptionAdminTable
          title="대회명"
          optionData={projectType}
          setOptionData={setProjectType}
          handlePlus={plusType}
          handleDelete={deleteType}
        />
      </div>
    </div>
  );
}

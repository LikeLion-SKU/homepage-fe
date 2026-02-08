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
  }, [semester, projectType]);

  const deleteType = (projectTypeName) => {
    const nameIndex = projectType.indexOf(projectTypeName);
    deleteProjectType(projectTypeId[nameIndex]);
  };

  return (
    <div className="flex flex-col gap-20 px-21 py-30">
      <OptionTitle />
      <div className="flex gap-4 mt-10">
        <OptionAdminTable
          title="기수"
          optionData={semester}
          setOptionData={setSemester}
          handlePlus={postSemester}
          handleDelete={deleteSemester}
        />
        <OptionAdminTable
          title="대회명"
          optionData={projectType}
          setOptionData={setProjectType}
          handlePlus={postProjectType}
          handleDelete={deleteType}
        />
      </div>
    </div>
  );
}

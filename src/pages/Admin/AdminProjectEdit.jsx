import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router';

import { getProjectDetail, getProjectType, postProject, putProject } from '@/api/projectApi';
import { getSemester } from '@/api/semesterApi';
//@ts-ignore
import Left from '@/assets/icons/left_image_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_image_icon.svg?react';
import ProjectEditRule from '@/components/admin/project/ProjectEditRule';
import AdminProjectMember from '@/components/admin/project/ProjectMember';
import OptionBox from '@/components/common/Option/optionBox';

export default function AdminProjectEdit() {
  const [projectData, setProjectData] = useState({
    award: false,
    content: '',
    id: 0,
    projectImageResponses: [
      {
        imageUrl: '',
        projectImageId: 0,
      },
    ],
    projectMembers: {},
    projectTypeName: '',
    semester: '',
    title: '',
  });
  const [newFiles, setNewFiles] = useState([]); //새로 추가할 파일
  const [remainingImageIds, setRemainingImageIds] = useState([]); //남길 이미지 아이디 배열
  const [showImage, setShowImage] = useState([]); //보여주기용 이미지 배열
  const [showMember, setShowMember] = useState({});

  const [semesterOption, setSemesterOption] = useState([]);
  const prizeOption = ['수상O', '수상X'];
  const [projectTypeOption, setProjectTypeOption] = useState([]);
  const [projectTypeId, setProjectTypeId] = useState([]);
  const trackOption = ['PO', 'PM', 'DESIGN', 'FRONTEND', 'BACKEND'];

  const [imgNum, setImgNum] = useState(0); //현재 이미지 값

  const imgCount = showImage.length;
  const location = useLocation();
  const isEdit = location.state?.isEdit; // 수정 모드인지 확인
  const projectId = location.state?.projectId;

  const navigate = useNavigate();
  //@ts-ignore
  const { showToast } = useOutletContext();
  const fileInputRef = useRef(null);

  const handleExplainChange = (e) => {
    const value = e.target.value;
    if (value.length <= 300) {
      // 300자 이하일 때만 상태 업데이트
      setProjectData((prev) => ({ ...prev, content: value }));
    }
  };
  const imgFilePlus = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // 2. 선택된 파일들을 순회하며 미리보기 URL 생성
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      // 기존 이미지에 새로 추가된 이미지를 합칩니다.
      setShowImage((prev) => [
        ...prev,
        ...newPreviews, //기존 값 + 새 값으로 합치기
      ]);
      setNewFiles((prev) => [...prev, ...files]);
    }
  };
  const imgFileDelete = () => {
    // 1. 기존 이미지(서버에서 온 것)의 개수를 파악합니다.
    const existingImagesCount = projectData.projectImageResponses.length;

    if (imgNum < existingImagesCount) {
      // --- [기존 이미지 삭제 로직] ---
      const targetId = projectData.projectImageResponses[imgNum].projectImageId;

      // 유지 리스트(remainingImageIds)에서 해당 ID를 제거합니다.
      setRemainingImageIds((prev) => prev.filter((id) => id !== targetId));

      // projectData 내의 기존 이미지 리스트도 업데이트합니다.
      setProjectData((prev) => ({
        ...prev,
        projectImageResponses: prev.projectImageResponses.filter((_, i) => i !== imgNum),
      }));
    } else {
      // --- [새로 추가한 파일 삭제 로직] ---
      // newFiles 배열에서의 인덱스를 계산합니다.
      const fileIndex = imgNum - existingImagesCount;

      setNewFiles((prev) => prev.filter((_, i) => i !== fileIndex));
    }

    // 2. 공통: 보여주기용 미리보기 배열(showImage)에서 삭제
    setShowImage((prev) => prev.filter((_, i) => i !== imgNum));

    // 3. 인덱스 초기화 (삭제 후 안전하게 0번으로 이동)
    setImgNum(imgNum === 0 ? 0 : imgNum - 1);
  };
  const changeImg = async (direction) => {
    const nextNum = imgNum + direction;
    // 이미지 배열의 길이를 확인하여 처음과 끝 처리
    if (nextNum < 0) {
      setImgNum(imgCount - 1);
    } else if (nextNum > imgCount - 1) {
      setImgNum(0);
    } else {
      setImgNum(nextNum);
    }
  };
  const saveProject = async () => {
    if (!projectData.title) {
      showToast('프로젝트명을 입력해주세요.');
    } else if (!projectData.projectTypeName) {
      showToast('대회명을 입력해주세요.');
    } else if (!projectData.semester) {
      showToast('기수를 입력해주세요.');
    } else if (!projectData.content) {
      showToast('설명을 입력해주세요.');
    } else {
      try {
        const typeIndex = projectTypeOption.indexOf(projectData.projectTypeName);
        const { remainingProjectMemberIds, newProjectMembers } = processMemberData();

        if (remainingProjectMemberIds.length < 1 && Object.keys(newProjectMembers).length < 1) {
          showToast('멤버를 입력해주세요.');
          return;
        } else if (remainingImageIds.length < 1 && newFiles.length < 1) {
          showToast('이미지를 1개 이상 첨부해주세요.');
          return;
        }
        // API 호출 (추가/수정에 따라 다른 함수 호출)
        if (isEdit) {
          const updateData = {
            title: projectData.title,
            semesterId: parseInt(projectData.semester),
            award: projectData.award,
            projectTypeId: projectTypeId[typeIndex],
            content: projectData.content,
            remainingProjectMemberIds: remainingProjectMemberIds, //수정필요
            newProjectMembers: newProjectMembers, // AdminProjectMember에서 업데이트된 값
            remainingProjectImageIds: remainingImageIds,
          };
          await putProject(projectId, updateData, newFiles);
        } else {
          const updateData = {
            title: projectData.title,
            semesterId: parseInt(projectData.semester),
            award: projectData.award,
            projectTypeId: projectTypeId[typeIndex],
            content: projectData.content,
            projectMembers: newProjectMembers, // AdminProjectMember에서 업데이트된 값
          };
          await postProject(updateData, newFiles);
        }

        showToast('저장되었습니다.');
        navigate('/admin/project');
      } catch (error) {
        showToast('저장에 실패했습니다.');
        console.log('프로젝트 수정 실패:', error);
      }
    }
  };
  const formatMembersByTrack = (members) => {
    const grouped = {};
    members.forEach((m) => {
      const track = m.track; // 'PM', 'DESIGN' 등
      if (!grouped[track]) grouped[track] = [];
      grouped[track].push(m.projectMemberName);
    });
    return grouped;
  };
  const processMemberData = () => {
    const remainingProjectMemberIds = [];
    const newProjectMembers = {};

    // 1. UI 상태인 showMember(객체)를 순회합니다.
    Object.entries(showMember).forEach(([track, names]) => {
      // names가 배열이 아니면 건너뜀
      if (!Array.isArray(names)) return;

      names.forEach((name) => {
        // 1. 수정 모드일 때만 원본 배열과 비교하여 기존 멤버를 찾음
        if (isEdit) {
          const originalMemberArray = Array.isArray(projectData.projectMembers)
            ? projectData.projectMembers
            : [];

          const existingMember = originalMemberArray.find(
            (m) => m.track === track && m.projectMemberName === name
          );

          if (existingMember) {
            // 기존 멤버인 경우 ID 추출
            remainingProjectMemberIds.push(existingMember.projectMemberId);
            return; // 이 루프 종료 (다음 name으로 넘어감)
          }
        }

        // 2. 수정 모드가 아니거나, 수정 모드여도 기존 멤버 리스트에 없는 경우 (새 멤버)
        if (!newProjectMembers[track]) {
          newProjectMembers[track] = [];
        }
        newProjectMembers[track].push(name);
      });
    });

    return { remainingProjectMemberIds, newProjectMembers };
  };

  //옵션 데이터 얻어오기
  useEffect(() => {
    const getOption = async () => {
      setSemesterOption(await getSemester());
      const typeData = await getProjectType();
      setProjectTypeOption(typeData.map((data) => data.projectTypeName));
      setProjectTypeId(typeData.map((data) => data.projectTypeId));
    };
    getOption();
  }, []);
  //수정시 기존 데이터 얻어오기
  useEffect(() => {
    if (isEdit && projectId) {
      const getProjectData = async () => {
        try {
          const data = await getProjectDetail(projectId);
          const formattedMembers = formatMembersByTrack(data.projectMembers);
          setProjectData(data);
          // 기존 이미지 ID들을 유지 리스트에 초기값으로 설정
          setRemainingImageIds(data.projectImageResponses.map((img) => img.projectImageId));
          const imageUrls = data.projectImageResponses.map((img) => img.imageUrl);
          setShowImage(imageUrls);
          setShowMember(formattedMembers);
        } catch (error) {
          console.log('데이터 로드 실패:', error);
        }
      };
      getProjectData();
    }
  }, [isEdit, projectId]);

  return (
    <div className="flex flex-col items-center py-15 gap-7">
      <div className="relative flex flex-col w-285 h-256 bg-[#F2F2F2] py-10 px-8 gap-10">
        {projectData.projectImageResponses.length > 0 && (
          <button
            onClick={imgFileDelete}
            className="absolute top-17 right-14 w-30 h-10 text-center items-center text-[1rem] border bg-[#D9D9D9]"
          >
            이미지 삭제
          </button>
        )}
        <img src={showImage[imgNum]} className="w-269 h-151 bg-[#D9D9D9]" />
        <div className="flex justify-between">
          <div className="flex flex-col gap-8 w-164">
            <input
              value={projectData.title}
              onChange={(e) => setProjectData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder={projectData.title ? projectData.title : '프로젝트 이름'}
              className="text-[2rem] font-bold placeholder:text-black focus:outline-none"
            />
            <div className="flex gap-2.5">
              <OptionBox
                initValue={projectData.semester ? projectData.semester : '기수선택'}
                optionData={semesterOption}
                selectedNum={projectData.semester}
                setSelectedNum={(val) => setProjectData((prev) => ({ ...prev, semester: val }))} //수정필요
                bgColor="#D9D9D9"
              />
              <OptionBox
                initValue={projectData.award ? projectData.award : '수상여부'}
                optionData={prizeOption}
                selectedNum={projectData.award ? '수상O' : '수상X'}
                setSelectedNum={(val) =>
                  setProjectData((prev) => ({ ...prev, award: val === '수상O' ? true : false }))
                }
                bgColor="#D9D9D9"
              />
              <OptionBox
                initValue={projectData.projectTypeName ? projectData.projectTypeName : '대회선택'}
                optionData={projectTypeOption}
                selectedNum={projectData.projectTypeName}
                setSelectedNum={(val) =>
                  setProjectData((prev) => ({ ...prev, projectTypeName: val }))
                }
                bgColor="#D9D9D9"
              />
            </div>
            <div>
              <textarea
                value={projectData.content}
                onChange={(e) => handleExplainChange(e)}
                placeholder={projectData.content ? projectData.content : '프로젝트 설명'}
                className="h-42 text-[1.1rem] w-164 placeholder:text-black "
              />
              <div className="text-right text-gray-400 text-sm">
                {projectData.content.length} / 300
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-11 ">
            <div className="flex gap-9 items-center ml-5">
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-43 h-10 border text-[1rem] text-center items-center bg-[#D9D9D9]"
              >
                이미지 첨부
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={imgFilePlus}
                style={{ display: 'none' }} // 화면에서 숨김
                accept="image/*" // 이미지 파일만 선택 가능하게 제한
                multiple
              />
              <div className="flex gap-5">
                <button
                  onClick={() => changeImg(-1)}
                  className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12"
                >
                  <Left />
                </button>
                <button
                  onClick={() => changeImg(1)}
                  className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12"
                >
                  <Right />
                </button>
              </div>
            </div>
            <AdminProjectMember
              optionData={trackOption}
              selectedTrack={showMember} //수정필요
              setSelectedTrack={setShowMember}
            />
          </div>
        </div>
      </div>
      <div className="flex w-285 pl-120">
        <button
          onClick={() => saveProject()}
          className="w-40 h-12 border bg-[#D9D9D9] text-center items-center"
        >
          저장하기
        </button>
        <ProjectEditRule />
      </div>
    </div>
  );
}

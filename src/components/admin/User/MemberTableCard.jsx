import { useState } from 'react';
import { useOutletContext } from 'react-router';

import { patchClubMember, postCopyClubMember } from '@/api/userApi';
//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';
//@ts-ignore
import Copy from '@/assets/icons/copy_icon.svg?react';
import OptionBox from '@/components/common/Option/optionBox';

export default function MemberTableCard({ index, cardData, cardCheckData }) {
  const semesterOption = ['14기', '13기', '12기', '11기'];
  const roleOption = ['회장', '부회장', '운영진', '아기사자', '게스트'];
  const trackOption = ['PO', '프론트엔드', '백엔드', 'PM', 'Design', 'PM&Design'];
  const positionMap = {
    LEAD: '대표',
    COLEAD: '부대표',
    COREMEMBER: '운영진',
    BABYLION: '아기사자',
  };
  //@ts-ignore
  const { openModal, showToast } = useOutletContext();
  const isChecked = cardCheckData.checkedList.includes(cardData.clubMemberId);
  const isEditingThisCard = cardCheckData.isEdit === index;
  const [selectedSemester, setSelectedSemester] = useState(cardData.semester);
  const [selectedPosition, setSelectedPosition] = useState(positionMap[cardData.position]);
  const [selectedTrack, setSelectedTrack] = useState(cardData.track);
  const handleToggle = () => {
    if (isChecked) {
      // 이미 있으면 제외 (하나 빼기)
      cardCheckData.setCheckedList(
        cardCheckData.checkedList.filter((item) => item !== cardData.clubMemberId)
      );
    } else {
      // 없으면 추가 (하나 넣기)
      cardCheckData.setCheckedList((prev) => [...prev, cardData.clubMemberId]);
    }
  };
  const handleEdit = () => {
    if (isEditingThisCard) {
      // 수정 완료 시
      openModal('선택한 구성원을 수정하시겠습니까?', async () => {
        const parameter = {
          clubMemberId: cardData.clubMemberId,
          semester: parseInt(selectedSemester),
          position: Object.keys(positionMap).find((key) => positionMap[key] === selectedPosition),
          track: selectedTrack,
        };
        await patchClubMember(parameter);
        cardCheckData.setTrigger((prev) => !prev);
        cardCheckData.setIsEdit(-1);
        showToast('수정완료 되었습니다.');
      });
    } else if (cardCheckData.isEdit === -1) {
      // 수정 시작 시
      cardCheckData.setIsEdit(index);
    } else {
      showToast('한 번에 한 명의 수정만 가능합니다. 수정 완료를 눌러주세요.');
    }
  };
  const handleCopyClick = () => {
    openModal(`선택한 구성원을 복사하시겠습니까?`, async () => {
      // 실제 복사 로직 (예: navigator.clipboard.writeText...)
      const parameter = {
        userId: cardData.userId,
        semester: cardData.semester,
        position: cardData.position,
        track: cardData.track,
      };
      await postCopyClubMember(parameter);
      cardCheckData.setTrigger((prev) => !prev);
      cardCheckData.setIsEdit(-1);
      showToast('복사가 완료되었습니다.');
    });
  };

  return (
    <div
      className={`w-314 h-21 flex shrink-0 items-center pl-11 pr-10 text-[1.1rem] font-semibold gap-10 ${isEditingThisCard ? 'bg-[#E7E7E7]' : ''}`}
    >
      {isChecked ? (
        <Check onClick={() => handleToggle()} />
      ) : (
        <button onClick={() => handleToggle()} className="w-7 h-6.25 border-2" />
      )}
      <div className="flex w-300 items-center">
        {isEditingThisCard ? (
          <OptionBox
            initValue={cardData.semester}
            optionData={semesterOption}
            selectedNum={selectedSemester}
            setSelectedNum={setSelectedSemester}
          />
        ) : (
          <p className="w-28 text-center ml-2">{cardData.semester}</p>
        )}
        {isEditingThisCard ? (
          <div className="ml-10">
            <OptionBox
              initValue={positionMap[cardData.position]}
              optionData={roleOption}
              selectedNum={selectedPosition}
              setSelectedNum={setSelectedPosition}
            />
          </div>
        ) : (
          <p className="w-28 text-center shrink-0 ml-8.5">{positionMap[cardData.position]}</p>
        )}
        <p className="ml-16 shrink-0">{cardData.name}</p>
        {isEditingThisCard ? (
          <div className="ml-17">
            <OptionBox
              initValue={cardData.track}
              optionData={trackOption}
              selectedNum={selectedTrack}
              setSelectedNum={setSelectedTrack}
            />
          </div>
        ) : (
          <p className="w-28 text-center shrink-0 ml-16">{cardData.track}</p>
        )}
        <p className="w-40 shrink-0 text-center ml-2">{cardData.department}</p>
        <p className="ml-3">{cardData.studentNumber}</p>
        <button
          onClick={() => handleEdit()}
          className={`w-17 h-9 ml-14 border text-center text-[1.1rem] font-semibold ${isEditingThisCard ? 'bg-[#D3D3D3]' : ''}`}
        >
          수정
        </button>
        <div className="w-6 h-6 ml-24">
          {isEditingThisCard && <Copy onClick={() => handleCopyClick()} />}
        </div>
      </div>
    </div>
  );
}

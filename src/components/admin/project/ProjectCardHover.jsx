import { useState } from 'react';
import { useNavigate } from 'react-router';

//@ts-ignore
import Right from '@/assets/icons/right_icon.svg?react';
import Modal from '@/components/common/Modal/ConfirmModal';

export default function ProjectCardHover() {
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);
  return (
    <>
      <div className="flex w-41 h-12 bg-[#F8F8F8]">
        <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12 border-r-[0.5px] border-[#8C8C8C]">
          <Right />
        </div>
        <div
          onClick={() => {
            navigate('/admin/project/edit');
          }}
          className="flex w-29 h-12 text-[1.1rem] justify-center items-center"
        >
          수정하기
        </div>
      </div>
      <div onClick={() => setOnModal(true)} className="flex w-41 h-12 bg-[#F8F8F8]">
        <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12 border-r-[0.5px] border-[#8C8C8C]">
          <Right />
        </div>
        <div className="flex w-29 h-12 text-[1.1rem] justify-center items-center">삭제하기</div>
      </div>
      <Modal isOpen={onModal} cancel={() => setOnModal(false)} confirm={() => setOnModal(false)}>
        프로젝트를 삭제하시겠습니까?
      </Modal>
    </>
  );
}

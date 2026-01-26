import Modal from '@/components/common/Modal/ConfirmModal';
import Toast from '@/components/common/Toast/Toast';

export default function NoticeMessage({
  isDeleteSelectedModalOpen,
  setIsDeleteSelectedModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  toastMessage,
  showToast,
  handleDeleteSelected,
  handleConfirmEdit,
}) {
  return (
    <>
      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isDeleteSelectedModalOpen}
        cancel={() => setIsDeleteSelectedModalOpen(false)}
        confirm={handleDeleteSelected}
      >
        선택한 모든 공고를 삭제하시겠습니까?
      </Modal>
      {/* 수정 확인 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        cancel={() => setIsEditModalOpen(false)}
        confirm={handleConfirmEdit}
      >
        선택한 공고를 수정하시겠습니까?
      </Modal>
      <Toast isToast={showToast} message={toastMessage} />
    </>
  );
}

import Modal from '@/components/common/Modal/ConfirmModal';
import Toast from '@/components/common/Toast/Toast';

export default function NoticeMessage({
  isDeleteSelectedModalOpen,
  setIsDeleteSelectedModalOpen,
  isSaveModalOpen,
  setIsSaveModalOpen,
  isEditCompleteModalOpen,
  setIsEditCompleteModalOpen,
  isWarningModalOpen,
  setIsWarningModalOpen,
  warningMessage,
  toastMessage,
  showToast,
  handleDeleteSelected,
  showToastMessage,
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
      {/* 수정 완료 확인 모달 */}
      <Modal
        isOpen={isEditCompleteModalOpen}
        cancel={() => setIsEditCompleteModalOpen(false)}
        confirm={() => {
          setIsEditCompleteModalOpen(false);
          showToastMessage('수정이 완료되었습니다.');
        }}
      >
        수정이 완료되었습니다.
      </Modal>
      {/* 저장 완료 확인 모달 */}
      <Modal
        isOpen={isSaveModalOpen}
        cancel={() => setIsSaveModalOpen(false)}
        confirm={() => {
          setIsSaveModalOpen(false);
          showToastMessage('저장되었습니다.');
        }}
      >
        저장되었습니다.
      </Modal>
      {/* 경고 모달 */}
      <Modal
        isOpen={isWarningModalOpen}
        cancel={() => setIsWarningModalOpen(false)}
        confirm={() => setIsWarningModalOpen(false)}
      >
        {warningMessage}
      </Modal>
      <Toast isToast={showToast} message={toastMessage} />
    </>
  );
}

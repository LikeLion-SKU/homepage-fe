import ConfirmModal from '@/components/common/Modal/ConfirmModal';

export default function SignUpConfirm({
  isOpen,
  onClose,
  message = '필수항목에 모두 입력하세요.',
}) {
  const handleConfirm = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <ConfirmModal isOpen={isOpen} confirm={handleConfirm} cancel={handleCancel}>
      {message}
    </ConfirmModal>
  );
}

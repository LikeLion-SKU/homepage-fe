import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import CustomCursor from '@/components/common/CustomCursor';
import Modal from '@/components/common/Modal/ConfirmModal';
import Toast from '@/components/common/Toast/Toast';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SideBar from '@/pages/SideBar/SideBar';

export default function RootLayout() {
  const [toastData, setToastData] = useState({
    onToast: false,
    toastMessage: '',
  });
  const [modalData, setModalData] = useState({
    isOpen: false,
    message: '',
    onConfirm: () => {},
  });
  const [onSideBar, setOnSideBar] = useState(false);

  const openModal = (message, onConfirm) => {
    setModalData({
      isOpen: true,
      message,
      onConfirm: () => {
        onConfirm(); // 전달받은 함수 실행,확인시 실제로 작동할 함수
        closeModal(); // 실행 후 모달 닫기
      },
    });
  };
  const closeModal = () => {
    //모달 닫기
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };
  const showToast = (toastMessage) => {
    setToastData({ onToast: true, toastMessage: toastMessage });

    setTimeout(() => {
      setToastData({ onToast: false, toastMessage: toastMessage });
    }, 1500);
  };
  const handleSideBar = () => {
    setOnSideBar(!onSideBar);
  };

  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden no-scrollbar">
      <CustomCursor />
      <Header handleSideBar={() => handleSideBar()} />
      <div className="relative flex-1 min-h-fit bg-[#FAFBF8] isolate">
        <div
          className={`transition-opacity duration-500 ease-out ${
            onSideBar ? 'opacity-0 h-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Outlet
            context={{
              openModal,
              showToast,
            }} /* 하위에서 const { openModal } = useOutletContext();방식으로 사용가능 */
          />
        </div>

        <div
          className={`w-full h-fit transform transition-transform 
            duration-500 ease-out ${onSideBar ? 'relative translate-x-0' : 'absolute top-0 translate-x-full overflow-hidden'}`}
        >
          <SideBar handleSideBar={handleSideBar} />
        </div>
      </div>
      <ScrollRestoration />
      <Footer />
      {/* 공통 모달 하나만 배치 */}
      <Modal isOpen={modalData.isOpen} cancel={closeModal} confirm={modalData.onConfirm}>
        {modalData.message}
      </Modal>
      <Toast isToast={toastData.onToast} message={toastData.toastMessage} />
    </main>
  );
}

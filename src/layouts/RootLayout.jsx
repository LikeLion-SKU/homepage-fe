import { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';

import CustomCursor from '@/components/common/CustomCursor';
import Modal from '@/components/common/Modal/ConfirmModal';
import Toast from '@/components/common/Toast/Toast';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SideBar from '@/pages/SideBar/SideBar';
import useSemesterListStore from '@/store/useSemesterListStore';
import { showResultButton } from '@/utils/showResultButton';

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
  const { fetchSemesters } = useSemesterListStore();
  const [showResult, setShowResult] = useState(false);

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
  const handleSideBar = (isOpen) => {
    if (isOpen === true || isOpen === false) {
      setOnSideBar(isOpen);
    } else {
      setOnSideBar(!onSideBar);
    }
  };

  useEffect(() => {
    const getSettingData = async () => {
      await fetchSemesters();
      setShowResult(await showResultButton());
    };
    getSettingData();
    // 1. 데스크탑 기준 미디어 쿼리 생성 (예: 1024px 이상)
    const mql = window.matchMedia('(min-width: 1024px)');

    // 2. 크기 변화 시 실행될 핸들러
    const handleDesktopChange = (e) => {
      if (e.matches) {
        // 데스크탑 크기에 진입하면 사이드바를 닫음
        setOnSideBar(false);
      }
    };

    // 3. 리스너 등록
    mql.addEventListener('change', handleDesktopChange);

    // 5. 언마운트 시 리스너 제거 (메모리 누수 방지)
    return () => mql.removeEventListener('change', handleDesktopChange);
  }, []);

  return (
    <main className="flex flex-col w-full min-h-screen overflow-y-hidden overflow-x-hidden no-scrollbar">
      <CustomCursor />
      <Header handleSideBar={handleSideBar} showResult={showResult} />
      <div className="relative flex-1 min-h-fit bg-[#FAFBF8]">
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
          <SideBar handleSideBar={handleSideBar} showResult={showResult} />
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

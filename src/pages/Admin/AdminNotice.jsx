import AdminTitleSection from '@/components/admin/AdminTitleSection';
import NoticeButton from '@/components/admin/Notice/NoticeButton';
import NoticeMessage from '@/components/admin/Notice/NoticeMessage';
import NoticeTableData from '@/components/admin/Notice/NoticeTableData';
import NoticeTableRow from '@/components/admin/Notice/NoticeTableRow';

export default function AdminNotice() {
  const propsData = {
    title: '공고 일정 관리',
    explain: '공고 일정 관리 페이지입니다.',
    rule: [],
  };

  return (
    <NoticeTableData>
      {({
        noticeData,
        editingIndex,
        checkedList,
        setCheckedList,
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
        handleAddRow,
        handleEdit,
        handleSave,
        handleCancel,
        showToastMessage,
        handleCheck,
        handleDeleteSelected,
      }) => (
        <div className="flex flex-col gap-8 px-21 py-30">
          <AdminTitleSection props={propsData}>{null}</AdminTitleSection>
          <div className="flex flex-col gap-5.5">
            {/* 전체 선택 버튼 */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <NoticeButton
                  type="selectAll"
                  onClick={handleCheck}
                  checkedCount={checkedList.length}
                />
                {checkedList.length > 0 && (
                  <NoticeButton
                    type="delete"
                    onClick={() => setIsDeleteSelectedModalOpen(true)}
                    checkedCount={checkedList.length}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col border bg-[#FFFFFF]">
            {/* 테이블 헤더 */}
            <div className="flex pl-11 pr-10 h-20 justify-between items-center font-semibold border-b bg-[#FFFFFF]">
              <div className="w-7"></div>
              <p className="w-24 text-center">모집 기수</p>
              <p className="w-40 text-center">공개일</p>
              <p className="w-40 text-center">마감일</p>
              <p className="w-40 text-center">서류 발표일</p>
              <p className="w-40 text-center">최종 발표일</p>
              <div className="w-24"></div>
            </div>
            {/* 테이블 바디 */}
            <div className="flex flex-col">
              {noticeData.map((row, index) => (
                <div key={index} className="relative">
                  <NoticeTableRow
                    key={`${index}-${editingIndex === index}`}
                    index={index}
                    rowData={row}
                    isEditing={editingIndex === index}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    checkedList={checkedList}
                    setCheckedList={setCheckedList}
                  />
                </div>
              ))}
            </div>
            {/* 플러스 버튼 */}
            <div className="flex justify-center items-center h-16 ">
              <NoticeButton type="plus" onClick={handleAddRow} />
            </div>
          </div>
          {/* 모달 및 토스트 메시지 */}
          <NoticeMessage
            isDeleteSelectedModalOpen={isDeleteSelectedModalOpen}
            setIsDeleteSelectedModalOpen={setIsDeleteSelectedModalOpen}
            isSaveModalOpen={isSaveModalOpen}
            setIsSaveModalOpen={setIsSaveModalOpen}
            isEditCompleteModalOpen={isEditCompleteModalOpen}
            setIsEditCompleteModalOpen={setIsEditCompleteModalOpen}
            isWarningModalOpen={isWarningModalOpen}
            setIsWarningModalOpen={setIsWarningModalOpen}
            warningMessage={warningMessage}
            toastMessage={toastMessage}
            showToast={showToast}
            handleDeleteSelected={handleDeleteSelected}
            showToastMessage={showToastMessage}
          />
        </div>
      )}
    </NoticeTableData>
  );
}

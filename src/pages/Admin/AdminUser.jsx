import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';

import { getClubMemberAdmin, getGuest } from '@/api/userApi';
import AdminTitleSection from '@/components/admin/AdminTitleSection';
import AdminMember from '@/components/admin/User/AdminMember';
import AdminUserMember from '@/components/admin/User/AdminUserMember';
import ButtonGroup from '@/components/admin/User/ButtonGroup';

export default function AdminUser() {
  const rule1 = {
    title: '사용자 관리',
    explain: '게스트에게 구성원 권한을 부여하거나 구성원을 게스트 권한으로 변경하는 페이지입니다.',
    rule: [
      '1. 권한 변경하고 싶은 게스트 / 구성원 선택',
      '2. 구성원이동 / 게스트 이동 클릭',
      '3. 권한 변경 완료',
    ],
  };
  const rule2 = {
    title: '사용자 관리',
    explain: '게스트에게 구성원 권한을 부여하거나 구성원을 게스트 권한으로 변경하는 페이지입니다.',
    rule: [],
  };
  const semesterData = useLoaderData();
  const trackData = ['PO', 'PM', 'DESIGN', 'FRONTEND', 'BACKEND'];
  const roleData = ['대표', '부대표', '운영진', '아기사자'];
  const positionMap = {
    대표: 'LEAD',
    부대표: 'COLEAD',
    운영진: 'COREMEMBER',
    아기사자: 'BABYLION',
  };

  const [isUser, setIsUser] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedTrack, setSelectedIsTrack] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  const [guestData, setGuestData] = useState([{}, {}]);
  const [isGetGuset, setIsGetGUest] = useState([true, true]);
  const [memberData, setMemberData] = useState([]);
  const [debouncedSearchName, setDebouncedSearch] = useState('');
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      if (isUser) {
        setIsGetGUest;
        //게스트 구성원 조회
        if (isGetGuset[0]) {
          const parameter = {
            isGuest: true,
            lastUserId: guestData[0].lastCursor,
            size: 6,
            keyword: '',
          };

          const filteredParameter = Object.entries(parameter).reduce((acc, [key, value]) => {
            // value가 존재할 때만(빈 문자열 아님, NaN 아님 등) 객체에 추가
            if (value) {
              acc[key] = value;
            }
            return acc;
          }, {});
          const newData = await getGuest(filteredParameter);
          setGuestData([
            (prev) => ({
              ...prev,
              userInformationList: {
                ...prev.userInformationList,
                hasNext: newData.userInformationList.hasNext,
                lastCursor: newData.userInformationList.lastCursor,
                content: [
                  ...prev.userInformationList.content,
                  ...newData.userInformationList.content,
                ],
              },
            }),
            (prev) => prev,
          ]);
        }
        if (isGetGuset[1]) {
          const parameter = {
            isGuest: false,
            lastUserId: guestData[1].lastCursor,
            size: 6,
            keyword: '',
          };

          const filteredParameter = Object.entries(parameter).reduce((acc, [key, value]) => {
            // value가 존재할 때만(빈 문자열 아님, NaN 아님 등) 객체에 추가
            if (value) {
              acc[key] = value;
            }
            return acc;
          }, {});
          const newData = await getGuest(filteredParameter);
          setGuestData([
            (prev) => prev,
            (prev) => ({
              ...prev,
              userInformationList: {
                ...prev.userInformationList,
                hasNext: newData.userInformationList.hasNext,
                lastCursor: newData.userInformationList.lastCursor,
                content: [
                  ...prev.userInformationList.content,
                  ...newData.userInformationList.content,
                ],
              },
            }),
          ]);
        }
      } else {
        const parameter = {
          semester: parseInt(selectedSemester),
          position: positionMap[selectedPosition],
          track: selectedTrack,
          keyword: debouncedSearchName,
        };
        const filteredParameter = Object.entries(parameter).reduce((acc, [key, value]) => {
          // value가 존재할 때만(빈 문자열 아님, NaN 아님 등) 객체에 추가
          if (value) {
            acc[key] = value;
          }
          return acc;
        }, {});
        setMemberData(await getClubMemberAdmin(filteredParameter));
      }
    };
    getUserData();
  }, [isUser, trigger, selectedSemester, selectedPosition, selectedTrack, debouncedSearchName]);

  return (
    <div className="relative flex flex-col p-21 gap-14">
      <div className="absolute left-70 top-23 flex gap-3">
        <div
          onClick={() => setIsUser(true)}
          className={`flex w-30 h-10 justify-center items-center text-[1rem] border ${isUser ? 'bg-[#CBCBCB]' : 'bg-white'}`}
        >
          게스트 관리
        </div>
        <div
          onClick={() => setIsUser(false)}
          className={`flex w-30 h-10 justify-center items-center text-[1rem] border ${isUser ? 'bg-white' : 'bg-[#CBCBCB]'}`}
        >
          구성원 관리
        </div>
      </div>
      <AdminTitleSection props={isUser ? rule1 : rule2}>
        <div className="flex flex-col gap-5">
          {!isUser && (
            <>
              <ButtonGroup
                buttonData={semesterData}
                isCheck={selectedSemester}
                setIsCheck={setSelectedSemester}
              />
              <ButtonGroup
                buttonData={trackData}
                isCheck={selectedTrack}
                setIsCheck={setSelectedIsTrack}
              />
              <ButtonGroup
                buttonData={roleData}
                isCheck={selectedPosition}
                setIsCheck={setSelectedPosition}
              />
            </>
          )}
        </div>
      </AdminTitleSection>
      <div className="flex border-t">
        {isUser ? (
          <AdminUserMember guestData={guestData[0]} memberData={guestData[1]} />
        ) : (
          <AdminMember
            memberData={memberData}
            setTrigger={setTrigger}
            setDebouncedSearch={setDebouncedSearch}
          />
        )}
      </div>
    </div>
  );
}

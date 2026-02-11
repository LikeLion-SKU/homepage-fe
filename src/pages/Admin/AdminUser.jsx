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

  const [guestData, setGuestData] = useState([
    {
      guest: true,
      userInformationList: {
        content: [],
        lastCursor: 0,
        hasNext: false,
        size: 6,
      },
    },
    {
      guest: false,
      userInformationList: {
        content: [],
        lastCursor: 0,
        hasNext: false,
        size: 6,
      },
    },
  ]);
  const [isGetGuest, setIsGetGuest] = useState([true, true]);
  const [debouncedGuestName, setDebouncedGuestName] = useState(['', '']);

  const [memberData, setMemberData] = useState([]);
  const [debouncedSearchName, setDebouncedSearch] = useState('');
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      if (isUser) {
        //게스트 구성원 조회
        if (isGetGuest[0]) {
          setIsGetGuest((prev) => [false, prev[1]]);
          const parameter = {
            isGuest: true,
            lastUserId: guestData[0].userInformationList.lastCursor,
            size: 10,
            keyword: '',
          };

          const filteredParameter = Object.entries(parameter).reduce((acc, [key, value]) => {
            // value가 null이나 undefined가 아닐 때만 추가 (0이나 false는 포함됨)
            if (value !== null && value !== undefined && value !== '' && value !== 0) {
              acc[key] = value;
            }
            return acc;
          }, {});
          const newData = await getGuest(filteredParameter);

          setGuestData((prev) => {
            const existingIds = prev[0].userInformationList.content.map((user) => user.userId);
            const uniqueNewContent = newData.userInformationList.content.filter(
              (newUser) => !existingIds.includes(newUser.userId)
            );
            return [
              {
                ...prev[0],
                userInformationList: {
                  ...prev[0].userInformationList,
                  hasNext: newData.userInformationList.hasNext,
                  lastCursor: newData.userInformationList.lastCursor,
                  content: [...prev[0].userInformationList.content, ...uniqueNewContent],
                },
              },
              prev[1],
            ];
          });
        }
        if (isGetGuest[1]) {
          const parameter = {
            isGuest: false,
            lastUserId: guestData[1].userInformationList.lastCursor,
            size: 6,
            keyword: '',
          };

          const filteredParameter = Object.entries(parameter).reduce((acc, [key, value]) => {
            // value가 null이나 undefined가 아닐 때만 추가 (0이나 false는 포함됨)
            if (value !== null && value !== undefined && value !== '' && value !== 0) {
              acc[key] = value;
            }
            return acc;
          }, {});
          const newData = await getGuest(filteredParameter);
          setGuestData((prev) => {
            const existingIds = prev[1].userInformationList.content.map((user) => user.userId);
            const uniqueNewContent = newData.userInformationList.content.filter(
              (newUser) => !existingIds.includes(newUser.userId)
            );
            return [
              prev[0],
              {
                ...prev[1],
                userInformationList: {
                  ...prev[1].userInformationList,
                  hasNext: newData.userInformationList.hasNext,
                  lastCursor: newData.userInformationList.lastCursor,
                  content: [...prev[1].userInformationList.content, ...uniqueNewContent],
                },
              },
            ];
          });
          setIsGetGuest((prev) => [prev[0], false]);
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

  const handleGuestData = async (getDataNum) => {
    if (getDataNum == 0) {
      let parameter = {
        isGuest: true,
        size: 10,
      };

      let newData = await getGuest(parameter);

      setGuestData((prev) => [newData, prev[1]]);
      setIsGetGuest((prev) => [false, prev[1]]);
    } else if (getDataNum == 1) {
      let parameter = {
        isGuest: false,
        size: 10,
      };

      let newData = await getGuest(parameter);

      setGuestData((prev) => [prev[0], newData]);
      setIsGetGuest((prev) => [prev[0], false]);
    } else if (getDataNum == 2) {
      let parameter = {
        isGuest: true,
        size: 10,
      };

      let newData = await getGuest(parameter);

      setGuestData((prev) => [newData, prev[1]]);

      parameter = {
        isGuest: false,
        size: 10,
      };

      newData = await getGuest(parameter);
      setGuestData((prev) => [prev[0], newData]);
      setIsGetGuest([false, false]);
    }
  };

  useEffect(() => {
    const getSearchName = async () => {
      if (debouncedGuestName[0] !== '') {
        const parameter = {
          isGuest: true,
          size: 10,
          keyword: debouncedGuestName[0],
        };

        let newData = await getGuest(parameter);

        setGuestData((prev) => [newData, prev[1]]);
        setIsGetGuest((prev) => [false, prev[1]]);
      } else {
        handleGuestData(0);
      }
      if (debouncedGuestName[1] !== '') {
        const parameter = {
          isGuest: false,
          size: 10,
          keyword: debouncedGuestName[1],
        };

        let newData = await getGuest(parameter);

        setGuestData((prev) => [prev[0], newData]);
        setIsGetGuest((prev) => [prev[0], false]);
      } else {
        handleGuestData(1);
      }
    };
    getSearchName();
  }, [debouncedGuestName]);

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
          <AdminUserMember
            guestData={guestData[0]}
            memberData={guestData[1]}
            setIsGetGuest={setIsGetGuest}
            setTrigger={setTrigger}
            handleGuestData={handleGuestData}
            setDebouncedGuestName={setDebouncedGuestName}
          />
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

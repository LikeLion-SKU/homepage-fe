import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useProjectListStore = create(
  persist(
    (set) => ({
      allProjectIdsByFilters: [],

      setProjectIdList: (idList) =>
        set(() => ({
          allProjectIdsByFilters: idList,
        })),
    }),
    {
      name: 'project-list-storage', // 저장소에 사용될 키 이름
      storage: createJSONStorage(() => sessionStorage), // ✅ localStorage 대신 sessionStorage 사용
    }
  )
);

export default useProjectListStore;

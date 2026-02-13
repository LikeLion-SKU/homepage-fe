import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getProjectList } from '@/api/projectApi';

// API 경로 확인

const useProjectListStore = create(
  persist(
    (set, get) => ({
      filterParams: {
        pageNum: 1,
        semester: null,
        projectTypeId: null,
        search: '',
      },
      projectListData: {
        content: [],
        first: true,
        last: false,
        pageNum: 0,
        pageSize: 6,
        totalElements: 0,
        totalPages: 0,
      },
      allProjectIdsByFilters: [],
      isLoading: false,

      setFilterParams: (newParams) =>
        set((state) => ({
          filterParams: { ...state.filterParams, ...newParams },
        })),

      // 데이터 불러오기 액션
      fetchProjectList: async () => {
        set({ isLoading: true });
        try {
          const currentParams = get().filterParams;
          const filteredParams = Object.fromEntries(
            Object.entries(currentParams).filter(
              ([, value]) => value !== null && value !== undefined && value !== '' && value !== 0
            )
          );
          const data = await getProjectList(filteredParams);
          set({
            projectListData: data.projectPageResponse,
            allProjectIdsByFilters: data.allProjectIdsByFilters,
          });
        } catch (error) {
          console.error('데이터 로드 실패', error);
        } finally {
          set({ isLoading: false });
        }
      },

      // 수동 업데이트가 필요할 때 사용
      setProjectListData: (data) => set({ projectListData: data }),
      setProjectIdList: (idList) => set({ allProjectIdsByFilters: idList }),
    }),
    {
      name: 'project-list-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        allProjectIdsByFilters: state.allProjectIdsByFilters,
      }),
    }
  )
);

export default useProjectListStore;

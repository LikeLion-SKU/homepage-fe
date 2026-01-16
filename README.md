# homepage-fe

## LikeLion 14th homepage frontend code space

---

## **🎯 Git Convention**

---

- 🎉 **Start:** Start New Project [:tada:]
- ✨ **Feat:** 새로운 기능을 추가 [:sparkles:]
- 🐛 **Fix:** 버그 수정 [:bug:]
- 🎨 **Design:** CSS 등 사용자 UI 디자인 변경 [:art:]
- ♻️ **Refactor:** 코드 리팩토링 [:recycle:]
- 🔧 **Settings:** Changing configuration files [:wrench:]
- 🗃️ **Comment:** 필요한 주석 추가 및 변경 [:card_file_box:]
- ➕ **Dependency/Plugin:** Add a dependency/plugin [:heavy_plus_sign:]
- 📝 **Docs:** 문서 수정 [:memo:]
- 🔀 **Merge:** Merge branches [:twisted_rightwards_arrows:]
- 🚀 **Deploy:** Deploying stuff [:rocket:]
- 🚚 **Rename:** 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 [:truck:]
- 🔥 **Remove:** 파일을 삭제하는 작업만 수행한 경우 [:fire:]
- ⏪️ **Revert:** 전 버전으로 롤백 [:rewind:]

## 🌲 Branch Convention

---

- **`main`**: 배포 가능한 브랜치, 항상 배포 가능한 상태를 유지
- **`develop`**: 다음 버전을 위한 개발 브랜치, 팀원들의 작업 결과물이 모이는 '중심점'
- **`ui/#이슈번호/명칭`**: 화면 UI 구현이나 스타일링 작업을 할 때 사용
  - _예: `ui/#12/login-form`_
- **`api/#이슈번호/명칭`**: 데이터 통신, API 연동, 비즈니스 로직 구현 시 사용
  - _예: `api/#45/fetch-user-profile`_

## 🌊 Flow

---

1. Issue 생성
2. 최신 상태의 **`develop`** 에서 새 브랜치 생성
3. 작업 완료 후 **`develop`**으로 Pull Request
4. 팀원들에게 리뷰 요청
5. 리뷰한 팀원이 **`develop`** 으로 병합
6. 병합 후 작업자가 해당 브랜치 삭제

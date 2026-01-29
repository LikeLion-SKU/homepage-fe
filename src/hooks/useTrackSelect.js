import { useState } from 'react';

export default function useTrackSelect() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const handleSelect = (id) => {
    // previousId 는 이전 상태 값
    setSelectedTrack((previousId) => (previousId === id ? null : id));
  };
  return {
    selectedTrack,
    handleSelect,
  };
}

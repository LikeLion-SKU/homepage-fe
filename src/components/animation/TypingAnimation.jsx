import { useEffect, useRef, useState } from 'react';

function TypingAnimation({
  text,
  speed = 150,
  className = '',
  fontSize = '1rem',
  onComplete = undefined,
  shouldStart = true,
  showCursor = true,
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);

  // onComplete ref 업데이트
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!shouldStart) {
      setDisplayedText('');
      setIsTyping(false);
      hasCompletedRef.current = false;
      return;
    }

    // 이미 완료된 경우 다시 시작하지 않음
    if (hasCompletedRef.current) {
      return;
    }

    let currentIndex = 0;
    setDisplayedText(''); // 초기화
    setIsTyping(true);
    hasCompletedRef.current = false;

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        hasCompletedRef.current = true;
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, shouldStart]);

  // showCursor가 false여도 타이핑 중에는 커서를 보여줌 (각 글자 옆에 막대기 효과)
  // 단, 첫 번째 글자가 나타나기 전에는 커서를 표시하지 않음
  const shouldShowCursorWhileTyping = isTyping && displayedText.length > 0;
  // showCursor가 true이고 타이핑이 완료된 경우에도 커서를 계속 보여줌
  const shouldShowCursorAfterComplete =
    showCursor && !isTyping && displayedText.length === text.length;

  return (
    <span className={`relative inline-block ${className}`} style={{ fontSize }}>
      {/* 전체 텍스트를 투명하게 렌더링하여 공간 확보 */}
      <span className="opacity-0 pointer-events-none whitespace-nowrap">{text}</span>
      {/* 타이핑으로 나타나는 텍스트를 absolute로 오버레이 */}
      <span className="absolute left-0 top-0 whitespace-nowrap inline-flex items-center">
        {displayedText}
        {/* 타이핑 중일 때는 항상 커서 표시 (showCursor와 관계없이) */}
        {shouldShowCursorWhileTyping && (
          <span
            className="inline-block w-0.5 bg-[#1a1a1a] ml-0.5 animate-blink"
            style={{ height: '1.2em', verticalAlign: 'middle' }}
          />
        )}
        {/* 타이핑 완료 후 showCursor가 true면 커서 계속 표시 */}
        {shouldShowCursorAfterComplete && (
          <span
            className="inline-block w-0.5 bg-[#1a1a1a] ml-0.5 animate-blink"
            style={{ height: '1.2em', verticalAlign: 'middle' }}
          />
        )}
      </span>
    </span>
  );
}

export default TypingAnimation;

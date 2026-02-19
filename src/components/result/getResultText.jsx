export const getResultText = (pass, interviewScheduleConfirmedAt = '0월 00일') => {
  const documentPass = (
    <p>
      {`안녕하세요. IT 동아리 멋쟁이사자처럼 서경대학교 ${pass.semester}기입니다.
      ${pass.track} 트랙 1차 서류 전형 합격을 진심으로 축하드립니다. 
      많은 분들께서 지원해 주신 만큼, 지원서를 여러 차례 면밀히 검토한 후 운영진의 
      논의를 거쳐 신중하게 선발하였습니다. 
      
      2차 면접을 통해 지원자님을 직접 만나 뵙기를 기대하고 있겠습니다.
      아래에서 면접 가능 날짜를 선택하신 후,
      `}
      <span className="text-[#FF7D56] font-bold">{`${interviewScheduleConfirmedAt} 자정`}</span>
      {`까지 반드시 입력해 주시기 바랍니다.

      `}
      <span className="text-[#FF7D56] font-bold">{`선택하신 면접 일정은 제출 이후에도
      마이페이지에서 지정된 기간 내 수정이 가능합니다.`}</span>
      {`
      면접 장소는 유담관 코워킹 스페이스2입니다.
      
      감사합니다.`}
    </p>
  );
  const documentNotPass = (
    <p>
      {`안녕하세요. IT 동아리 멋쟁이사자처럼 서경대학교 ${pass.semester}기입니다.

    ${pass.track} 트랙에 지원해 주셔서 진심으로 감사드립니다. 지원자님의 서류는 운영진
    모두가 끝까지 신중하게 검토하였으며, 지원하신 과정에서 보여주신 고민과 
    의지를 충분히 확인할 수 있었습니다.

    다만 이번 전형에서는 동아리 운영 방향과 일정 등의 여건을 종합적으로 고려한
      `}
      <span className="text-[#FF7D56] font-bold">{`결과, 아쉽게도 함께하지 못하게 되었음을 안내드립니다.`}</span>
      {`

      `}
      <span className="font-bold">{`이번 결과는 지원자님의 역량이나 잠재력을 판단한 것이 아니며, 앞으로의 경험과 
    도전에 따라 충분히 더 큰 성장을 이루실 수 있으리라 생각합니다.`}</span>
      {`

      멋쟁이사자처럼은 언제나 새로운 도전을 응원하며, 앞으로의 활동과 다음 
    기회에서 다시 만나 뵐 수 있기를 기대하겠습니다.

      `}
      <span className="text-[#FF7D56] font-bold">{`지원해 주셔서 다시 한 번 감사드리며, 지원자님의 정보는 한 달 이내로 일괄
    삭제하겠습니다.`}</span>
      {`
      지원자님의 앞으로의 활동에 좋은 결과가 함께하길 진심으로 바랍니다.`}
    </p>
  );

  const interviewPass = (
    <p>
      {`안녕하세요. IT 동아리 멋쟁이사자처럼 서경대학교 ${pass.semester}기입니다.

      `}
      <span className="font-bold">{`${pass.track} 트랙 면접 전형 최종 합격을 진심으로 축하드립니다.`}</span>
      {`

      면접을 통해 지원자님께서 보여주신 생각의 깊이와 태도, 그리고 성장 가능성을 
    높이 평가하여 운영진의 논의를 거쳐 최종 선발하게 되었습니다.

    앞으로 멋쟁이사자처럼 서경대학교 ${pass.semester}기 ${pass.track} 트랙으로서
    함께 배우고, 도전하며, 성장해 나가기를 기대하고 있습니다.

      `}
      <span className="font-bold">
        {`향후 일정 및 활동 관련 안내는 별도로 전달드릴 예정이니 확인 부탁드립니다.`}
      </span>
      {`
      다시 한 번 합격을 축하드리며, 곧 만나 뵙기를 기대하겠습니다. 감사합니다.`}
    </p>
  );

  const interviewNotPass = (
    <p>
      {`안녕하세요. IT 동아리 멋쟁이사자처럼 서경대학교 ${pass.semester}기입니다.

      ${pass.track} 트랙 면접 전형에 참여해 주셔서 진심으로 감사드립니다. 
      면접 과정에서 지원자님께서 보여주신 고민과 경험, 그리고 진지한 태도는 
      운영진에게도 인상 깊게 다가왔습니다.

      다만 이번 기수의 운영 방향과 구성 등을 종합적으로 고려한 결과,
      `}
      <span className="font-bold text-[#FF7D56]">{`아쉽게도 이번에는 함께하지 못하게 되었음을 안내드립니다.`}</span>
      {`

      `}
      <span className="font-bold">{`이번 결과는 지원자님의 역량이나 가능성을 제한하는 판단이 아니며, 
      앞으로의 경험과 도전을 통해 충분히 더 큰 성장을 이루실 수 있다고 생각합니다.`}</span>
      {`
      멋쟁이사자처럼은 언제나 새로운 도전을 응원하며, 
      앞으로 또 다른 기회로 다시 만나 뵐 수 있기를 기대하겠습니다.

      `}
      <span className="font-bold text-[#FF7D56]">{`소중한 시간 내어 면접에 참여해 주셔서 감사드리며, 
      지원자님의 정보는 한 달 이내로 일괄 삭제하겠습니다. `}</span>
      {`
      지원자님의 앞으로의 활동에 좋은 결과가 함께하시길 바랍니다. 감사합니다.`}
    </p>
  );

  if (pass.test == 'document') {
    if (pass.result) {
      return documentPass;
    } else {
      return documentNotPass;
    }
  } else {
    if (pass.result) {
      return interviewPass;
    } else {
      return interviewNotPass;
    }
  }
};

import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = (kind: 'arthLiquidity' | 'arth') => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const basisCash = useBasisCash();
  const stakedBalance = useStakedBalanceOnBoardroom(kind);

  const updateState = useCallback(async () => {
    setBoardroomVersion(await basisCash.fetchBoardroomVersionOfUser());
  }, [basisCash]);

  useEffect(() => {
    if (basisCash.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [basisCash, stakedBalance, updateState]);

  return boardroomVersion;
};

export default useBoardroomVersion;

import { useCallback, useEffect, useState } from 'react';
import { Boardrooms } from '../basis-cash/config';
import useBasisCash from './useBasisCash';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = (kind: Boardrooms) => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const basisCash = useBasisCash();
  const stakedBalance = useStakedBalanceOnBoardroom(kind, 'v1');

  const updateState = useCallback(async () => {
    setBoardroomVersion(await basisCash.fetchBoardroomVersionOfUser());
  }, [basisCash]);

  useEffect(() => {
    // if (basisCash.isUnlocked) {
    //   updateState().catch((err) => console.error(err.stack));
    // }
  }, [basisCash, stakedBalance, updateState]);

  return boardroomVersion;
};

export default useBoardroomVersion;

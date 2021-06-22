import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import usePrizeCounter from './usePrizeCounter';
import { BigNumber } from 'ethers';

type State = {
  isLoading: boolean;
  value: any[];
}

export default () => {

  const prizesHardcoded = [
    {
      criteria: BigNumber.from(5),
      description: "MAHA Verses Fiat",
      image: "https://i.imgur.com/4Ro2mQx.jpeg",
      nftAddress: "0xd917eddfbF33166aDE07de592B7eD1089E43308A",
      tokenId: BigNumber.from(1),
      winner: "0x0000000000000000000000000000000000000000",
    },
    {
      criteria: BigNumber.from(1),
      description: "MAHA to the moon",
      image: "https://i.imgur.com/RTCw8Fm.jpeg",
      nftAddress: "0xd917eddfbF33166aDE07de592B7eD1089E43308A",
      tokenId: BigNumber.from(1),
      winner: "0x0000000000000000000000000000000000000000",
    },
    {
      criteria: BigNumber.from(1),
      description: "MAHA all around the world",
      image: "https://i.imgur.com/0T1BUW7.jpg",
      nftAddress: "0xd917eddfbF33166aDE07de592B7eD1089E43308A",
      tokenId: BigNumber.from(1),
      winner: "0x0000000000000000000000000000000000000000",
    },
    {
      criteria: BigNumber.from(10),
      description: "MAHA Lambo",
      image: "https://lh3.googleusercontent.com/FFYxezBkbNmZ01vI5_P_aIyYbFX8Djvnvom0MV6JZYuFGTbiEoxX86fZsSWad7Ze4n-GozPyPUUJg0ndHMgvAiJx3x3DuHZsKkP0EQ",
      nftAddress: "0xd917eddfbF33166aDE07de592B7eD1089E43308A",
      tokenId: BigNumber.from(1),
      winner: "0x0000000000000000000000000000000000000000",
    },
  ]

  const [customState, setCustomState] = useState<State>({ isLoading: false, value: prizesHardcoded })

  return customState;
};

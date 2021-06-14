import useCore from '../useCore';

export default async (prize: string) => {
  const core = useCore();
  const controller = core.contracts.LotteryRaffle;

  return await controller.checkResult(prize);
};

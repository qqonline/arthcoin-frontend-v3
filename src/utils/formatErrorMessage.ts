export default (message: string): string => {
  message = message.toLowerCase();

  if (message.includes('ceiling')) return 'Collateral limit reached';
  if (message.includes('slippage')) return 'Slippage limit reached';
  if (message.includes('user denied transaction')) return 'User denied transaction';

  // Fail safes like overflows etc.;
  return 'Error';
};

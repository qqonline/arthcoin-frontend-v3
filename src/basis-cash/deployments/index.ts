export type Deployments = {
  [contractName: string]: {
    address: string;
    abi: string;
  }
}

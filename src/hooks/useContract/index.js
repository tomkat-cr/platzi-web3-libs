import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Proposal } from "../../config/web3/artifacts/Proposal";

const { address, abi, contractCreator } = Proposal;

export const useContract = () => {
  const { active, library, chainId } = useWeb3React();

  const proposalContract = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return proposalContract;
};

export const getContractCreator = () => (contractCreator)

// export default useContract;
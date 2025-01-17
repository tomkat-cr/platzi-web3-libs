import { useMemo } from "react";

const useTruncatedAddress = (account) => {
  const truncated = useMemo(
    () => `${account?.substr(0, 4)}...${account?.substr(-4)}`,
    [account]
  );

  return truncated;
};

export default useTruncatedAddress;
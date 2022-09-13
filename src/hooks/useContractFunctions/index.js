import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { useContract, getContractCreator } from "../useContract";

const USERS_TYPES = ['admin', 'user']

const useContractFunctions = () => {
    const { account } = useWeb3React()
    // const {account, library } = useWeb3React()
    const proposalContract = useContract()

    const isAdmin = useCallback(async () => {
      return (getContractCreator() === account)
    }, [account])

    const isUser = useCallback(async () => {
      return (getContractCreator() !== account)
    }, [account])

    const guessUserType = useCallback(async () => {
      if (proposalContract) {
          const userType = await Promise.all([isAdmin(), isUser()])
          const index = userType.findIndex(isType => isType === true)
          return index >= 0 ? USERS_TYPES[index] : ''
      }
    }, [proposalContract, isAdmin, isUser])

    const getFee = useCallback(async () => {
        if (proposalContract) {
          return await proposalContract.methods.VOTE_FEE().call()
        }
    }, [proposalContract])

    const clean = useCallback(async () => {
        if (proposalContract) {
          return await proposalContract.methods.clean().call()
        }
    }, [proposalContract])

    const getVote = useCallback(async (account) => {
        if (proposalContract) {
          const vote = await proposalContract.methods.getVote(account).call()
          return vote
        }
    }, [proposalContract])

    const getProposalId = useCallback(async () => {
      if (proposalContract) {
        return await proposalContract.methods.proposalId().call()
      }
    }, [proposalContract])

    const registerVote = useCallback(async (voteType) => {
      // voteType: vote with 1 (no) or 2 (yes)
      if (proposalContract) {
        const fee = await getFee()
        console.log('registerVote | voteType', voteType)
        return await proposalContract.methods.vote(voteType).send({
          from: account,
          value: fee
          // value: library.utils.toWei(fee)
        })
      }
    }, [account, proposalContract, getFee])

    const getVotesForNo = useCallback(async () => {
      if (proposalContract) {
        return await proposalContract.methods.votesForNo().call()
      }
    }, [proposalContract])

    const getVotesForYes = useCallback(async () => {
      if (proposalContract) {
        return await proposalContract.methods.votesForYes().call()
      }
    }, [proposalContract])

    return {
      isAdmin,
      isUser,
      guessUserType,
      getFee,
      clean,
      getVote,
      getProposalId,
      registerVote,
      getVotesForNo,
      getVotesForYes,
    };
};

export default useContractFunctions;
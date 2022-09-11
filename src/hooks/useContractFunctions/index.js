import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { useContract, getContractCreator } from "../useContract";

const USERS_TYPES = ['admin', 'user']

const useContractFunctions = () => {
    const {account } = useWeb3React()
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

// ........

    // const registerAsCertifier = useCallback(async (metadata) => {
    //     if (proposalContract) {
    //       const fee = await getFee(FEE_TYPES.findIndex(type => type === 'Certifier_Registration'))
    //       return await proposalContract.methods.registerAsCertifier(metadata).send({
    //         from: account,
    //         value: fee
    //       })
    //     }
    // }, [account, proposalContract, getFee])

    // const acceptCertifier = useCallback(async (certifierAddress) => {
    //     if (proposalContract) {
    //       return await proposalContract.methods.acceptCertifier(certifierAddress).send({from: account})
    //     }
    // }, [account, proposalContract])

    // const removeCertifier = useCallback(async (certifierAddress) => {
    //     if (proposalContract) {
    //       return await proposalContract.methods.removeCertifier(certifierAddress).send({from: account})
    //     }
    // }, [account, proposalContract])

    // const isCertifierAccepted = useCallback(async (account) => {
    //     if (proposalContract) {
    //       return await proposalContract.methods.reviewedCertifiers(account).call()
    //     }
    // }, [proposalContract])

    // const currentAccountIsCertifierAccepted = useCallback(async () => {
    //   return isCertifierAccepted(account)
    // }, [isCertifierAccepted, account])

    // const registerAsUser = useCallback(async (metadata) => {
    //     if (proposalContract) {
    //       const fee = await getFee(FEE_TYPES.findIndex(type => type === 'User_Registration'))
    //       return await proposalContract.methods.registerUser(metadata).send({
    //         from: account,
    //         value: fee
    //       })
    //     }
    // }, [account, proposalContract, getFee])

    // const getUser = useCallback(async (account) => {
    //     if (proposalContract) {
    //       const metadataURL = await proposalContract.methods.users(account).call()
    //       // TODO ELiminar replace de la metadata
    //       const data = await axios.get(`${ipfsPublicURL}/${new URL(metadataURL).pathname.split("/")[2]}`).then(response => response.data)
    //       return data
    //     }
    // }, [proposalContract])

    // const registerProduct = useCallback(async (metadata, price) => {
    //   if (proposalContract) {
    //       const fee = await getFee(FEE_TYPES.findIndex(type => type === 'Product_Registration'))
    //       return await proposalContract.methods.safeMint(account, metadata, price).send({
    //         from: account,
    //         value: fee
    //       })
    //     }
    // }, [account, proposalContract, getFee])

    // const certifyProduct = useCallback(async (tokenId, metadata) => {
    //   if (proposalContract) {
    //       return await proposalContract.methods.certify(tokenId, metadata).send({
    //         from: account,
    //       })
    //     }
    // }, [proposalContract, account])

    // const getProduct = useCallback(async (tokenId) => {
    //     if (proposalContract) {
    //       const metadataURL = await proposalContract.methods.tokenURI(tokenId).call()
    //       // TODO ELiminar replace de la metadata
    //       const data = await axios.get(`${ipfsPublicURL}/${new URL(metadataURL).pathname.split("/")[2]}`).then(response => response.data)
    //       return data
    //     }
    // }, [proposalContract])

    // const getDataFromSeller = useCallback(async (tokenId) => {
    //     if (proposalContract) {
    //       const sellerAddress = await proposalContract.methods.ownerOf(tokenId).call()
    //       return await getUser(sellerAddress)
    //     }
    // }, [proposalContract, getUser])

    // const isOwner = useCallback(async (tokenId) => {
    //     if (proposalContract) {
    //       const isOwner = await proposalContract.methods.ownerOf(tokenId).call()
    //       return isOwner === account
    //     }
    // }, [proposalContract, account])

    // const buyProduct = useCallback(async (tokenId, price) => {
    //   if (proposalContract) {
    //       const fee = await getFee(FEE_TYPES.findIndex(type => type === 'Product_Transfer'))
    //       return await proposalContract.methods.buyProduct(tokenId, fee).send({
    //         from: account,
    //         value: library.utils.toWei(price)
    //       })
    //     }
    // }, [proposalContract, account, library?.utils, getFee])

    // const getLatestToken = useCallback(async () => {
    //   if (proposalContract) {
    //       return await proposalContract.methods.getCurrentTokenId().call()
    //     }
    // }, [proposalContract])

    // const getCertifiersAccepted = useCallback(async () => {
    //   if (proposalContract) {
    //       return await proposalContract.methods.getAllCertifiersAccounts().call()
    //     }
    // }, [proposalContract])
    
    // const getCertifiersPending = useCallback(async () => {
    //   if (proposalContract) {
    //       return await proposalContract.methods.getAllUnCertifiersAccounts().call()
    //     }
    // }, [proposalContract])
  
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

      // getCertifier,
      // registerAsCertifier,
      // acceptCertifier,
      // removeCertifier,
      // isCertifierAccepted,
      // currentAccountIsCertifierAccepted,
      // registerAsUser,
      // getUser,
      // registerProduct,
      // getProduct,
      // getDataFromSeller,
      // certifyProduct,
      // isOwner,
      // buyProduct,
      // getLatestToken,
      // getCertifiersAccepted,
      // getCertifiersPending
    };
};

export default useContractFunctions;
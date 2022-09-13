import { useWeb3React } from "@web3-react/core";
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import useContractFunctions from "../../../hooks/useContractFunctions";

const TIME_INTERVAL = 20 * 1000;

export const VotesDisplay = forwardRef((props, ref) => {
    const { account } = useWeb3React()
    const {
        getVotesForYes,
        getVotesForNo,
        getVote,
    } = useContractFunctions();
    const [votesForYes, setVotesForYes] = useState(0);
    const [votesForNo, setVotesForNo] = useState(0);
    const [yourVote, setYourVote] = useState(null);

    const updateVotes = useCallback(() => {
      getVotesForYes().then(
        vote => setVotesForYes(vote)
      )
      getVotesForNo().then(
          vote => setVotesForNo(vote)
      )
      getVote(account).then(
          yourVote => setYourVote(yourVote)
      )
console.log('updateVotes')
    }, [getVotesForYes, getVotesForNo, getVote, account])
  
    useEffect(() => {
      updateVotes();
      const interval = setInterval( () => {
        updateVotes()
      }, TIME_INTERVAL)
      return() => clearInterval(interval)
    }, [updateVotes, account])
 
    useImperativeHandle(ref, () => {
      return {
        updateVotes: updateVotes
      }
    });

    return (
        <Stack spacing={6} direction={'row'}>
          <Text>
            Votes Agree: {votesForYes}
          </Text>
          <Text>
            Votes Not Agree: {votesForNo}
          </Text>
          <Text>
            Your Vote: {yourVote}
          </Text>
        </Stack>
    );
})
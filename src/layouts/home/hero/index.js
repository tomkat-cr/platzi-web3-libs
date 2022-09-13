import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useCallback, useState, useRef } from "react";

import { Illustration } from '../../../assets/hero-illustration/Illustration';
import { VotesDisplay } from '../votes/idenx';
import useContractFunctions from "../../../hooks/useContractFunctions";

const TOAST_MESSAGE_DURATION = 5000

export default function CallToActionWithIllustration() {

  const [vote, setVote] = useState(0);
  const toast = useToast();
  const ref = useRef(null);

  const {
    registerVote,
  } = useContractFunctions();

  const saveVote = useCallback(async (vote) => {
    if (!vote || vote === 0) {
      // toast({
      //   title: 'Invalid Form data',
      //   description: "There are missing values",
      //   status: 'error',
      //   duration: TOAST_MESSAGE_DURATION
      // })
      // throw Error('Invalid Form')
      return ""
    }
    const { voteReponse } = await registerVote(vote)
    return voteReponse
  // }, [vote, toast, registerVote])
  }, [registerVote])

  const onVoteSubmit = vote => {
    setVote(vote);
    saveVote(vote)
      .then(voteReponse => {
        toast({
          title: 'Transaction completed',
          description: "Response: " + String(voteReponse),
          status: 'success',
          duration: TOAST_MESSAGE_DURATION
        })
        ref.current.updateVotes();
      }).catch(err => {
        toast({
          title: 'Transaction NOT completed',
          description: "Response: " + String(err),
          status: 'error',
          duration: TOAST_MESSAGE_DURATION
        })
      });
  }
  
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          DAO Proposal Vote{' '}
          <Text as={'span'} color={'orange.400'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          This proposal is about converting our group in a DAO.<br/>
          Since the begining things went pretty well, and now is time to decide:<br/>
          Keep it as vertical management (web2)<br/>
          or<br/>
          Convert our group into a DAO, making decisions by consensus, and experience the web3 paradigm.
        </Text>
        <VotesDisplay ref={ref} />
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}
            onClick={() => onVoteSubmit(2)}
          >
            Vote: I agree (to be a DAO)
          </Button>
          <Button
            rounded={'full'} px={6}
            onClick={() => onVoteSubmit(1)}
          >
            Vote: I don't agree (keep vertical management)
          </Button>
        </Stack>
        <Flex w={'full'}>
          <Illustration
            height={{ sm: '24rem', lg: '28rem' }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
}

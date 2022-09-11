import {
    Box,
    Container,
    Stack,
    Text,
    Link
  } from '@chakra-ui/react';
import { LogoSquare } from '../../../assets/logo';

  export default function Footer() {
    return (
      <Box
        bg={'gray.100'}
        borderTop={'1px'} borderColor='gray.200'>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Link href="https://www.mediabros.com" target="_blank"><LogoSquare /></Link>
          <Text>© {new Date().getFullYear()} Mediabros. All rights reserved</Text>
          
        </Container>
      </Box>
    );
  }
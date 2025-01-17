// import { Box, Heading, Text, Button, Center, Spinner } from '@chakra-ui/react';
import { Box, Heading, Text, Center, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavLink from '../../layouts/internal/nav-link';

function NotFound() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const interval = setTimeout(() => setLoading(false), 3000)
      return () => {
        clearTimeout(interval);
      }
    }, []);

    if (loading) {
      return (
        <Center minH={'calc(100vh - 130px)'}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Center>
      )
    }

    return (
      <Box textAlign="center" py={10} minH={'calc(100vh - 130px)'} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, blue.400, blue.600)"
          backgroundClip="text">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page not found
        </Text>
        <Text color={'gray.500'} mb={6}>
          Ups! The requested page does not exist
        </Text>
  
        <NavLink key="home" to="/">Go Home</NavLink>

        {/* <Button
          colorScheme="blue"
          bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
          color="white"
          variant="solid"

        >
          Go Home
        </Button> */}
      </Box>
    );
  }

export default NotFound;
import { Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const NavLink = ({ children, ...props }) => (
    <Link
      as={RouterLink}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        // bg: 'gray.200'
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      {...props}
      >
      {children}
    </Link>
);
  
export default NavLink;
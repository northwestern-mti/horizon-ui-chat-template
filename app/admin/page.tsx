'use client';
/*eslint-disable*/

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { ContactCard } from '@/components/contacts/contactCard'

import { ROUTES } from '@/routes';

// React imports
import { useEffect, useState } from 'react';

// Cookies
import { getCookie } from "cookies-next";



const API_URL = process.env.API_URL;



export default function Page() {

  // Retrieve user data from cookie
  const userData = JSON.parse( getCookie('userData') || '{}' )

  // Load username from cookies
  // Fill as an effect to avoid hydration error
  const [ username, setUsername ] = useState<string>('');
  useEffect(() => {
    setUsername( (userData?.name_first || ['']).join(' ') )
  }, [ userData ])


  // -------------- Component(s) --------------

  return (!username) ? <></> : (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >
      <Text>
        Welcome to the admin page, <Text as="b" color="text.emphasis">{ username }</Text>!
      </Text>

    </Flex>
  );
}

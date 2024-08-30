'use client';

// Project imports
import LoginButton from '@/components/auth/LoginButton';

import { ROUTES } from '@/routes';
import { API_ROUTES } from '@/route_spec';
import { login } from '@/utils/auth';

// Chakra imports
import {
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

// React imports
import React from 'react'



export default function Page() {

  // When the login button is clicked, redirect to the SSO process,
  // with the homepage as the ultimate return address
  const onClick = () => {
    login(
      new URL(API_ROUTES.login.makeURL(), process.env.API_URL),
      new URL(ROUTES.home.path, window.location.origin),
    );
  };


  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      pt={{ base: '70px', md: '0px' }}
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      <LoginButton
        text="Login with NetID"
        onClick={onClick}
        w="fit-content"
      />
    </Flex>
  );
}

'use client';
/*eslint-disable*/

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// React imports
import { useEffect, useState } from 'react';



export default function Page() {

  // -------------- Component(s) --------------

  return (
    <Flex
      w="100%"
      h="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
      textAlign="center"
      justifyContent="center"
    >
      <Text>The site is currently down. Please try again later.</Text>
    </Flex>
  );
}

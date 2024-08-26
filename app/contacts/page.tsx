'use client';
/*eslint-disable*/

// Chakra imports
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

// React imports
import { useEffect, useState } from 'react';

// Cookies
import { getCookie } from "cookies-next";



const API_URL = process.env.API_URL;



export default function Page() {

  // -------------- Component(s) --------------

  return (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >
    </Flex>
  );
}

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

import { ContactCard } from '@/components/contacts/contactCard'

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

      <SimpleGrid columns={{"base": 1, "sm": 1, "md": 2, "lg": 3, "2xl": 4}} gap="32px" px="16px">

        <ContactCard
          name         = "Dr. Olivia M. Gold"
          nickname     = "Dr. Gold"
          description  = "Research scientist in the Gene Lab at Kramer BioGenetics, Inc."
        ></ContactCard>

        <ContactCard
          name         = "Andrew Orlando"
          nickname     = "Andy"
          description  = 'Brand Manager for "Clean Machine" at Life Line, Inc.'
        ></ContactCard>

      </SimpleGrid>

    </Flex>
  );
}

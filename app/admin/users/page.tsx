'use client';
/*eslint-disable*/

// Chakra imports
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// Custom Components
import { ContactCard } from '@/components/contacts/contactCard'
import { NewUserForm } from '@/components/forms/NewUser';

// React imports
import { useEffect, useState } from 'react';



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
          name         = "Vincent"
          nickname     = "Vince"
          description  = "MTI"
        ></ContactCard>

      </SimpleGrid>


      <Box position='relative' padding='10'>
        <Divider />
        <AbsoluteCenter bg='white' px='4' left="8em" axis="both">
          <Heading as="h3">New User</Heading>
        </AbsoluteCenter>
      </Box>

      <Box w="100%" alignContent="start">
        <NewUserForm />
      </Box>

    </Flex>
  );
}

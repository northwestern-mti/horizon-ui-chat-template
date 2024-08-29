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

  const colorPalette = {
    "profile": {
      bg:          useColorModeValue('white',       'purple.800'),
      text:        useColorModeValue('purple.700',  'white'),
      icon_bg:     "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
      icon_border: "transparent",
      icon_text:   "white",
    }
  }


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
          colorPalette = {colorPalette.profile}
        ></ContactCard>

        <ContactCard
          name         = "Andrew Orlando"
          nickname     = "Andy"
          description  = 'Brand Manager for "Clean Machine" at Life Line, Inc.'
          colorPalette = {colorPalette.profile}
        ></ContactCard>

      </SimpleGrid>

    </Flex>
  );
}

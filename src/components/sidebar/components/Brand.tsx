'use client';

// Chakra imports
import { Box, Flex, Heading, Img, Text, useColorModeValue } from '@chakra-ui/react';

import { HSeparator } from '@/components/separator/Separator';
import Logo from '../../../../public/img/nuit-lockup.png';



export function SidebarBrand() {
  //   Chakra color mode
  let primaryColor   = useColorModeValue('purple.700', 'white');
  let secondaryColor = useColorModeValue('gray.500',   'white');

  // Change logo to white & transparent in dark mode
  // Adapted from https://stackoverflow.com/a/24224219
  const logoColorFilter = useColorModeValue('', 'brightness(0) invert(1)')

  // Load the app version from the environment and format it as "(v_._._)"
  let appVersion = process.env.APP_VERSION
  if (appVersion) {
    if (appVersion[0] !== "v") {
      appVersion = "v" + appVersion;
    }
    appVersion = "(" + appVersion + ")"
  }

  return (
    <Flex alignItems="center" flexDirection="column">
      <Img
        src={Logo.src}
        pointerEvents="none"
        userSelect="none"
        filter={ logoColorFilter }
      />
      <Box
        mb="30px"
        textAlign="center"
      >
        <Heading
          size="lg"
          color={primaryColor}
          mb="0.2em"
          pointerEvents="none"
          userSelect="none"
        >
          The Real Deal
        </Heading>
        <Text size="xs" color={secondaryColor}>
          Alpha Release { appVersion }
        </Text>
      </Box>
      <HSeparator mb="20px" w="284px" />
    </Flex>
  );
}

export default SidebarBrand;

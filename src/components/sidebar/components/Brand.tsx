'use client';

// Chakra imports
import { Flex, Heading, Img, useColorModeValue } from '@chakra-ui/react';

import { HSeparator } from '@/components/separator/Separator';
import Logo from '../../../../public/img/nuit-lockup.png';



export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  // Change logo to white & transparent in dark mode
  const logoColorFilter = useColorModeValue('', 'brightness(0) invert(1)')

  return (
    <Flex alignItems="center" flexDirection="column">
      <Img
        src={Logo.src}
        pointerEvents="none"
        userSelect="none"
        filter={ logoColorFilter }
      />
      <Heading size="lg" mb="30px" color={logoColor} pointerEvents="none" userSelect="none">
        The Real Deal
      </Heading>
      <HSeparator mb="20px" w="284px" />
    </Flex>
  );
}

export default SidebarBrand;

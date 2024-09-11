'use client';
import React, { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider, Box, Img, Portal, useDisclosure } from '@chakra-ui/react';
import theme from '@/theme/theme';
import { fetchRoutes } from '@/routes';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import { IRoute } from '@/types/navigation';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import AppWrappers from './AppWrappers';

import Bg from '../public/img/chat/Academic-N-transparent.png';



export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();


  /* Control page layout measurements */

  // The width of the left sidebar
  const sidebarWidth = "325px";

  // The height of the sticky footer element
  const footerHeight = "60px";


  /* Callbacks */

  // Once loaded, fetch the list of routes
  const [routes, setRoutes] = useState<IRoute[][]>([])
  useEffect(() => {
    fetchRoutes().then(routes => setRoutes(routes))
  }, [])


  /* Main layout component */

  return (
    <html lang="en">

      {/*
        Header
        TODO: NextJS might have a specific way to do this
      */}
      <head>
        <title>The Real Deal</title>
      </head>

      {/* Page Body */}
      <body id={'root'}>
        <AppWrappers>
          {/* <ChakraProvider theme={theme}> */}
          {pathname?.includes('register') || pathname?.includes('sign-in') ? (
            children
          ) : (
            <Box position="relative">

              {/* Sidebar (left) */}
              <Sidebar routes={routes} width={sidebarWidth} />

              {/* Main Content (right) */}
              <Box
                pt={{ base: '60px', md: '100px' }}
                float="right"
                minHeight="100vh"
                height="100%"
                overflow="auto"
                position="relative"
                maxHeight="100%"
                w={{ base: '100%', xl: `calc( 100% - (${ sidebarWidth } + 40px) )` }}
                maxWidth={{ base: '100%', xl: `calc( 100% - (${ sidebarWidth } + 40px) )` }}
                transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                transitionDuration=".2s, .2s, .35s"
                transitionProperty="top, bottom, width"
                transitionTimingFunction="linear, linear, ease"
              >

                {/* Navbar (top) */}
                <Portal>
                  <Box>
                    <Navbar
                      routes={routes}
                      onOpen={onOpen}
                      logoText={'Horizon UI Dashboard PRO'}
                      brandText={getActiveRoute(routes, pathname)}
                      secondary={getActiveNavbar(routes, pathname)}
                      sidebarWidth={ sidebarWidth }
                    />
                  </Box>
                </Portal>

                {/* Main page content (center) */}
                <Box
                  mx="auto"
                  p={{ base: '20px', md: '30px' }}
                  pe="20px"
                  minH={`calc(100vh - ${footerHeight} - 100px)`}
                  pt="50px"
                  w="100%"
                >

                  {/* Static background image */}
                  <Img
                    src={Bg.src}
                    position={'fixed'}
                    w="550px"
                    left={{
                      base: "50%",
                      xl: `calc( 50% + ((${ sidebarWidth } + 40px) / 2) )`,
                    }}
                    top="50%"
                    transform={'translate(-50%, -50%)'}
                    pointerEvents="none"
                    userSelect="none"
                    zIndex="-99"
                  />

                  {/* Child component(s) */}
                  {children}
                  {/* <Component {...pageProps} /> */}

                </Box>
                {/* End of main page content */}

                {/* Footer (bottom) */}
                <Box>
                  <Footer />
                </Box>

              </Box>
              {/* End of Main Content */}

            </Box>
          )}
          {/* </ChakraProvider> */}
        </AppWrappers>
      </body>
    </html>
  );
}

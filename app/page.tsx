'use client';
/*eslint-disable*/

// Project imports
import Link from '@/components/link/Link';
import { NowTyping, ChatBeginning } from '@/components/chat/Annotations';
import ComposeInput from '@/components/chat/ComposeInput';
import Message from '@/components/chat/Message';
import { HSeparator } from '@/components/separator/Separator';
import { ColorPalette, Character } from '@/types/types';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// React imports
import { useEffect, useState } from 'react';

// Other
import { streamAIMessage } from '../src/utils/streaming'



const APIDOMAIN = 'https://localhost:8082'



export default function Chat(props: { apiKeyApp: string }) {

  // Input text
  const [ inputCode,  setInputCode  ] = useState<string>('');

  // Response message
  const [ outputCode, setOutputCode ] = useState<string[]>([]);

  // Chat states
  const [ loading,    setLoading    ] = useState<boolean>(false);
  const [ nowTyping,  setNowTyping  ] = useState<string>('');

  // API Key
  // const [apiKey, setApiKey] = useState<string>(apiKeyApp);

  // Retrieve the list of characters from the API
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    fetch(`${APIDOMAIN}/api/characters`)
      .then(resp => resp.json())
      .then(json => { setCharacters(json) });
  }, [])


  const colors: ColorPalette = {
    brand:         useColorModeValue('brand.500', 'white'),
    gray:          useColorModeValue('gray.500',  'white'),
  }

  const colorPalettes: Record<string, ColorPalette> = {

    // Chat annotations
    annotations: {
      text:        useColorModeValue('gray.500',  'white'),
    },

    // Input bar
    input: {
      border:      useColorModeValue('gray.200',  'whiteAlpha.200'),
      text:        useColorModeValue('navy.700',  'white'),
      placeholder: useColorModeValue('gray.500',  'whiteAlpha.600'),
    },

    // AI chat messages
    messages_ai: {
      bg:          useColorModeValue('white',     'navy.800'),
      text:        useColorModeValue('navy.700',  'white'),
      icon_bg:     "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
      icon_border: "transparent",
      icon_text:   "white",
    },

    // User chat messages
    messages_user: {
      bg:          useColorModeValue('navy.100',  'gray.100'),
      text:        useColorModeValue('navy.700',  'navy.700'),
      icon_bg:     "transparent",
      icon_border: useColorModeValue('gray.200',  'whiteAlpha.600'),
      icon_text:   useColorModeValue('brand.500', 'white'),
    }
  }


  const appendMessage = async (newMessage: any) => {
    setOutputCode((prevCode) => [...prevCode, newMessage]);
  }

  const handleTranslate = async () => {

    // Chat post conditions(maximum number of characters, valid message etc.)
    const maxCodeLength = 700;

    // Validate input message
    if (!inputCode) {
      alert('Please enter your message.');
      return;
    }
    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    // Add the user's message to the chat
    appendMessage({name: 'Me', text: inputCode});
    setInputCode('');

    setLoading(true);
    const controller = new AbortController();


    // -------------- Fetch --------------

    // Send the user message to the API and stream the results
    streamAIMessage(
      `${APIDOMAIN}/api/message`,
      inputCode,

      // Additional request options
      {
        signal: controller.signal,
      },

      // The callback to process values as they stream in
      (value: any) => {
        if (value['type'] === 'DialogueMarker') {
          setNowTyping(() => value['name']);
        }
        else if (value['type'] === 'DialogueInstance') {
          appendMessage(value);
          setNowTyping(() => '');
        }
        else {
          console.warn('Unrecognized dialogue token: ', value)
        }
      }
    )
      // Runs after stream finishes
      .then(() => {
        setLoading(false);
      })

      // Runs if stream encounters an error
      .catch((error) => {
        setLoading(false);
        alert('Something went wrong.');
        console.error(error);
      })
  };


  // -------------- Copy Response --------------
  // const copyToClipboard = (text: string) => {
  //   const el = document.createElement('textarea');
  //   el.value = text;
  //   document.body.appendChild(el);
  //   el.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(el);
  // };

  // *** Initializing apiKey with .env.local value
  // useEffect(() => {
  // ENV file verison
  // const apiKeyENV = process.env.NEXT_PUBLIC_OPENAI_API_KEY
  // if (apiKey === undefined || null) {
  //   setApiKey(apiKeyENV)
  // }
  // }, [])

  const handleChange = (Event: any) => {
    setInputCode(Event.target.value);
  };

  return (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >

      {/* Chat window (scrollable) */}
      <Flex
        direction="column"
        mx="auto"
        w={{ base: '100%', md: '100%', xl: '100%' }}
        minH={{ base: '75vh', '2xl': '85vh' }}
        maxW="1000px"
      >

        {/* Main Box */}
        <Flex
          direction="column"
          w="100%"
          mx="auto"
          display={outputCode ? 'flex' : 'none'}
          mb={'auto'}
          gap="16px"
        >

          {/* Beginning of conversation */}
          <ChatBeginning colorPalette={colorPalettes.annotations} characters={characters} />
          <HSeparator mx="auto" my="8px" w="75%" />

          {/* Message history */}
          {
            outputCode.map((msg: any, idx) => (
              <Message key={idx} colorPalettes={colorPalettes} message={msg} characters={characters} />
            ))
          }

          {/* "Now Typing" notification */}
          <NowTyping colorPalette={colorPalettes.annotations} name={ nowTyping } />
        </Flex>

      </Flex>
      {/* /Chat window (scrollable) */}

      {/* Bottom of chat window (fixed) */}
      <Flex
        position="fixed"
        justifyContent="center"
        alignItems="center"
        direction="column"
        bgColor={ useColorModeValue('#fdfeff', 'navy.900') }
        zIndex="99"
        mx="auto"
        right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
        px={{
          base: '8px',
          md: '10px',
        }}
        ps={{
          base: '8px',
          md: '12px',
        }}
        pt="8px"
        bottom="0"
        pb={{
          base: 'calc(8px + 12px)',
          md:   'calc(8px + 16px)',
          xl:   'calc(8px + 18px)',
        }}
        w={{
          base:  'calc(100vw - 8%)',
          md:    'calc(100vw - 8%)',
          lg:    'calc(100vw - 6%)',
          xl:    'calc(100vw - 360px)',
          '2xl': 'calc(100vw - 375px)',
        }}
        transitionDuration="var(--chakra-transition-duration-normal)"
        transitionProperty="background-color"
      >

        {/* Chat Input */}
        <Box w="100%" maxW="1000px">
          <ComposeInput
            value={ inputCode }
            onChange={handleChange}
            onSubmit={handleTranslate}
            loading={loading}
            colorPalette={colorPalettes.input}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

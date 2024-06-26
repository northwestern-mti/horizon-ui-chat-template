'use client';
/*eslint-disable*/

// Project imports
import Link from '@/components/link/Link';
import { NowTyping, ChatBeginning } from '@/components/chat/Annotations';
import ComposeInput from '@/components/chat/ComposeInput';
import Message from '@/components/chat/Message';
import { ColorPalette } from '@/types/types';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// React imports
import { useEffect, useState } from 'react';

// Other
import { streamAIMessage } from '../src/utils/streaming'
import Bg from '../public/img/chat/bg-image.png';



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

  const colorPalette: ColorPalette = {
    annotations: useColorModeValue('gray.500',  'white'),
    border:      useColorModeValue('gray.200',  'whiteAlpha.200'),
    input:       useColorModeValue('navy.700',  'white'),
    icon:        useColorModeValue('brand.500', 'white'),
    brand:       useColorModeValue('brand.500', 'white'),
    button:      useColorModeValue('white',     'whiteAlpha.100'),
    gray:        useColorModeValue('gray.500',  'white'),
    text:        useColorModeValue('navy.700',  'white'),
    placeholder: useColorModeValue('gray.500',  'whiteAlpha.600'),
    bgIcon:      useColorModeValue(
      'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
      'whiteAlpha.200',
    ),
    buttonShadow: useColorModeValue(
      '14px 27px 45px rgba(112, 144, 176, 0.2)',
      'none',
    ),
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
    appendMessage({name: 'Me', text: inputCode})

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
      <Img
        src={Bg.src}
        position={'absolute'}
        w="350px"
        left="50%"
        top="50%"
        transform={'translate(-50%, -50%)'}
      />
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
          <ChatBeginning colorPalette={colorPalette} names={['Olivia M. Gold', 'Andrew Orlando']} />

          {/* Message history */}
          {
            outputCode.map((msg: any) => (
              <Message colorPalette={colorPalette} message={msg} />
            ))
          }

          {/* "Now Typing" notification */}
          <NowTyping colorPalette={colorPalette} name={ nowTyping } />
        </Flex>

        {/* Chat Input */}
        <Flex
          ms={{ base: '0px', xl: '60px' }}
          mt="20px"
          justifySelf={'flex-end'}
        >
          <ComposeInput
            onChange={handleChange}
            onSubmit={handleTranslate}
            loading={loading}
            colorPalette={colorPalette}
          />
        </Flex>

        <Flex
          justify="center"
          mt="20px"
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
        >
          <Text fontSize="xs" textAlign="center" color={gray}>
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts.
          </Text>
          <Link href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes">
            <Text
              fontSize="xs"
              color={textColor}
              fontWeight="500"
              textDecoration="underline"
            >
              ChatGPT May 12 Version
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

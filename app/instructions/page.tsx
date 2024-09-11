'use client';
/*eslint-disable*/

// Project imports
import Link from '@/components/link/Link';
import { NowTyping, ChatBeginning } from '@/components/chat/Annotations';
import ComposeInput from '@/components/chat/ComposeInput';

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
import { streamAIMessage } from '../../src/utils/streaming'




const API_URL = process.env.API__URL;



export default function Page() {

  // Input text
  const [ inputCode,  setInputCode  ] = useState<string>('');

  // Response message
  const [ outputCode, setOutputCode ] = useState<string[]>([]);

  // Chat states
  const [ loading,    setLoading    ] = useState<boolean>(false);
  const [ nowTyping,  setNowTyping  ] = useState<string>('');


  const appendMessage = async (newMessage: any) => {
    setOutputCode((prevCode) => [...prevCode, newMessage]);
  }

  // Call the model
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
      `${API_URL}/message/test`,
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
      
      <Box>
        <Text>Instructions go here</Text>
      </Box>
    </Flex>
  );
}

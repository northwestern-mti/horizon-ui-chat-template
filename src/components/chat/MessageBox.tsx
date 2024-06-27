// Project imports
import Card from '@/components/card/Card'
import { ColorPalette } from '@/types/types';

// React imports
import ReactMarkdown from 'react-markdown'

// Chakra imports
import { useColorModeValue } from '@chakra-ui/react'



export default function MessageBox(props: { output: string, colorPalette: ColorPalette }) {
  const { output, colorPalette } = props
  return (
    <Card
      display={output ? 'flex' : 'none'}
      px="22px !important"
      pl="22px !important"
      bgColor={ colorPalette.bg }
      color={ colorPalette.text }
      fontSize={{ base: 'sm', md: 'md' }}
      lineHeight={{ base: '24px', md: '26px' }}
      fontWeight="500"
      w="80%"
    >
      <ReactMarkdown className="font-medium">
        {output ? output : ''}
      </ReactMarkdown>
    </Card>
  )
}

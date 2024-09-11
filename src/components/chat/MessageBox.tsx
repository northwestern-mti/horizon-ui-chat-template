// Project imports
import Card from '@/components/card/Card'

// React imports
import ReactMarkdown from 'react-markdown'



export default function MessageBox(props: { output: string, fromUser: boolean }) {
  const { output, fromUser } = props

  const iconStyle = fromUser ? 'user' : 'character';

  return (
    <Card
      display={output ? 'flex' : 'none'}
      px="22px !important"
      pl="22px !important"
      bgColor = { `message.${iconStyle}.bg`   }
      color   = { `message.${iconStyle}.text` }
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

import { Button, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react'

export default function SidebarDocs () {
  const bgColor = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
  const borderColor = useColorModeValue('white', 'navy.800')

  return (
    <Flex
      justify='center'
      direction='column'
      align='center'
      bg={bgColor}
      borderRadius='30px'
      me='20px'
      position='relative'
    >
    </Flex>
  )
}

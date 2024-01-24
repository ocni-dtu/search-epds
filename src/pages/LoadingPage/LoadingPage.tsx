import { Container, Flex } from '@mantine/core'
import React from 'react'
import { useViewportSize } from '@mantine/hooks'
import { Loading } from '@components'

export const LoadingPage = () => {
  const { height } = useViewportSize()
  return (
    <Container>
      <Flex mih={height} gap='md' justify='center' align='center' direction='row' wrap='wrap'>
        <Loading />
      </Flex>
    </Container>
  )
}

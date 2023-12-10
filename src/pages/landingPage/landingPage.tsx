import { Container, Flex, Title } from '@mantine/core'
import React from 'react'
import { useViewportSize } from '@mantine/hooks'
import { SearchBar } from '../../components'

export const LandingPage = () => {
  const { height } = useViewportSize()
  return (
    <Container>
      <Flex mih={height} gap='md' justify='center' align='center' direction='row' wrap='wrap'>
        <div>
          <Title order={1} mb='xl'>
            Search Table 7 for EPDs!
          </Title>
          <SearchBar />
        </div>
      </Flex>
    </Container>
  )
}

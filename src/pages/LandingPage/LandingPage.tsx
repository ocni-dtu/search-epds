import { Container, Flex, Stack, Title } from '@mantine/core'
import React from 'react'
import { useViewportSize } from '@mantine/hooks'
import { SearchBar } from '@components'

export const LandingPage = () => {
  const { height } = useViewportSize()
  return (
    <Container size='xs'>
      <Stack justify='center' h={height-200}>
        <Title order={1}>
          Search for EPDs!
        </Title>
        <SearchBar />
      </Stack>
    </Container>
  )
}

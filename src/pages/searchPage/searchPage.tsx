import React, { useState } from 'react'
import { Avatar, Container, Dialog, Tooltip, Stack } from '@mantine/core'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { IconChartBar } from '@tabler/icons-react'
import { searchGitHub, SearchItem } from '../../queries'
import { CompareModal, ErrorBoundary, NoResults, ResultNumberBreadcrumb, SearchElement } from '../../components'
import { FetchingBoundary } from '../../components/fetchingBoundary'
import { useDisclosure } from '@mantine/hooks'

export const SearchPage = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const query = params.get('query')
  const { isLoading, error, data } = useQuery(['search', query], () => searchGitHub(query!))
  const [selectedElements, setSelectedElements] = useState<SearchItem[]>([])
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Container>
      <FetchingBoundary loading={isLoading} error={error}>
        <ResultNumberBreadcrumb results={data?.total_count} />
        <NoResults show={data?.total_count === 0 || !data?.items} />
        <Stack>
          {data?.items?.map((item, index) => (
            <SearchElement
              key={index}
              element={item}
              selectedElements={selectedElements}
              setSelectedElements={setSelectedElements}
              disableSelectElement={selectedElements.length >= 4}
            />
          ))}
        </Stack>
      </FetchingBoundary>
      <Dialog opened={!!selectedElements.length} radius='xl' style={{ width: 'unset' }}>
        <Tooltip label='Show EPD comparison'>
          <Avatar radius='xl' onClick={open} style={{ cursor: 'pointer' }}>
            <IconChartBar color='#4051b5' size='md' />
          </Avatar>
        </Tooltip>
      </Dialog>
      <ErrorBoundary>
        <CompareModal opened={opened} close={close} elements={selectedElements} />
      </ErrorBoundary>
    </Container>
  )
}

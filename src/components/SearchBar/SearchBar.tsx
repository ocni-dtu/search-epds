import React, { useState } from 'react'
import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

export const SearchBar = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const query = params.get('query')
  const navigate = useNavigate()
  const [searchWord, setSearchWord] = useState(query || '')

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      navigate({ pathname: '/search', search: `?query=${searchWord}` })
    }
  }

  return (
    <TextInput
      onChange={(event) => setSearchWord(event.target.value)}
      onKeyDown={handleKeyPress}
      value={searchWord}
      placeholder='Search for EPDs'
      radius='xl'
      size={query ? 'sm' : 'xl'}
      leftSection={<IconSearch size={query ? '1rem' : '2rem'} />}
    />
  )
}

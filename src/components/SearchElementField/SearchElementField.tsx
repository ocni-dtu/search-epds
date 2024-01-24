import { Anchor, Skeleton, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

interface SearchElementFieldProps {
  name: string
  data?: string
  loading: boolean
  link?: string
}

export const SearchElementField = ({ name, data = '', loading, link }: SearchElementFieldProps) => {
  const theme = useMantineTheme()

  const text = link ? (
    <Anchor href={link} target='_blank' style={{ color: theme.black, textDecoration: 'underline' }}>
      {data}
    </Anchor>
  ) : (
    <Text>{data}</Text>
  )
  return (
    <>
      <Text fw={700}>{name}</Text>
      {loading ? <Skeleton height={8} my={8} radius='xl' width='50%' /> : text}
    </>
  )
}

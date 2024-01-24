import { Text } from '@mantine/core'
import React from 'react'

interface NoResultsProps {
  show: boolean
}

export const NoResults = ({ show }: NoResultsProps) => {
  if (!show) {
    return null
  }
  return <Text>No Search Results. Try again</Text>
}

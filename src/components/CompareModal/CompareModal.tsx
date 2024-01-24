import { Modal } from '@mantine/core'
import React from 'react'
import { SearchItem } from '@queries'
import { SearchElementChart, ErrorBoundary } from '@components'

interface CompareModalProps {
  opened: boolean
  close: () => void
  elements: SearchItem[]
}

export const CompareModal = ({ opened, close, elements }: CompareModalProps) => {
  const data = ['a1a3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'c1', 'c2', 'c3', 'c4', 'd']
    .map((indicator) => ({
      name: indicator.toUpperCase(),
      ...elements
        .map((element) => ({ [element.name]: formatValue(element.gwp, indicator) }))
        .reduce((accumulatedItems, newItem) => {
          return { ...accumulatedItems, ...newItem }
        }, {}),
    }))
    .filter((phase) =>
      Object.keys(phase)
        .filter((key) => key !== 'name')
        .map((_key) => phase[_key as keyof typeof phase])
        .every((value) => value !== '0.00'),
    ) as { [key: string]: number | string }[]

  return (
    <Modal opened={opened} onClose={close} centered withCloseButton={false} size='xl'>
      <ErrorBoundary>
        <SearchElementChart valueNames={elements.map((element) => element.name)} show data={data} height={500} />
      </ErrorBoundary>
    </Modal>
  )
}

const formatValue = (gwp: { [key: string]: number } | undefined, indicator: string) => {
  if (!gwp) return '0.00'
  else if (gwp[indicator]) return gwp[indicator].toFixed(3)
  else return '0.00'
}

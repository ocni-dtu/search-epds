import { Modal } from '@mantine/core'
import React from 'react'
import { SearchItem } from '../../queries'
import { SearchElementChart } from '../searchElementChart'
import { ErrorBoundary } from '../errorBoundary'

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
        // @ts-ignore
        .map((element) => ({ [element.name]: element.gwp[indicator] ? element.gwp[indicator].toFixed(3) : '0.00' }))
        .reduce((accumulatedItems, newItem) => {
          return { ...accumulatedItems, ...newItem }
        }, {}),
    }))
    .filter((phase) =>
      Object.keys(phase)
        .filter((key) => key !== 'name')
        // @ts-ignore
        .map((_key) => phase[_key])
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

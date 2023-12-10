import { useQuery } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { ActionIcon, Card, Grid, Tooltip } from '@mantine/core'
import { IconChartBar, IconMinus, IconPlus } from '@tabler/icons-react'
import { getGitHubFile, SearchItem } from '../../queries'
import { SearchElementTitle } from '../searchElementTitle'
import { SearchElementField } from '../searchElementField'
import { SearchElementChart } from '../searchElementChart'
import { ErrorBoundary } from '../errorBoundary'

interface SearchElementProps {
  element: SearchItem
  selectedElements: SearchItem[]
  setSelectedElements: Dispatch<SetStateAction<SearchItem[]>>
  disableSelectElement: boolean
}

export const SearchElement = ({
  element,
  selectedElements,
  setSelectedElements,
  disableSelectElement,
}: SearchElementProps) => {
  const [expanded, setExpanded] = useState(false)
  const { isLoading, data } = useQuery(['material', element.url], () => getGitHubFile(element.url!))

  const isThisElementSelected = useMemo(
    () => selectedElements.filter((_element) => _element.url === element.url).length === 1,
    [selectedElements],
  )

  const disableCompareButton = (selected: boolean, shouldDisable: boolean) => {
    if (shouldDisable) {
      return !selected
    }
    return false
  }
  const handleCompareClick = () => {
    if (selectedElements.length === 0) {
      setSelectedElements([{ ...element, name: data?.name, gwp: data?.gwp }])
    } else if (isThisElementSelected) {
      setSelectedElements((elements) => elements.filter((_element) => _element.url !== element.url))
    } else {
      setSelectedElements((elements) => [...elements, { ...element, name: data?.name, gwp: data?.gwp }])
    }
  }

  const gwpData = useMemo(() => {
    if (!data) {
      return []
    }
    return Object.entries(data.gwp)
      .filter(([, value]) => value)
      .map(([key, value]) =>
        // @ts-ignore
        ({ name: key.toUpperCase(), gwp: value.toFixed(3) }),
      )
  }, [data])

  return (
    <ErrorBoundary>
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Grid align='flex-end'>
          <Grid.Col xs={12}>
            <SearchElementTitle name={data?.name} loading={isLoading} />
          </Grid.Col>
          <Grid.Col xs={2.5}>
            <SearchElementField name='Declared Unit: ' data={convertUnit(data?.declared_unit)} loading={isLoading} />
          </Grid.Col>
          <Grid.Col xs={2.5}>
            <SearchElementField name='Subtype: ' data={data?.subtype} loading={isLoading} />
          </Grid.Col>
          <Grid.Col xs={2.5}>
            <SearchElementField
              name='GWP Total: '
              data={`${
                data
                  ? (
                      Object.values(data.gwp)
                        .filter((item) => item)
                        // @ts-ignore
                        .reduce((sum, currentValue) => sum + currentValue, 0) as number
                    ).toFixed(2)
                  : 0
              } kg CO₂-Eq`}
              loading={isLoading}
            />
          </Grid.Col>
          <Grid.Col xs={2.5}>
            <SearchElementField name='Source: ' data={data?.source.name} loading={isLoading} link={data?.source.url} />
          </Grid.Col>
          <Grid.Col xs={2}>
            <ActionIcon
              variant='default'
              style={{ float: 'right' }}
              onClick={() => setExpanded(!expanded)}
              disabled={isLoading}
            >
              <Tooltip label='Expand EPD'>
                {expanded ? <IconMinus size='1.1rem' /> : <IconPlus size='1.1rem' />}
              </Tooltip>
            </ActionIcon>
            <ActionIcon
              variant='default'
              style={{ float: 'right' }}
              sx={{ marginRight: 5 }}
              onClick={handleCompareClick}
              disabled={disableCompareButton(isThisElementSelected, disableSelectElement)}
            >
              <Tooltip label='Add to compare EPD'>
                <IconChartBar color={isThisElementSelected ? '#4051b5' : '#000000'} />
              </Tooltip>
            </ActionIcon>
          </Grid.Col>
        </Grid>
        <SearchElementChart show={expanded} data={gwpData} valueNames={['gwp']} />
      </Card>
    </ErrorBoundary>
  )
}

const convertUnit = (unit?: string) => {
  if (unit === 'M2') {
    return 'M²'
  }
  if (unit === 'M3') {
    return 'M³'
  }
  return unit
}

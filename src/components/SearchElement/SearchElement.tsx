import { useQuery } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { ActionIcon, Card, Grid, Tooltip } from '@mantine/core'
import { IconChartBar, IconDownload, IconMinus, IconPlus } from '@tabler/icons-react'
import { getGitHubFile, SearchItem } from '@queries'
import { SearchElementTitle, SearchElementField, SearchElementChart, ErrorBoundary } from '@components'

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
    [selectedElements, element.url],
  )

  const disableCompareButton = (selected: boolean, shouldDisable: boolean) => {
    if (shouldDisable) {
      return !selected
    }
    return false
  }
  const handleCompareClick = () => {
    if (selectedElements.length === 0) {
      setSelectedElements([{ ...element, name: data?.name || '', gwp: (data?.gwp || {}) as { [key: string]: number } }])
    } else if (isThisElementSelected) {
      setSelectedElements((elements) => elements.filter((_element) => _element.url !== element.url))
    } else {
      setSelectedElements((elements) => [
        ...elements,
        {
          ...element,
          name: data?.name || '',
          gwp: (data?.gwp || {}) as { [key: string]: number },
        },
      ])
    }
  }

  const handleDownloadClick = () => {
    const base64doc = btoa(JSON.stringify(data, undefined, 2))
    const a = document.createElement('a')
    const e = new MouseEvent('click')

    a.download = `${data?.name}.json`
    a.href = 'data:text/json;base64,' + base64doc
    a.dispatchEvent(e)
    window.umami.track(`Download EPD Button - ${data?.name} - ${data?.id}`)
  }

  const gwpData = useMemo(() => {
    if (!data) {
      return []
    }
    return Object.entries(data?.gwp || {})
      .filter(([, value]) => value)
      .map(([key, value]) => ({ name: key.toUpperCase(), gwp: (value as number).toFixed(3) }))
  }, [data])

  return (
    <ErrorBoundary>
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Grid align='flex-end'>
          <Grid.Col span={{ xs: 12 }}>
            <SearchElementTitle name={data?.name} loading={isLoading} />
          </Grid.Col>
          <Grid.Col span={{ xs: 2.5 }}>
            <SearchElementField name='Declared Unit: ' data={convertUnit(data?.declared_unit)} loading={isLoading} />
          </Grid.Col>
          <Grid.Col span={{ xs: 2.5 }}>
            <SearchElementField name='Subtype: ' data={data?.subtype} loading={isLoading} />
          </Grid.Col>
          <Grid.Col span={{ xs: 2.5 }}>
            <SearchElementField
              name='GWP Total: '
              data={`${
                data
                  ? Object.values(data.gwp!)
                      .filter((item) => item)
                      .reduce<number>((sum, currentValue) => sum + (currentValue as number), 0)
                      .toFixed(2)
                  : 0
              } kg CO₂-Eq`}
              loading={isLoading}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 2.5 }}>
            <SearchElementField
              name='Source: '
              data={data?.source?.name}
              loading={isLoading}
              link={data?.source?.url || undefined}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 2 }}>
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
            <ActionIcon variant='default' style={{ float: 'right', marginRight: 5 }} onClick={handleDownloadClick}>
              <Tooltip label='Download EPD'>
                <IconDownload size='1.1rem' />
              </Tooltip>
            </ActionIcon>
            <ActionIcon
              variant='default'
              style={{ float: 'right', marginRight: 5 }}
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

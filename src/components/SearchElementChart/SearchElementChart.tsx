import { Title } from '@mantine/core'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts'
import { ErrorBoundary } from '@components'

interface ChartDataPoint {
  [key: string]: number | string
}

interface SearchElementFieldProps {
  indicator?: string
  data?: ChartDataPoint[]
  valueNames: string[]
  show: boolean
  height?: number
}

export const SearchElementChart = ({
  indicator = 'Global Warming Potential (GWP)',
  data = [{}],
  valueNames,
  show,
  height = 300,
}: SearchElementFieldProps) => {
  if (!show) {
    return null
  }
  return (
    <ErrorBoundary>
      <Title order={3} my='lg'>
        {indicator}{' '}
      </Title>

      <ResponsiveContainer width='100%' height={height}>
        <BarChart
          width={500}
          height={height}
          data={data}
          margin={{
            top: 5,
            right: 15,
            left: 40,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name'>
            <Label value='Life Cycle Phases' offset={-10} position='insideBottom' />
          </XAxis>
          <YAxis>
            <Label value='kg CO2eq' offset={0} angle={-90} position='insideLeft' />
          </YAxis>
          <Tooltip />
          {valueNames.map((dataKey, index) => (
            <Bar key={dataKey} dataKey={dataKey} fill={chartColors[index]} />
          ))}
          {valueNames.length > 1 ? <Legend wrapperStyle={{ bottom: 0 }} /> : null}
        </BarChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  )
}

const chartColors = ['#4051b5', '#40b569', '#B54051', '#B5A440']

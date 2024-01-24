import React from 'react'
import { Grid, useMantineTheme } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { SearchBar } from '@components'
import EPDLogo from '../../assets/epd_logo.svg?react'

export const Header = () => {
  const theme = useMantineTheme()
  const location = useLocation()
  const size = 80

  return (
    <header style={{ paddingLeft: 5, backgroundColor: theme.colors.light[1] }}>
      <Grid align='center'>
        <Grid.Col span={{ xs: 12, sm: 1 }} py={0}>
          <Link style={{ color: theme.black, textDecoration: 'unset' }} to='/'>
            <EPDLogo width={size} height={size} />
          </Link>
        </Grid.Col>
        <Grid.Col span={{ xs: 12, sm: 8, md: 4 }}>{location.pathname === '/search' ? <SearchBar /> : null}</Grid.Col>
      </Grid>
    </header>
  )
}

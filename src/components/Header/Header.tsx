import React from 'react'
import { Grid, UnstyledButton, useMantineTheme } from '@mantine/core'
import { useLocation } from 'react-router-dom'
import { SearchBar } from '@components'
import EPDLogo from '../../assets/epd_logo.svg?react'
import { useNavigate } from 'react-router'

export const Header = () => {
  const theme = useMantineTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const size = 80

  return (
    <header style={{ paddingLeft: 5, backgroundColor: theme.colors.light[1] }}>
      <Grid align='center'>
        <Grid.Col span={{ xxs: 12, xs: 2, sm: 1 }} py={0}>
          <UnstyledButton onClick={() => navigate('/')}>
            <EPDLogo width={size} height={size} />
          </UnstyledButton>
        </Grid.Col>
        <Grid.Col span={{ xxs: 12, xs: 8, sm: 8, md: 4 }} pt={0}>
          {location.pathname === '/search' ? <SearchBar /> : null}
        </Grid.Col>
      </Grid>
    </header>
  )
}

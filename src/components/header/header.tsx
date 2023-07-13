import React from 'react';
import { Grid, Header as MantineHeader, Image } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router';
import { SearchBar } from '../searchBar';

export const Header = () => {
    const matches = useMediaQuery('(max-width: 30em)');
    const height = matches ? 120 : 80;
    const imageHeight = matches ? height / 2 : height;
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <MantineHeader height={height} p="xs">
            <Grid align="center">
                <Grid.Col xs={12} sm={1} py={0}>
                    <Image
                      onClick={() => navigate('/')}
                      maw={imageHeight}
                      radius="md"
                      src="/logo.png"
                      alt="EPD Search Logo"
                    />
                </Grid.Col>
                <Grid.Col xs={12} sm={8} md={4}>
                    {location.pathname === '/search' ? <SearchBar /> : null}
                </Grid.Col>
            </Grid>
        </MantineHeader>
    );
};

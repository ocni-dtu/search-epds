import React from 'react';
import { Container, Stack, Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchGitHub } from '../../queries';
import { SearchElement } from '../../components';

export const SearchPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const { isLoading, error, data } = useQuery(['search', query], () => searchGitHub(query!));
    return (
        <Container>
            <NoResults show={data?.total_count === 0} />
            <Stack>
                {data?.items.map((item, index) => <SearchElement key={index} element={item} />)}
            </Stack>

        </Container>
    );
};

const NoResults = ({ show }: { show: boolean }) => {
    if (!show) {
        return null;
    }
    return (
        <Text>No Search Results. Try again</Text>
    );
};

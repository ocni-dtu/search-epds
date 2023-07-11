import React from 'react';
import { Container, Stack } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchGitHub } from '../../queries';
import { NoResults, ResultNumberBreadcrumb, SearchElement } from '../../components';
import { FetchingBoundary } from '../../components/fetchingBoundary';

export const SearchPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const { isLoading, error, data } = useQuery(['search', query], () => searchGitHub(query!));

    return (
        <Container>
            <FetchingBoundary loading={isLoading} error={error}>
                <ResultNumberBreadcrumb results={data?.total_count} />
                <NoResults show={data?.total_count === 0} />
                <Stack>
                    {data?.items.map((item, index) => <SearchElement key={index} element={item} />)}
                </Stack>
            </FetchingBoundary>
        </Container>
    );
};

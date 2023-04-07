import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Card, Stack, Text } from '@mantine/core';
import { Loading } from '../loading';
import { getGitHubFile, SearchItem } from '../../queries';

interface SearchElementProps {
    element: SearchItem
}

export const SearchElement = ({ element }: SearchElementProps) => {
    const { isLoading, data } = useQuery(['material', element.url], () => getGitHubFile(element.url!));

    if (isLoading) { return <Loading />; }

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack>
                    {Object.keys(data).filter(key => ['UUID', 'Treibhausgasemissionen Total kg CO2-eq', 'Entsorgung'].indexOf(key) > -1).map((key, index) => (
                        <div key={index}>
                            <Text weight="600">{key}: </Text>
                            <Text>{data[key]}</Text>
                        </div>
                    ))}
                </Stack>
            </Card>
        </>
    );
};

import { Title, Text, Skeleton } from '@mantine/core';
import React from 'react';

interface SearchElementTitleProps {
    name?: string
    loading: boolean
}
export const SearchElementTitle = ({ name = '', loading }: SearchElementTitleProps) => {
    if (loading) {
        return (
            <Skeleton height={16} radius="xl" width="30%" />
        );
    }
    if (name.includes(',')) {
        const shortName = name.split(',')[0];

        return (
            <>
                <Title order={3}>{shortName}</Title>
                <Text>{name}</Text>
            </>
        );
    }
    return (<Title order={3}>{name}</Title>);
};

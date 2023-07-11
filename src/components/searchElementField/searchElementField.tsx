import { Skeleton, Text } from '@mantine/core';
import React from 'react';

interface SearchElementFieldProps {
    name: string
    data?: string
    loading: boolean
}

export const SearchElementField = ({ name, data = '', loading }: SearchElementFieldProps) => (
        <>
            <Text weight="700">{name}</Text>
            {loading ? <Skeleton height={8} my={8} radius="xl" width="50%" /> : <Text>{data}</Text>}
        </>
    );

import { Anchor, Skeleton, Text } from '@mantine/core';
import React from 'react';

interface SearchElementFieldProps {
    name: string
    data?: string
    loading: boolean
    link?: string
}

export const SearchElementField = ({ name, data = '', loading, link }: SearchElementFieldProps) => {
    const text = link ? <Anchor href={link} target="_blank" color="black" style={{ textDecoration: 'underline' }}>{data}</Anchor> :
        <Text>{data}</Text>;
    return (
        <>
            <Text weight="700">{name}</Text>
            {loading ? <Skeleton height={8} my={8} radius="xl" width="50%" /> : text}
        </>
    );
};

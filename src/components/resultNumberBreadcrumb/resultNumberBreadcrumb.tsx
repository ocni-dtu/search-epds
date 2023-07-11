import React from 'react';
import { Text } from '@mantine/core';

interface ResultNumberBreadcrumbProps {
    results?: number
}
export const ResultNumberBreadcrumb = ({ results = 0 }: ResultNumberBreadcrumbProps) => (
    <Text mb="sm">Found {results} materials</Text>
);

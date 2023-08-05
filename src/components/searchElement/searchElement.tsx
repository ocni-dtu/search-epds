import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ActionIcon, Card, Grid } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { getGitHubFile, SearchItem } from '../../queries';
import { SearchElementTitle } from '../searchElementTitle';
import { SearchElementField } from '../searchElementField';
import { SearchElementChart } from '../searchElementChart';
import { ErrorBoundary } from '../errorBoundary';

interface SearchElementProps {
    element: SearchItem
}

export const SearchElement = ({ element }: SearchElementProps) => {
    const [expanded, setExpanded] = useState(false);
    const { isLoading, data } = useQuery(['material', element.url], () => getGitHubFile(element.url!));

    return (
        <ErrorBoundary>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Grid align="flex-end">
                    <Grid.Col xs={12}>
                        <SearchElementTitle name={data?.name} loading={isLoading} />
                    </Grid.Col>
                    <Grid.Col xs={2.75}>
                        <SearchElementField
                          name="Declared Unit: "
                          data={convertUnit(data?.declared_unit)}
                          loading={isLoading}
                        />
                    </Grid.Col>
                    <Grid.Col xs={2.75}>
                        <SearchElementField name="Subtype: " data={data?.subtype} loading={isLoading} />
                    </Grid.Col>
                    <Grid.Col xs={2.75}>
                        <SearchElementField
                          name="GWP Total: "
                          data={`${
                                data ? (Object.values(data.gwp)
                                    .filter(item => item)
                                    // @ts-ignore
                                    .reduce((sum, currentValue) => sum + currentValue, 0) as number)
                                    .toFixed(2) : 0
                            } kg CO₂-Eq`}
                          loading={isLoading}
                        />
                    </Grid.Col>
                    <Grid.Col xs={2.75}>
                        <SearchElementField name="Source: " data={data?.source.name} loading={isLoading} link={data?.source.url} />
                    </Grid.Col>
                    <Grid.Col xs={1}>
                        <ActionIcon
                          variant="default"
                          style={{ float: 'right' }}
                          onClick={() => setExpanded(!expanded)}
                          disabled={isLoading}
                        >
                            {expanded ? <IconMinus size="1.1rem" /> : <IconPlus size="1.1rem" />}
                        </ActionIcon>
                    </Grid.Col>
                </Grid>
                <SearchElementChart show={expanded} data={data?.gwp as { [key: string]: number }} />
            </Card>
        </ErrorBoundary>
    );
};

const convertUnit = (unit?: string) => {
    if (unit === 'M2') {
        return 'M²';
    }
    if (unit === 'M3') {
        return 'M³';
    }
    return unit;
};

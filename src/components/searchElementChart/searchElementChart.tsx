import { Title } from '@mantine/core';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ErrorBoundary } from '../errorBoundary';

interface SearchElementFieldProps {
    name?: string
    data?: { [key: string]: number }
    show: boolean
}

export const SearchElementChart = ({ name = 'Global Warming Potential (GWP)', data = {}, show }: SearchElementFieldProps) => {
    if (!show) {
        return null;
    }
    return (
        <ErrorBoundary>
            <Title order={3} my="lg">{name}</Title>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={
                        Object.entries(data)
                            .filter(([, value]) => value)
                            .map(([key, value]) => (
                                // @ts-ignore
                                { name: key.toUpperCase(), gwp: value.toFixed(3) }
                            ))
                    }
                  margin={{
                        top: 5,
                        right: 15,
                        left: 40,
                        bottom: 15,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name">
                        <Label value="Life Cycle Phases" offset={-10} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value="kg CO2eq" offset={-30} angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="gwp" fill="#4051b5" />
                </BarChart>
            </ResponsiveContainer>
        </ErrorBoundary>
    );
};

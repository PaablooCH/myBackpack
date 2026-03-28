'use client'
import { Area, AreaChart, CartesianGrid, Line, Tooltip, XAxis, YAxis } from "recharts";

export type DataChart = {
    name: string, // x
    value: number // y
}

type Props = {
    dataChart: DataChart[]
}

export default function AreaChartComponent({ dataChart }: Props) {
    return (
        <AreaChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={ dataChart }
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 1" stroke="var(--sidebar-border)" />
            <XAxis dataKey="name" stroke="var(--paragraph)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis width='auto' stroke="var(--paragraph)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'var(--card-background)', 
                    border: '1px solid var(--sidebar-border)',
                    borderRadius: '4px',
                    boxShadow: "1px 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
                labelStyle={{ color: 'var(--headline)' }}
            />
            <Area 
                type="monotone" 
                dataKey="value" 
                stroke="var(--icon-highlight)" 
                fill="var(--icon-highlight)"
                fillOpacity={0.2}
                strokeWidth={2} 
                dot={{fill: 'var(--icon-highlight)', r: 2}} 
                activeDot={{fill:'var(--icon-highlight)', opacity: 0.2, r:8}}
            />
        </AreaChart>
    )
}
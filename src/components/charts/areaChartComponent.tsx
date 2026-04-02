'use client'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataChart } from "../../types/charts/dataChart";

type Props = {
    dataChart: DataChart[],
    className?: string
}

export default function AreaChartComponent({ dataChart, className }: Props) {
    return (
        <ResponsiveContainer width="100%" maxHeight={250} aspect={1.618}>
            <AreaChart
                data={ dataChart }
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                className={className}
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
        </ResponsiveContainer>
    )
}
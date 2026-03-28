'use client'
import { Pie, PieChart, PieSectorShapeProps, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { DataChart } from "./dataChart";

const COLORS = ['var(--icon-highlight)', 'var(--icon-secondary)', 'var(--icon-tertiary)', 'var(--icon-other)'];

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

type Props = {
    dataChart: DataChart[],
    className?: string
}

export default function PieChartComponent({ dataChart, className }: Props) {
    return (
        <>
            <ResponsiveContainer width="100%" maxHeight={300} aspect={1.618}>
                <PieChart
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    className={className}
                >
                    
                    <Pie data={dataChart} nameKey="name" dataKey="value" shape={MyCustomPie} label/>
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'var(--card-background)', 
                            border: '1px solid var(--sidebar-border)',
                            borderRadius: '4px',
                            boxShadow: "1px 4px 6px -1px rgba(0, 0, 0, 0.1)"
                        }}
                        labelStyle={{ color: 'var(--headline)' }}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="space-x-10 flex flex-row w-full justify-center">
                {
                    dataChart.map((data, key) => {
                        return (
                            <div key={key} className="flex flex-row items-center space-x-1">
                                <div className={`rounded-full h-1.5 w-1.5`} style={{ backgroundColor: COLORS[key % COLORS.length] }}></div>
                                <span className="text-xs">{data.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
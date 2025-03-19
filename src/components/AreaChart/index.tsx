'use client'

import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  { month: '2/2023', desktop: 5000000 },
  { month: '8/2024', desktop: 8000000 },
  { month: '3/2025', desktop: 11000000 },
]
const chartConfig = {
  desktop: {
    label: 'Mức lương: ',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export type AreaBasicChartProps = {}

const AreaBasicChart: React.FC<AreaBasicChartProps> = () => {
  return (
    <Card className="aspect-[639/267] w-[639px] !border-none !py-0 !shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-[14px] leading-[22px] font-[600]">
          Mức lương theo thời gian
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-auto aspect-[382/210] w-[382px]">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <defs>
              <linearGradient
                id="fillDesktop"
                x1="134.972"
                y1="0.5"
                x2="134.972"
                y2="161"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0D99FF" />
                <stop offset="1" stopColor="#61CCEC" />
              </linearGradient>
            </defs>

            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={1}
              stroke="#1677ff"
              stackId="a"
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AreaBasicChart

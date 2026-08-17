import { useMemo, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { ChartCard } from './chart-card';

const data = [
    { month: 'Jan', value: 820 },
    { month: 'Feb', value: 910 },
    { month: 'Mar', value: 870 },
    { month: 'Apr', value: 980 },
    { month: 'May', value: 930 },
    { month: 'Jun', value: 1050 },
    { month: 'Jul', value: 1020 },
    { month: 'Aug', value: 1150 },
    { month: 'Sep', value: 1180 },
];

const WIDTH = 800;
const HEIGHT = 220;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 28;
const PLOT_HEIGHT = HEIGHT - PADDING_TOP - PADDING_BOTTOM;

export function CustomerGrowthChart() {
    const [hovered, setHovered] = useState<number | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const { points, gridValues, minValue, maxValue } = useMemo(() => {
        const values = data.map((d) => d.value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const domainMin = Math.floor((min - 100) / 100) * 100;
        const domainMax = Math.ceil((max + 100) / 100) * 100;
        const xStep = WIDTH / (data.length - 1);

        const scaleY = (value: number) =>
            PADDING_TOP +
            PLOT_HEIGHT -
            ((value - domainMin) / (domainMax - domainMin)) * PLOT_HEIGHT;

        const pts = data.map((d, i) => ({
            x: i * xStep,
            y: scaleY(d.value),
            ...d,
        }));

        const steps = 3;
        const grid = Array.from({ length: steps + 1 }, (_, i) =>
            Math.round(domainMin + ((domainMax - domainMin) * i) / steps),
        );

        return {
            points: pts,
            gridValues: grid,
            minValue: domainMin,
            maxValue: domainMax,
        };
    }, []);

    const linePath = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
        .join(' ');
    const areaPath = `${linePath} L${points[points.length - 1].x},${PADDING_TOP + PLOT_HEIGHT} L${points[0].x},${PADDING_TOP + PLOT_HEIGHT} Z`;

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const svg = svgRef.current;

        if (!svg) {
            return;
        }

        const rect = svg.getBoundingClientRect();
        const relativeX = ((event.clientX - rect.left) / rect.width) * WIDTH;
        const xStep = WIDTH / (data.length - 1);
        const index = Math.min(
            data.length - 1,
            Math.max(0, Math.round(relativeX / xStep)),
        );

        setHovered(index);
    };

    const active = hovered !== null ? points[hovered] : null;

    return (
        <ChartCard
            title="Customer Growth Trend"
            className="lg:col-span-2"
            action={
                <span className="rounded border px-3 py-1 text-xs font-medium text-muted-foreground">
                    Last 9 Months
                </span>
            }
        >
            <div className="relative">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    className="w-full"
                    role="img"
                    aria-label="Customer growth trend from January to September"
                    onPointerMove={handlePointerMove}
                    onPointerLeave={() => setHovered(null)}
                >
                    <title>Customer growth, January through September</title>
                    <defs>
                        <linearGradient
                            id="customer-growth-area"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                className="[stop-color:var(--color-secondary)]"
                                stopOpacity={0.12}
                            />
                            <stop
                                offset="100%"
                                className="[stop-color:var(--color-secondary)]"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    {gridValues.map((value) => {
                        const y =
                            PADDING_TOP +
                            PLOT_HEIGHT -
                            ((value - minValue) / (maxValue - minValue)) *
                                PLOT_HEIGHT;

                        return (
                            <line
                                key={value}
                                x1={0}
                                x2={WIDTH}
                                y1={y}
                                y2={y}
                                className="stroke-border"
                                strokeWidth={1}
                            />
                        );
                    })}

                    <path
                        d={areaPath}
                        fill="url(#customer-growth-area)"
                        stroke="none"
                    />
                    <path
                        d={linePath}
                        fill="none"
                        className="stroke-secondary"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {active && (
                        <line
                            x1={active.x}
                            x2={active.x}
                            y1={PADDING_TOP}
                            y2={PADDING_TOP + PLOT_HEIGHT}
                            className="stroke-border"
                            strokeWidth={1}
                        />
                    )}

                    {points.map((p, i) => (
                        <circle
                            key={p.month}
                            cx={p.x}
                            cy={p.y}
                            r={hovered === i ? 5 : 4}
                            className="fill-secondary stroke-card"
                            strokeWidth={2}
                        />
                    ))}
                </svg>

                {active && (
                    <div
                        className="pointer-events-none absolute top-0 -translate-x-1/2 rounded border bg-card px-2.5 py-1.5 text-xs shadow-md"
                        style={{
                            left: `${(active.x / WIDTH) * 100}%`,
                        }}
                    >
                        <p className="font-semibold text-secondary">
                            {active.value.toLocaleString()} customers
                        </p>
                        <p className="text-muted-foreground">{active.month}</p>
                    </div>
                )}

                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    {data.map((d) => (
                        <span key={d.month}>{d.month}</span>
                    ))}
                </div>
            </div>
        </ChartCard>
    );
}

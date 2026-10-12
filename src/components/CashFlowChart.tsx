import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CashFlowPoint } from '../types';

interface CashFlowChartProps {
  data: CashFlowPoint[];
  period: string;
  onPeriodChange: (p: string) => void;
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({
  data,
  period,
  onPeriodChange
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4); // Default hover on May 14

  // Chart dimensions & scaling
  const width = 580;
  const height = 240;
  const paddingX = 40;
  const paddingY = 25;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;

  const maxVal = 40000;

  const getCoordinates = (points: CashFlowPoint[], key: 'income' | 'expenses') => {
    return points.map((p, i) => {
      const x = paddingX + (i / (points.length - 1)) * plotWidth;
      const y = height - paddingY - (p[key] / maxVal) * plotHeight;
      return { x, y, val: p[key], date: p.date };
    });
  };

  const incomeCoords = getCoordinates(data, 'income');
  const expenseCoords = getCoordinates(data, 'expenses');

  const createSmoothPath = (coords: { x: number; y: number }[]) => {
    if (coords.length === 0) return '';
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? i : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const incomePath = createSmoothPath(incomeCoords);
  const expensePath = createSmoothPath(expenseCoords);

  const incomeAreaPath = `${incomePath} L ${incomeCoords[incomeCoords.length - 1].x} ${height - paddingY} L ${incomeCoords[0].x} ${height - paddingY} Z`;
  const expenseAreaPath = `${expensePath} L ${expenseCoords[expenseCoords.length - 1].x} ${height - paddingY} L ${expenseCoords[0].x} ${height - paddingY} Z`;

  const activePoint = hoveredIndex !== null ? {
    income: incomeCoords[hoveredIndex],
    expense: expenseCoords[hoveredIndex],
    dataPoint: data[hoveredIndex]
  } : null;

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight">Cash Flow</h2>
          <p className="text-xs text-slate-400">Income vs Expenses</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              Income
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
              Expenses
            </span>
          </div>

          {/* Time range selector */}
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 py-1 px-2.5 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="30d">Last 30 Days</option>
            <option value="7d">Last 7 Days</option>
            <option value="90d">This Quarter</option>
            <option value="1y">This Year</option>
          </select>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full aspect-[580/240] select-none">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines */}
          {[0, 10000, 20000, 30000, 40000].map((val) => {
            const y = height - paddingY - (val / maxVal) * plotHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="#64748b"
                  fontFamily="monospace"
                >
                  ${val === 0 ? '0' : `${val / 1000}K`}
                </text>
              </g>
            );
          })}

          {/* Area Fills with Framer Motion fade in */}
          <motion.path
            d={incomeAreaPath}
            fill="url(#incomeGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={expenseAreaPath}
            fill="url(#expenseGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Smooth Lines with path drawing over 1.4s */}
          <motion.path
            d={incomePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={expensePath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Vertical Hover Crosshair */}
          {activePoint && (
            <line
              x1={activePoint.income.x}
              y1={paddingY}
              x2={activePoint.income.x}
              y2={height - paddingY}
              stroke="#d4af37"
              strokeDasharray="4 4"
              strokeWidth="1.5"
              opacity="0.8"
            />
          )}

          {/* Active circles */}
          {activePoint && (
            <>
              <circle
                cx={activePoint.income.x}
                cy={activePoint.income.y}
                r="5"
                fill="#10b981"
                stroke="#0b0f19"
                strokeWidth="2"
              />
              <circle
                cx={activePoint.expense.x}
                cy={activePoint.expense.y}
                r="5"
                fill="#06b6d4"
                stroke="#0b0f19"
                strokeWidth="2"
              />
            </>
          )}

          {/* X Axis Labels */}
          {['May 1', 'May 7', 'May 14', 'May 21', 'May 28'].map((label, idx) => {
            const mappedIndices = [0, 2, 4, 6, 8];
            const targetX = incomeCoords[mappedIndices[idx]]?.x || (paddingX + (idx / 4) * plotWidth);
            return (
              <text
                key={label}
                x={targetX}
                y={height - 6}
                textAnchor="middle"
                fontSize="10"
                fill="#94a3b8"
                fontFamily="sans-serif"
              >
                {label}
              </text>
            );
          })}

          {/* Transparent interactive trigger overlays for hover */}
          {data.map((_, index) => {
            const x = paddingX + (index / (data.length - 1)) * plotWidth;
            const w = plotWidth / (data.length - 1);
            return (
              <rect
                key={index}
                x={x - w / 2}
                y={paddingY}
                width={w}
                height={plotHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none rounded-xl bg-slate-900/95 border border-slate-700/80 px-3 py-2 text-xs shadow-2xl backdrop-blur-md transform -translate-x-1/2"
            style={{
              left: `${(activePoint.income.x / width) * 100}%`,
              top: `${Math.max(10, ((activePoint.income.y / height) * 100) - 28)}%`
            }}
          >
            <div className="font-semibold text-slate-300 text-[11px] mb-1">
              {activePoint.dataPoint.date}, 2024
            </div>
            <div className="flex items-center justify-between gap-3 text-emerald-400 font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Income
              </span>
              <span className="font-bold">${activePoint.dataPoint.income.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-cyan-400 font-mono text-[11px] mt-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Expenses
              </span>
              <span className="font-bold">${activePoint.dataPoint.expenses.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

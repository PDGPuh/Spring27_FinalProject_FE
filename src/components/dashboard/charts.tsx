"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #E5E7EB",
  boxShadow: "0 12px 32px -20px rgba(15,42,56,0.35)",
  fontSize: 12,
};

export function Sparkline({
  data,
  color = "#0891B2",
}: {
  data: number[];
  color?: string;
}) {
  const series = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            fill={`url(#spark-${color})`}
            strokeWidth={1.8}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HourlyStackedChart({
  data,
}: {
  data: { hour: string; Normal: number; High: number; Critical: number }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(8,145,178,0.06)" }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="Normal" stackId="a" fill="#0891B2" radius={[0, 0, 0, 0]} />
          <Bar dataKey="High" stackId="a" fill="#F59E0B" />
          <Bar dataKey="Critical" stackId="a" fill="#DC2626" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WeeklyVolumeChart({
  data,
}: {
  data: { day: string; cases: number; completed: number; waiting: number }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="volCases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0891B2" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#0891B2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="cases" name="Tổng ca" stroke="#0891B2" fill="url(#volCases)" strokeWidth={2} />
          <Line type="monotone" dataKey="completed" name="Hoàn tất" stroke="#16A34A" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="waiting" name="Chờ đọc" stroke="#F59E0B" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TatTrendChart({ data }: { data: { day: string; tat: number }[] }) {
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
            unit="p"
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => [`${v} phút`, "TAT"]}
          />
          <Line
            type="monotone"
            dataKey="tat"
            stroke="#0E7490"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#0891B2" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DonutChart({
  data,
  centerLabel,
  centerValue,
}: {
  data: { name: string; value: number; color: string }[];
  centerLabel: string;
  centerValue: string;
}) {
  return (
    <div className="relative h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={82}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[26px] font-semibold leading-none tracking-tight">{centerValue}</span>
        <span className="mt-1 text-[11px] text-text-secondary">{centerLabel}</span>
      </div>
    </div>
  );
}

export function HorizontalBars({
  data,
  valueKey = "value",
  color = "#0891B2",
}: {
  data: { name: string; value: number }[];
  valueKey?: string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.name}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-text">{d.name}</span>
            <span className="tabular-nums text-text-secondary">{d.value}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(d.value / max) * 100}%`,
                background: color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FacilityUtilization({
  data,
}: {
  data: { name: string; cases: number; waiting: number; critical: number; tat: number; utilization: number }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748B" }} unit="%" axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v, name) => {
              if (name === "utilization") return [`${v}%`, "Công suất"];
              return [v, String(name)];
            }}
          />
          <Bar dataKey="utilization" name="Công suất" fill="#0891B2" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function QueueFunnel({ data }: { data: { stage: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="space-y-2.5">
      {data.map((d, i) => (
        <div key={d.stage} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-xs text-text-secondary">{d.stage}</span>
          <div className="relative h-8 flex-1">
            <div
              className="flex h-full items-center rounded-[8px] px-3 text-xs font-semibold text-white transition-all"
              style={{
                width: `${Math.max(18, (d.count / max) * 100)}%`,
                background: `color-mix(in srgb, #0891B2 ${100 - i * 12}%, #0F2A38)`,
              }}
            >
              {d.count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

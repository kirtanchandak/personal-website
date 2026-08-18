"use client";

import { useState } from "react";
import type { YearContributions } from "@/lib/github";

const levelColors = {
  0: "bg-[#ebedf0] opacity-50",
  1: "bg-[#9be9a8]",
  2: "bg-[#40c463]",
  3: "bg-[#30a14e]",
  4: "bg-[#216e39]",
};

export default function GitHubGraph({ data }: { data: YearContributions[] }) {
  const [selectedYear, setSelectedYear] = useState(data[0]?.year);

  const currentData = data.find((d) => d.year === selectedYear);

  if (!currentData || data.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-3">
        <h3 className="text-sm font-medium text-neutral-800">
          {currentData.total} contributions in {selectedYear}
        </h3>
        <div className="flex gap-2">
          {data.map((d) => (
            <button
              key={d.year}
              onClick={() => setSelectedYear(d.year)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedYear === d.year
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {d.year}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-grid grid-rows-7 gap-[3px] grid-flow-col">
          {currentData.days.map((day, index) => {
            const isFirst = index === 0;
            const dayOfWeek = isFirst ? new Date(day.date).getDay() + 1 : undefined;
            
            return (
              <a
                key={day.date}
                href={`https://github.com/kirtanchandak?tab=overview&from=${day.date}&to=${day.date}#contributions-calendar`}
                target="_blank"
                rel="noopener noreferrer"
                title={`${day.count} contributions on ${day.date}`}
                style={isFirst ? { gridRowStart: dayOfWeek } : undefined}
                className={`block size-[10px] rounded-[2px] hover:ring-1 hover:ring-black/20 dark:hover:ring-white/50 hover:scale-125 transition-all z-10 hover:z-20 ${
                  levelColors[day.level as keyof typeof levelColors] || levelColors[0]
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

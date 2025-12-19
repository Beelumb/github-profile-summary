import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#f72585", "#4cc9f0", "#b5179e", "#4895ef", "#7209b7"];

type Props = {
  data: { name: string; value: number }[];
  title: string;
};

export default function LanguagePie({ data, title }: Props) {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const newWidth = containerRef.current.offsetWidth;
      // Subtracting a small buffer (e.g. 20px) prevents overflow jitter
      setWidth(newWidth > 0 ? newWidth - 20 : 0);
    }
  }, []);

  return (
    <div className="p-4 rounded-xl ">
      <h3 className="text-center font-bold mb-4">{title}</h3>

      <div
        ref={containerRef}
        className="w-full h-[300px] flex justify-center items-center"
      >
        {width > 0 ? (
          <PieChart width={width} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <div className="text-gray-400 text-sm animate-pulse">
            Loading Chart...
          </div>
        )}
      </div>
    </div>
  );
}

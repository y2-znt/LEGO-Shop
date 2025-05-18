interface StatsCardProps {
  value: number | string;
  label: string;
  className?: string;
}

export default function StatsCard({
  value,
  label,
  className = "",
}: StatsCardProps) {
  return (
    <div
      className={`rounded-lg border p-8 text-center transition-all hover:bg-gray-100 ${className}`}
    >
      <h2 className="text-2xl">
        {value}
        <br /> {label}
      </h2>
    </div>
  );
}

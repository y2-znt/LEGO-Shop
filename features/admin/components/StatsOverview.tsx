interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow transition-all hover:bg-gray-100">
      <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

interface StatsOverviewProps {
  stats: {
    title: string;
    value: string | number;
  }[];
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="mt-8 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
}

import { Card } from '../../../components/ui/Card';

const stats = [
  { label: 'Total Users', value: '64' },
  { label: 'Visitors Today', value: '18' },
  { label: 'Pending Invitations', value: '7' },
  { label: 'Active Gates', value: '5' }
];

export function DashboardPage() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} title={stat.value} subtitle={stat.label} />
      ))}
    </section>
  );
}

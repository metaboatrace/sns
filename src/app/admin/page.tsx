import { getLabel } from './_lib/labels';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{getLabel('admin.dashboardTitle')}</h1>
      <p>{getLabel('admin.dashboardDescription')}</p>
    </div>
  );
}

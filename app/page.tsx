export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[var(--muted)]">
          Total Earnings
          <p className="text-2xl font-bold mt-2">$745.35</p>
        </div>
        <div className="p-6 rounded-xl bg-[var(--muted)]">
          Orders
          <p className="text-2xl font-bold mt-2">7,585</p>
        </div>
        <div className="p-6 rounded-xl bg-[var(--muted)]">
          Refunds
          <p className="text-2xl font-bold mt-2">367</p>
        </div>
      </div>
    </div>
  );
}

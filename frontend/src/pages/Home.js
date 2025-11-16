function Home() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-background-card rounded-card shadow-lg p-6">
            <h2 className="text-lg font-semibold text-text-secondary mb-2">Total Tickets</h2>
            <p className="text-4xl font-bold text-text-primary">0</p>
          </div>

          <div className="bg-background-card rounded-card shadow-lg p-6">
            <h2 className="text-lg font-semibold text-text-secondary mb-2">High Priority</h2>
            <p className="text-4xl font-bold text-red-500">0</p>
          </div>

          <div className="bg-background-card rounded-card shadow-lg p-6">
            <h2 className="text-lg font-semibold text-text-secondary mb-2">Total XP</h2>
            <p className="text-4xl font-bold text-text-primary">0</p>
          </div>
        </div>

        <div className="bg-background-card rounded-card shadow-lg p-6">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Welcome to XP Tracker</h2>
          <p className="text-text-secondary">
            Track your tickets and XP progress. Use the navigation above to get started.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

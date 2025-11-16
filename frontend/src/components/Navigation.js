import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkClass = (path) => {
    const baseClass = "px-6 py-3 font-medium transition-colors rounded-lg";
    return isActive(path)
      ? `${baseClass} bg-primary text-white`
      : `${baseClass} text-text-secondary hover:bg-gray-100`;
  };

  return (
    <nav className="bg-background-card shadow-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-text-primary">XP Tracker</h1>
          </div>

          <div className="flex space-x-2">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>
            <Link to="/tickets" className={navLinkClass('/tickets')}>
              Tickets
            </Link>
            <Link to="/xp" className={navLinkClass('/xp')}>
              XP
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

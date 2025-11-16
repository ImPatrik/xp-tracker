import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const TicketList = forwardRef((props, ref) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/tickets');
      const data = await response.json();

      if (data.success) {
        setTickets(data.tickets);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refresh: fetchTickets
  }));

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 border-green-300 border-2';
      case 'rejected':
        return 'bg-gray-100 border-gray-300 opacity-60';
      case 'pending':
      default:
        return 'bg-white border-border';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded-full text-xs font-semibold">
            ✅ Completed
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-gray-200 text-gray-700 border border-gray-400 rounded-full text-xs font-semibold">
            ❌ NOT POSSIBLE
          </span>
        );
      case 'pending':
      default:
        return null;
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-background-card rounded-card shadow-lg p-8 text-center">
        <p className="text-text-secondary">Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-card p-4">
        <p className="text-red-800">Error: {error}</p>
        <button
          onClick={fetchTickets}
          className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background-card rounded-card shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary">
          All Tickets ({tickets.length})
        </h2>
        <button
          onClick={fetchTickets}
          className="px-4 py-2 bg-primary text-white rounded-input hover:bg-primary-hover transition-colors text-sm"
        >
          Refresh
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary text-lg">No tickets yet</p>
          <p className="text-text-secondary text-sm mt-2">Create your first ticket above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`rounded-input p-4 hover:shadow-md transition-shadow ${getStatusStyle(ticket.status)}`}
            >
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="text-lg font-semibold text-text-primary flex-1">
                  {ticket.title}
                </h3>
                <div className="flex gap-2">
                  {getStatusBadge(ticket.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-text-secondary mb-3">{ticket.description}</p>

              <div className="flex justify-between items-center text-sm text-text-secondary">
                <span>
                  Submitted by: <span className="font-medium">{ticket.submittedBy}</span>
                </span>
                <span>{formatDate(ticket.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default TicketList;

import { useRef } from 'react';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';

function Tickets() {
  const ticketListRef = useRef(null);

  const handleTicketCreated = () => {
    // Refresh the ticket list when a new ticket is created
    if (ticketListRef.current && ticketListRef.current.refresh) {
      ticketListRef.current.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Tickets</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Create ticket form */}
          <div className="lg:col-span-1">
            <TicketForm onTicketCreated={handleTicketCreated} />
          </div>

          {/* Right side - Ticket list */}
          <div className="lg:col-span-2">
            <TicketList ref={ticketListRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;

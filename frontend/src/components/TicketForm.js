import { useState } from "react";

function TicketForm({ onTicketCreated }) {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    priority: 'medium',
    submittedBy: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/create-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
      });

      if (response.ok) {
        alert('Ticket created successfully!');
        setTicket({
          title: '',
          description: '',
          priority: 'medium',
          submittedBy: '',
        });

        // Notify parent component that ticket was created
        if (onTicketCreated) {
          onTicketCreated();
        }
      } else {
        const data = await response.json();
        alert(`Failed to create ticket: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.log('Error creating ticket:', error);
      alert('Failed to create ticket. Please check the console for details.');
    }
  };

  return (
    <div className="bg-background-card rounded-card shadow-lg p-6">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Create New Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Your Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={ticket.submittedBy}
            onChange={(e) => setTicket({ ...ticket, submittedBy: e.target.value })}
            required
            className="w-full px-input-padding-x py-input-padding-y border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Ticket Title
          </label>
          <input
            type="text"
            placeholder="Brief description of issue"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            required
            className="w-full px-input-padding-x py-input-padding-y border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Description
          </label>
          <textarea
            placeholder="Describe your issue in detail..."
            value={ticket.description}
            onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
            required
            rows={5}
            className="w-full px-input-padding-x py-input-padding-y border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Priority
          </label>
          <select
            value={ticket.priority}
            onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
            className="w-full px-input-padding-x py-input-padding-y border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-4 rounded-input hover:bg-primary-hover transition-colors font-medium mt-6"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}

export default TicketForm;

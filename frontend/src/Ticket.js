import { useState } from "react";

function Ticket() {
const [ticket, setTicket] = useState({
    'title': '',
    'description': '',
    'priority': 'medium',
    'submittedBy': '',
})
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:4000/create-ticket', {
            'method': 'POST',
            'headers': {'Content-Type': 'application/json' },
            'body': JSON.stringify(ticket)
        })
        console.log(response)
        if(response.ok){
            alert('Ticket HAS BEEN MADE LFG');
            setTicket({
                'title': '',
                'description': '',
                'priority': 'medium',
                'submittedBy': '',
            })
        }
    } catch(error){
        console.log('Something is not correct', error)
        alert('You have broken something within the ticket system')
    }
};
return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-background-card rounded-card shadow-lg w-full max-w-md p-form-padding">
            <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">Create New Ticket</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={ticket.submittedBy}
                        onChange={(e) => setTicket({...ticket, submittedBy: e.target.value})}
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
                        onChange={(e) => setTicket({...ticket, title: e.target.value})}
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
                        onChange={(e) => setTicket({...ticket, description: e.target.value})}
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
                        onChange={(e) => setTicket({...ticket, priority: e.target.value})}
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
    </div>
)
}

export default Ticket;